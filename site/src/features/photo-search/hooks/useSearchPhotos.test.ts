import { renderHook } from '@testing-library/react'
import { useSearchPhotos } from './useSearchPhotos'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import * as usePhotosModule from '@shared/photo/hooks/usePhotos'

describe('useSearchPhotos', () => {
  const mockFetchPhotos = vi.fn()
  const mockLoadMore = vi.fn()
  
  beforeEach(() => {
    vi.spyOn(usePhotosModule, 'usePhotos').mockReturnValue({
      fetchPhotos: mockFetchPhotos,
      loadMore: mockLoadMore,
      photos: [],
      loading: false,
      hasMore: false,
      error: null,
      reset: vi.fn(),
      perPage: 36
    })
  })

  it('should not call API with empty query', async () => {
    const { result } = renderHook(() => useSearchPhotos())
    await result.current.searchPhotos('')
    expect(mockFetchPhotos).not.toHaveBeenCalled()
  })

  it('should call API with query', async () => {
    const controller = new AbortController()
    const { result } = renderHook(() => useSearchPhotos())
    await result.current.searchPhotos('test', controller.signal)
    expect(mockFetchPhotos).toHaveBeenCalledWith(
      expect.objectContaining({ query: 'test' }),
      expect.any(AbortSignal)
    )
  })

  it('should handle loadMore with query', async () => {
    const controller = new AbortController()
    const { result } = renderHook(() => useSearchPhotos())
    await result.current.loadMore('test', controller.signal)
    expect(mockLoadMore).toHaveBeenCalledWith(
      expect.objectContaining({ query: 'test' }),
      expect.any(AbortSignal)
    )
  })
})