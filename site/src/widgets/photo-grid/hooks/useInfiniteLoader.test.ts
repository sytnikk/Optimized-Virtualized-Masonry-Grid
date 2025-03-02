import { renderHook } from '@testing-library/react'
import { useInfiniteLoader } from './useInfiniteLoader'
import { expect, vi, describe, it, beforeEach } from 'vitest'

describe('useInfiniteLoader', () => {
  const mockIntersectionObserver = vi.fn()
  const disconnect = vi.fn()
  const observe = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockIntersectionObserver.mockImplementation(() => ({
      observe,
      disconnect,
      unobserve: vi.fn()
    }))
    window.IntersectionObserver = mockIntersectionObserver
  })

  it('should call onLoadMore when intersecting', () => {
    const onLoadMore = vi.fn()
    renderHook(() => useInfiniteLoader({
      loading: false,
      hasMore: true,
      onLoadMore
    }))

    const [callback] = mockIntersectionObserver.mock.calls[0]
    callback([{ isIntersecting: true }])

    expect(onLoadMore).toHaveBeenCalled()
  })

  it('should not call onLoadMore when loading', () => {
    const onLoadMore = vi.fn()
    renderHook(() => useInfiniteLoader({
      loading: true,
      hasMore: true,
      onLoadMore
    }))

    expect(observe).not.toHaveBeenCalled()
  })
})