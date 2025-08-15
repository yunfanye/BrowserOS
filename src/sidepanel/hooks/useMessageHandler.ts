import { useEffect, useCallback } from 'react'
import { MessageType } from '@/lib/types/messaging'
import { useSidePanelPortMessaging } from '@/sidepanel/hooks'
import { useChatStore, type PubSubMessage } from '../stores/chatStore'

export function useMessageHandler() {
  const { upsertMessage, setProcessing } = useChatStore()
  const { addMessageListener, removeMessageListener } = useSidePanelPortMessaging()

  const handleStreamUpdate = useCallback((payload: any) => {
    // Check if this is a PubSub event
    if (payload?.action === 'PUBSUB_EVENT' && payload?.details?.type === 'message') {
      const message = payload.details.payload as PubSubMessage
      
      // Filter out thinking messages, only show narration messages
      if (message.role === 'narration') {
        return 
      }
      
      upsertMessage(message)
      
      // Check for completion or error messages from agents
      if (message.role === 'assistant' || message.role === 'error') {
        setProcessing(false)
      }
    }
  }, [upsertMessage, setProcessing])
  
  useEffect(() => {
    // Register listener for PubSub events only
    addMessageListener(MessageType.AGENT_STREAM_UPDATE, handleStreamUpdate)
    
    // Cleanup
    return () => {
      removeMessageListener(MessageType.AGENT_STREAM_UPDATE, handleStreamUpdate)
    }
  }, [addMessageListener, removeMessageListener, handleStreamUpdate])
}
