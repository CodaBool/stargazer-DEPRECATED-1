'use client'
import { useEffect, useState } from 'react'
import { MENU_HEIGHT_PX } from '@/app/[map]/page'

export default function useScreen(type) {
  const [screenSize, setScreenSize] = useState()

  useEffect(() => {
    if (type === "use full window size") {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
      const handleResize = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight })
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    } else {
      if (document.querySelector(".map-container")) {
        const width = document.querySelector(".map-container").clientWidth
        if (width < 500) {
          setScreenSize({ width, height: width })
        } else {
          setScreenSize({ width: width - 100, height: width - 100 })
        }
      }
    }
  }, [])

  if (!screenSize) return null

  return ({
    height: screenSize.height - (type === "use full window size" && MENU_HEIGHT_PX),
    width: screenSize.width,
  })
}
