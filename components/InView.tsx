import React, { useEffect, useRef } from "react"

interface InViewProps {
  onInView: () => void
  children: React.ReactNode
}

const InView: React.FC<InViewProps> = ({ onInView, children }) => {
  const elementRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        onInView()
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={elementRef}>{children}</div>
}

export default InView
