import { RefObject } from 'react'
import { renderHook } from '@testing-library/react'
import { useVirtualGrid } from './useVirtualGrid'
import { expect, vi, describe, it } from 'vitest'
import { Photo } from '@entities/photo/api/PhotoTypes'

describe('useVirtualGrid', () => {
  const mockPhotos: Photo[][] = [[
    { id: 1, width: 100, height: 100 },
    { id: 2, width: 200, height: 300 }
  ]] as Photo[][]
  
  const mockContainer = {
    offsetWidth: 1000,
    clientHeight: 800,
    scrollTop: 0,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }
  
  const mockRef = { current: mockContainer }

  it('calculates visible ranges correctly', () => {
    const { result } = renderHook(() => useVirtualGrid({
      photos: mockPhotos,
      columns: 1,
      containerRef: mockRef as unknown as RefObject<HTMLDivElement>
    }))

    expect(result.current.visibleRanges[0].startIndex).toBe(0)
    expect(result.current.visibleRanges[0].endIndex).toBe(1)
  })
})