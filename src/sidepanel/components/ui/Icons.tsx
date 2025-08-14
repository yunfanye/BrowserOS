// components/Icons.tsx
import React, { useState, useEffect, useRef } from 'react'


export const PlusIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v14m7-7H5"
    />
  </svg>
)

export const ArrowDownIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
)

export const XIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

export const SunIcon = () => (
  <svg
    className="w-3 h-3 text-white"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
    />
  </svg>
)

export const MoonIcon = () => (
  <svg
    className="w-3 h-3 text-white"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
    />
  </svg>
)

export const UserIcon = () => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
    />
  </svg>
)

export const TabsIcon = () => (
  <svg
    className="w-3 h-3 mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
)

export const CloseIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

export const SendIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {/* Standard paper-plane send icon pointing up-right */}
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

export const SettingsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
    <path d="m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm55.33-66.67h85l14-110q32.34-8 60.84-24.5T649-321l103.67 44.33 39.66-70.66L701-415q4.33-16 6.67-32.17Q710-463.33 710-480q0-16.67-2-32.83-2-16.17-7-32.17l91.33-67.67-39.66-70.66L649-638.67q-22.67-25-50.83-41.83-28.17-16.83-61.84-22.83l-13.66-110h-85l-14 110q-33 7.33-61.5 23.83T311-639l-103.67-44.33-39.66 70.66L259-545.33Q254.67-529 252.33-513 250-497 250-480q0 16.67 2.33 32.67 2.34 16 6.67 32.33l-91.33 67.67 39.66 70.66L311-321.33q23.33 23.66 51.83 40.16 28.5 16.5 60.84 24.5l13.66 110Zm43.34-200q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39Z" />
  </svg>
)

export const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
)

export const ChevronUpIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
)

// used in MessageList
export const AnimatedPawPrints = ({
  delay = 9000,
  speed = 4,
  opacity = 0.3
}: {
  delay?: number
  speed?: number
  opacity?: number
}) => {
  const [isRunning, setIsRunning] = useState(false)
  const [fadeOutProgress, setFadeOutProgress] = useState(0) // 0 = not fading, 1 = fully faded

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let fadeOutInterval: ReturnType<typeof setInterval>

    const start = () => {
      setIsRunning(true)
      setFadeOutProgress(0)

      // Start fade-out after `speed` seconds
      setTimeout(() => {
        const startTime = Date.now()
        const fadeOutDuration = 1500 // 1.5 seconds
        
        // Update fade-out progress every 16ms (60fps)
        fadeOutInterval = setInterval(() => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(1, elapsed / fadeOutDuration)
          setFadeOutProgress(progress)
          
          if (progress >= 1) {
            clearInterval(fadeOutInterval)
            setIsRunning(false)
            
            // Wait for `delay` before starting the next cycle
            timer = setTimeout(start, delay)
          }
        }, 16)
      }, speed * 1000)
    }

    // Initial delay before first run
    timer = setTimeout(start, delay)

    return () => {
      clearTimeout(timer)
      clearInterval(fadeOutInterval)
    }
  }, [delay, speed])

  if (!isRunning) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {[...Array(8)].map((_, step) => {
        const isLeft = step % 2 === 0
        const size = 28 - step * 1.8
        const delay = step * 0.3
        const x = -50 + step * 18
        const y = 80 - step * 10 + (isLeft ? -8 : 8)

        // Calculate fade-out opacity
        let currentOpacity = opacity * (1 - step * 0.04)
        if (fadeOutProgress > 0) {
          currentOpacity *= (1 - fadeOutProgress)
        }

        return (
          <div
            key={step}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: currentOpacity,
              animation: `paw-run-across-diagonal ${speed}s ease-in-out ${delay}s forwards`,
              transform: `rotate(${isLeft ? -5 : 5}deg)`
            }}
          >
            <PawIcon variant="brand" />
          </div>
        )
      })}
    </div>
  )
}
// used in bottom of chat input (going to move location probably)
export const LoadingPawTrail = () => {
  const [visibleSteps, setVisibleSteps] = useState<Array<{ step: number; id: string }>>([])
  const animationCounterRef = useRef(0)

  useEffect(() => {
    const animate = () => {
      setVisibleSteps([])
      animationCounterRef.current += 1
      const currentCounter = animationCounterRef.current
      
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, { step: i, id: `${currentCounter}-${i}` }])
        }, i * 200)
      }
      setTimeout(() => {
        setVisibleSteps([])
        setTimeout(animate, 500)
      }, 1500)
    }
    animate()
  }, [])

  return (
    <div className="relative inline-flex items-center h-4 w-12">
      {visibleSteps.map(({ step, id }) => {
        const size = 8 - step * 1.5
        const left = `${step * 12}px`
        const opacity = 1 - step * 0.3

        return (
          <div
            key={id}
            className="absolute"
            style={{
              left,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animation: 'paw-fade-in 0.3s ease-out'
            }}
          >
            <PawIcon variant="default" />
          </div>
        )
      })}
    </div>
  )
}
// used in AnimatedPawPrints and LoadingPawTrail
export const PawIcon = ({ variant = 'default' }: { variant?: 'brand' | 'default' }) => (
  <svg
    fill={variant === 'brand' ? 'hsl(var(--brand))' : 'currentColor'}
    viewBox="0 0 24 24"
    className="w-full h-full"
    aria-hidden="true"
  >
    <path d="M19.5 18c1 1.6 1.5 2.4 1.5 3.3 0 1.7-1.3 2.6-3 2.6-.8 0-1.3 0-2.5-.6-.8-.7-2.7-.7-2.7-.7-.8 0-1.9.7-2.7.7-1.3.6-1.7.6-2.5.6-1.7 0-3-1-3-2.6 0-.9.5-1.7 1.5-3.3 1.9-3.2 3.6-4.7 3.6-4.7.5 0 1.2 0 2.7 0s2.2 0 2.7 0c1.9 1.5 3.9 4.7 3.9 4.7zm-3.9-7.5c1.8 0 3.3-2.3 3.3-5.2S17.4 0 15.6 0s-3.3 2.3-3.3 5.2 1.5 5.2 3.3 5.2zm-8.1 0c1.8 0 3.3-2.3 3.3-5.2S9.3 0 7.5 0 4.2 2.3 4.2 5.2s1.5 5.2 3.3 5.2zm-4.2 5.2c1.3-.6 1.6-2.8.7-4.9S2 8.3.7 8.9s-1.6 2.8-.7 4.9 2.8 1.7 4.2 1.1zm12.3 0c1.3.6 3.2-.5 4.2-1.1s1.6-2.8.7-4.9-2.9-2.2-4.2-1.6-1.6 2.8-.7 4.9z" />
  </svg>
)

