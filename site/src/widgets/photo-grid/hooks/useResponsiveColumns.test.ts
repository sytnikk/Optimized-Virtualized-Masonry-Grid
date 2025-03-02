import { renderHook } from '@testing-library/react'
import { useResponsiveColumns } from './useResponsiveColumns'
import { vi, describe, it, beforeEach, expect } from 'vitest'

describe('useResponsiveColumns', () => {
  beforeEach(() => {
    vi.spyOn(window, 'innerWidth', 'get')
  })

  it('should return mobileColumns when width < mobile', () => {
    window.innerWidth = 500
    const { result } = renderHook(() => useResponsiveColumns())
    expect(result.current).toBe(2)
  })

  it('should return tabletColumns when mobile < width < tablet', () => {
    window.innerWidth = 800
    const { result } = renderHook(() => useResponsiveColumns())
    expect(result.current).toBe(4)
  })

  it('should return desktopColumns when width > tablet', () => {
    window.innerWidth = 1200
    const { result } = renderHook(() => useResponsiveColumns())
    expect(result.current).toBe(6)
  })
})