# BrowserOS Agent

> **⚠️ Note:** This is only the submodule for the browserOS agent.  
> **Main repository:** [https://github.com/browseros-ai/BrowserOS](https://github.com/browseros-ai/BrowserOS)


## Development

### Debugging with VS Code

The project includes comprehensive VS Code debugging support for Chrome extensions:

#### 🚀 One-Click Debugging

1. **Set breakpoints** in any file under `src/` (background scripts, options page, etc.)
2. **Press F5** or select **"🚀 Debug Extension (One-Click)"** from the debug dropdown

#### Debugging Different Contexts

After launching the main debug configuration, you can attach to specific contexts:

- **Background Script**: Use "Debug Background Script (Service Worker)" 
- **Options Pages**: Use "Debug Extension Pages (Options)"
- **Content Scripts**: Use "Debug Content Scripts (Web Pages)"

#### Setup Requirements

- Make sure Chrome is installed at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- The debug profile will be created at `.chrome-debug-profile/` (ignored by git)
- Port 9222 will be used for remote debugging

### Building

```bash
# Production build
npm run build

# Development build (with source maps)
npm run build:dev

# Development build with file watching
npm run build:watch
```

### Project Structure

```
src/
├── background/          # Service worker (background script)
├── options/            # Options page (main UI)
├── content/            # Content scripts
├── lib/                # Shared libraries
│   ├── browser/        # Browser automation (puppeteer-core)
│   ├── agent/          # LLM agents
│   ├── tools/          # Browser automation tools
│   └── utilities/      # Utilities (LogUtility, etc.)
└── config.ts           # Global configuration (DEV_MODE, etc.)
```

### Configuration

Key settings in `src/config.ts`:

```typescript
export const config = {
  DEV_MODE: true,     // Shows logs in options page
  VERSION: '0.1.0',
  LOG_LEVEL: 'info'
}
```

## Usage

1. **Install Extension**: Load `dist/` directory in Chrome extensions
2. **Open Control Panel**: Click extension icon to open options page
3. **View Logs**: Development logs appear in real-time (when DEV_MODE: true)

## Architecture

- **Port Messaging**: Uses `OPTIONS_TO_BACKGROUND` for UI ↔ Background communication
- **Centralized Logging**: `LogUtility` routes logs to options page when DEV_MODE enabled

## License

AGPL-v3.0
