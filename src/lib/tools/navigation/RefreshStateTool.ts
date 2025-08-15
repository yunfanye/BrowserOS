import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { ExecutionContext } from '@/lib/runtime/ExecutionContext';
import { refreshStateToolDescription } from './RefreshStateTool.prompt';
import { toolSuccess, toolError, type ToolOutput } from "@/lib/tools/Tool.interface"
import { PubSub } from '@/lib/pubsub'

// Input schema - no inputs needed
export const RefreshStateInputSchema = z.object({})

export type RefreshStateInput = z.infer<typeof RefreshStateInputSchema>

export class RefreshStateTool {
  constructor(private executionContext: ExecutionContext) {}

  async execute(_input: RefreshStateInput): Promise<ToolOutput> {
    try {

      const browserContext = this.executionContext.browserContext
      if (!browserContext) {
        return toolError("Browser context not available")
      }

      // Get current page
      const currentPage = await browserContext.getCurrentPage()
      if (!currentPage) {
        return toolError("No active page to refresh state from")
      }

      // Get fresh browser state - use simplified mode for cleaner output
      const browserState = await browserContext.getBrowserStateString(true)

      this.executionContext.getPubSub().publishMessage(PubSub.createMessage(`Refreshed browser state...`, 'thinking'))
      return toolSuccess(browserState)
    } catch (error) {
      return toolError(`Failed to refresh browser state: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

// LangChain wrapper factory function
export function createRefreshStateTool(executionContext: ExecutionContext): DynamicStructuredTool {
  return new DynamicStructuredTool({
    name: 'refresh_browser_state_tool',
    description: refreshStateToolDescription,
    schema: z.object({}),  // No parameters needed
    func: async () => {
      try {
        // Get COMPLEX state (false = not simplified, include everything)
        const complexBrowserState = await executionContext.browserContext.getBrowserStateString(false);
        
        return JSON.stringify({
          ok: true,
          output: complexBrowserState
        });
      } catch (error) {
        return JSON.stringify({
          ok: false,
          error: `Failed to get complex browser state: ${error instanceof Error ? error.message : String(error)}`
        });
      }
    }
  });
}
