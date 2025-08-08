import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { z } from 'zod'

// Settings schema
const SettingsSchema = z.object({
  fontSize: z.number().min(13).max(21).default(14),  // Font size in pixels
  theme: z.enum(['light', 'dark', 'gray']).default('light')  // App theme
})

type Settings = z.infer<typeof SettingsSchema>

// Store actions
interface SettingsActions {
  setFontSize: (size: number) => void
  setTheme: (theme: 'light' | 'dark' | 'gray') => void
  resetSettings: () => void
}

// Initial state
const initialState: Settings = {
  fontSize: 14,
  theme: 'light'
}

// Create the store with persistence
export const useSettingsStore = create<Settings & SettingsActions>()(
  persist(
    (set) => ({
      // State
      ...initialState,
      
      // Actions
      setFontSize: (size) => {
        set({ fontSize: size })
        // Apply font size to document
        document.documentElement.style.setProperty('--app-font-size', `${size}px`)
      },
      
      setTheme: (theme) => {
        set({ theme })
        // Apply theme classes to document
        const root = document.documentElement
        root.classList.remove('dark')
        root.classList.remove('gray')
        if (theme === 'dark') root.classList.add('dark')
        if (theme === 'gray') root.classList.add('gray')
      },
      
      resetSettings: () => {
        set(initialState)
        // Reset document styles
        document.documentElement.style.removeProperty('--app-font-size')
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.remove('gray')
      }
    }),
    {
      name: 'nxtscape-settings',  // localStorage key
      version: 2,
      migrate: (persisted: any, version: number) => {
        // Migrate from v1 isDarkMode -> theme
        if (version === 1 && persisted) {
          const isDarkMode: boolean = persisted.isDarkMode === true
          const next = {
            fontSize: typeof persisted.fontSize === 'number' ? persisted.fontSize : 14,
            theme: isDarkMode ? 'dark' : 'light'
          }
          return next
        }
        return persisted as Settings
      }
    }
  )
) 