#!/usr/bin/env python3
"""Start CLI - Launch BrowserOS and wait for MCP server readiness"""

import json
import os
import subprocess
import time
import urllib.request
import urllib.error
from pathlib import Path
from typing import Optional

import typer

from ..common.utils import (
    IS_MACOS,
    IS_WINDOWS,
    IS_LINUX,
    log_info,
    log_error,
    log_success,
    log_warning,
)

app = typer.Typer(
    help="Start BrowserOS browser",
    pretty_exceptions_enable=False,
    pretty_exceptions_show_locals=False,
)

DEFAULT_MCP_PORT = 9000
MCP_PREF_KEY = "browseros.server.proxy_port"


def get_default_install_path() -> Optional[Path]:
    """Get the default BrowserOS install path for the current platform."""
    if IS_MACOS():
        return Path("/Applications/BrowserOS.app")
    elif IS_WINDOWS():
        local_app_data = os.environ.get("LOCALAPPDATA", "")
        if local_app_data:
            return Path(local_app_data) / "BrowserOS" / "Application" / "BrowserOS.exe"
    elif IS_LINUX():
        for p in [Path("/opt/browseros/browseros"), Path("/usr/bin/browseros")]:
            if p.exists():
                return p
        return Path("/opt/browseros/browseros")
    return None


def get_local_state_path() -> Optional[Path]:
    """Get the path to BrowserOS Local State file."""
    if IS_MACOS():
        return Path.home() / "Library" / "Application Support" / "BrowserOS" / "Local State"
    elif IS_WINDOWS():
        local_app_data = os.environ.get("LOCALAPPDATA", "")
        if local_app_data:
            return Path(local_app_data) / "BrowserOS" / "User Data" / "Local State"
    elif IS_LINUX():
        return Path.home() / ".config" / "browseros" / "Local State"
    return None


def resolve_mcp_port(explicit_port: Optional[int]) -> int:
    """Resolve the MCP proxy port from explicit option, Local State, or default."""
    if explicit_port is not None:
        return explicit_port

    local_state_path = get_local_state_path()
    if local_state_path and local_state_path.exists():
        try:
            with open(local_state_path, "r") as f:
                state = json.load(f)
            # Navigate nested keys: "browseros.server.proxy_port"
            # Local State stores dotted keys as nested dicts: browseros -> server -> proxy_port
            value = state
            for key in MCP_PREF_KEY.split("."):
                if isinstance(value, dict):
                    value = value.get(key)
                else:
                    value = None
                    break
            if isinstance(value, int):
                return value
        except (json.JSONDecodeError, OSError):
            pass

    return DEFAULT_MCP_PORT


def launch_browser(app_path: Path) -> None:
    """Launch the BrowserOS application."""
    if IS_MACOS():
        subprocess.Popen(["open", "-a", str(app_path)])
    elif IS_WINDOWS():
        CREATE_NEW_PROCESS_GROUP = 0x00000200
        DETACHED_PROCESS = 0x00000008
        subprocess.Popen(
            [str(app_path)],
            creationflags=CREATE_NEW_PROCESS_GROUP | DETACHED_PROCESS,
        )
    elif IS_LINUX():
        subprocess.Popen([str(app_path)], start_new_session=True)
    else:
        subprocess.Popen([str(app_path)])


def wait_for_mcp(port: int, timeout: int) -> bool:
    """Poll the MCP endpoint until it responds or timeout is reached."""
    url = f"http://127.0.0.1:{port}/mcp"
    payload = json.dumps({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "browseros-cli", "version": "1.0.0"},
        },
    }).encode("utf-8")

    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            req = urllib.request.Request(
                url,
                data=payload,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            urllib.request.urlopen(req, timeout=3)
            return True
        except (urllib.error.URLError, ConnectionRefusedError, OSError):
            time.sleep(1)

    return False


def print_connection_info(port: int) -> None:
    """Print MCP connection instructions."""
    mcp_url = f"http://127.0.0.1:{port}/mcp"

    log_success("BrowserOS MCP server is ready!")
    log_info("")
    log_info(f"  MCP endpoint: {mcp_url}")
    log_info("")
    log_info("Add to your AI coding tool:")
    log_info("")
    log_info("  Claude Code:")
    log_info(f'    claude mcp add browseros -- curl -N -X POST -H "Content-Type: application/json" -d @- {mcp_url}')
    log_info("")
    log_info("  Cursor / Windsurf (mcp.json):")
    log_info(f'    {{"browseros": {{"url": "{mcp_url}"}}}}')
    log_info("")


def get_install_instructions() -> str:
    """Get platform-specific install instructions."""
    if IS_MACOS():
        return "Download BrowserOS from https://browseros.com and drag it to /Applications."
    elif IS_WINDOWS():
        return "Download BrowserOS from https://browseros.com and run the installer."
    elif IS_LINUX():
        return "Download BrowserOS from https://browseros.com and install the package."
    return "Download BrowserOS from https://browseros.com."


@app.callback(invoke_without_command=True)
def main(
    _ctx: typer.Context,
    path: Optional[Path] = typer.Option(
        None, "--path", "-p", help="Path to BrowserOS app (overrides default install path)"
    ),
    no_mcp: bool = typer.Option(
        False, "--no-mcp", help="Skip waiting for MCP server readiness"
    ),
    mcp_port: Optional[int] = typer.Option(
        None, "--mcp-port", help="MCP proxy port (auto-detected from Local State, default: 9000)"
    ),
    timeout: int = typer.Option(
        30, "--timeout", "-t", help="Timeout in seconds for MCP readiness"
    ),
):
    """Start BrowserOS browser and wait for MCP server readiness.

    \b
    Launch browser and wait for MCP:
      browseros start

    \b
    Launch without waiting for MCP:
      browseros start --no-mcp

    \b
    Custom app path:
      browseros start --path /path/to/BrowserOS.app
    """
    # Resolve app path
    app_path = path or get_default_install_path()
    if app_path is None:
        log_error("Could not determine BrowserOS install path for this platform.")
        log_error(get_install_instructions())
        raise typer.Exit(1)

    if not app_path.exists():
        log_error(f"BrowserOS not found at: {app_path}")
        log_error(get_install_instructions())
        raise typer.Exit(1)

    # Launch browser
    log_info(f"Launching BrowserOS from {app_path}...")
    try:
        launch_browser(app_path)
    except Exception as e:
        log_error(f"Failed to launch BrowserOS: {e}")
        raise typer.Exit(1)

    if no_mcp:
        log_success("BrowserOS launched.")
        raise typer.Exit(0)

    # Wait for MCP server
    port = resolve_mcp_port(mcp_port)
    log_info(f"Waiting for MCP server on port {port}...")

    if wait_for_mcp(port, timeout):
        print_connection_info(port)
    else:
        log_warning(
            f"MCP server did not respond within {timeout}s. "
            "BrowserOS is running, but the MCP server may not be ready yet. "
            "You can try again with a longer --timeout."
        )
