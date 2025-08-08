import React, { memo, useState } from 'react'
import { Button } from '@/sidepanel/components/ui/button'
import { useSidePanelPortMessaging } from '@/sidepanel/hooks'
import { MessageType } from '@/lib/types/messaging'
import { useAnalytics } from '../hooks/useAnalytics'
import { SettingsModal } from './SettingsModal'
import { HelpSection } from './HelpSection'
import { HelpIcon, SettingsIcon, PauseIcon, ResetIcon, GitHubIcon } from './ui/Icons'

const GITHUB_REPO_URL: string = 'https://github.com/browseros-ai/BrowserOS'

interface HeaderProps {
  onReset: () => void
  showReset: boolean
  isProcessing: boolean
}

/**
 * Header component for the sidepanel
 * Displays title, connection status, and action buttons (pause/reset)
 * Memoized to prevent unnecessary re-renders
 */
export const Header = memo(function Header({ onReset, showReset, isProcessing }: HeaderProps) {
  const { sendMessage, connected } = useSidePanelPortMessaging()
  const { trackClick } = useAnalytics()
  const [showSettings, setShowSettings] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  
  
  const handleCancel = () => {
    trackClick('pause_task')
    sendMessage(MessageType.CANCEL_TASK, {
      reason: 'User clicked pause button',
      source: 'sidepanel'
    })
  }
  
  const handleReset = () => {
    trackClick('reset_conversation')
    // Send reset message to background
    sendMessage(MessageType.RESET_CONVERSATION, {
      source: 'sidepanel'
    })
    
    // Clear local state
    onReset()
  }

  const handleSettingsClick = () => {
    trackClick('open_settings')
    setShowSettings(true)
  }

  const handleHelpClick = () => {
    trackClick('open_help')
    setShowHelp(true)
  }

  return (
    <>
      <header 
        className="relative flex items-center justify-between h-12 px-3 bg-[hsl(var(--header))] border-b border-border/50"
        role="banner"
      >

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              trackClick('star_github')
              window.open(GITHUB_REPO_URL, '_blank', 'noopener,noreferrer')
            }}
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-brand/5 hover:text-brand transition-all duration-300"
            aria-label="Star on GitHub"
            title="Star on GitHub"
          >
            <GitHubIcon />
            Star us on Github
          </Button>
        </div>
        


        <nav className="flex items-center gap-3" role="navigation" aria-label="Chat controls">
          {/* Help button */}
          <Button
            onClick={handleHelpClick}
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 rounded-xl hover:bg-brand/10 hover:text-brand transition-all duration-300"
            aria-label="Open help"
          >
            <HelpIcon />
          </Button>

          {/* Settings button */}
          <Button
            onClick={handleSettingsClick}
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 rounded-xl hover:bg-brand/10 hover:text-brand transition-all duration-300"
            aria-label="Open settings"
          >
            <SettingsIcon />
          </Button>

          {isProcessing && (
            <Button
              onClick={handleCancel}
              variant="ghost"
              size="sm"
              className="text-xs hover:bg-brand/5 hover:text-brand transition-all duration-300"
              aria-label="Pause current task"
            >
              <PauseIcon />
              Pause
            </Button>
          )}
          
          {showReset && !isProcessing && (
            <Button
              onClick={handleReset}
              variant="ghost"
              size="sm"
              className="text-xs hover:bg-brand/5 hover:text-brand transition-all duration-300"
              aria-label="Reset conversation"
            >
              <ResetIcon />
              Reset
            </Button>
          )}
        </nav>

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </header>

      {/* Help Section */}
      <HelpSection 
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </>
  )
})