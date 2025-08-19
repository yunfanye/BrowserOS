import React from 'react'
import { Play, Save } from 'lucide-react'

interface AgentEditorHeaderProps {
  notification?: string
  canRun: boolean
  onRun: () => void
  onSave: () => void
}

export function AgentEditorHeader ({ notification, canRun, onRun, onSave }: AgentEditorHeaderProps) {
  return (
    <div className='flex items-center gap-3'>
      {notification && (
        <span className='text-xs text-muted-foreground'>{notification}</span>
      )}
      <button 
        onClick={onRun} 
        disabled={!canRun} 
        className='px-3 py-1.5 text-sm rounded text-white disabled:opacity-50 disabled:cursor-not-allowed bg-[hsl(var(--brand))]'
      >
        <Play className='w-4 h-4 inline mr-1' /> Run
      </button>
      <button 
        onClick={onSave} 
        className='px-3 py-1.5 text-sm rounded border border-border hover:bg-accent transition-colors'
      >
        <Save className='w-4 h-4 inline mr-1' /> Save
      </button>
    </div>
  )
}