// Icons from Header.tsx and HelpSection.tsx
export const HelpIcon = () => (
  <svg className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
    <path d="M482-244.67q17.67 0 29.83-12.16Q524-269 524-286.67q0-17.66-12.17-29.83-12.16-12.17-29.83-12.17-17.67 0-29.83 12.17Q440-304.33 440-286.67q0 17.67 12.17 29.84 12.16 12.16 29.83 12.16Zm-35.33-148.66h64q0-28.34 6.83-49 6.83-20.67 41.17-50.34 29.33-26 43-50.5 13.66-24.5 13.66-55.5 0-54-36.66-85.33-36.67-31.33-93.34-31.33-51.66 0-88.5 26.33Q360-662.67 344-620l57.33 22q9-24.67 29.5-42t52.5-17.33q33.34 0 52.67 18.16 19.33 18.17 19.33 44.5 0 21.34-12.66 40.17-12.67 18.83-35.34 37.83-34.66 30.34-47.66 54-13 23.67-13 69.34ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33Z" />
  </svg>
)

export const PauseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
    <path d="M523.33-200v-560H760v560H523.33ZM200-200v-560h236.67v560H200Zm390-66.67h103.33v-426.66H590v426.66Zm-323.33 0H370v-426.66H266.67v426.66Zm0-426.66v426.66-426.66Zm323.33 0v426.66-426.66Z" />
  </svg>
)

export const ResetIcon = () => (
  <svg className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
    <path d="M198.67-326.67Q178-363.33 169-401t-9-77q0-132 94-226.33 94-94.34 226-94.34h31l-74.67-74.66L481-918l152.67 152.67L481-612.67 435.67-658l74-74H480q-104.67 0-179 74.5T226.67-478q0 28 5.66 53.67 5.67 25.66 15 49l-48.66 48.66ZM477.67-40 325-192.67l152.67-152.66 44.66 44.66L447.67-226H480q104.67 0 179-74.5T733.33-480q0-28-5.33-53.67-5.33-25.66-16-49l48.67-48.66q20.66 36.66 30 74.33 9.33 37.67 9.33 77 0 132-94 226.33-94 94.34-226 94.34h-32.33l74.66 74.66L477.67-40Z" />
  </svg>
)

export const MonitorIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
)

export const PauseIconFilled = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
  </svg>
)

export const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3v5h-5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H3v5" />
  </svg>
)

export const ExternalLinkIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export const GitHubIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)




