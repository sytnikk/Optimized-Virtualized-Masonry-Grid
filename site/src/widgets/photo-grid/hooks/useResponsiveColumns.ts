import { useState, useEffect } from 'react'

interface ColumnBreakpoints {
  mobile?: number
  tablet?: number
  desktop?: number
  mobileColumns?: number
  tabletColumns?: number
  desktopColumns?: number
}

export function useResponsiveColumns({
  mobile = 640,
  tablet = 1024,
  desktop = 1440,
  mobileColumns = 2,
  tabletColumns = 4,
  desktopColumns = 6
}: ColumnBreakpoints = {}) {
  const [columns, setColumns] = useState(desktopColumns)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < mobile) {
        setColumns(mobileColumns)
      } else if (window.innerWidth < tablet) {
        setColumns(tabletColumns)
      } else {
        setColumns(desktopColumns)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [mobile, tablet, desktop, mobileColumns, tabletColumns, desktopColumns])

  return columns
}