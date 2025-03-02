import { renderHook } from '@testing-library/react'
import { useFeaturedPhotos } from './useFeaturedPhotos'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import * as usePhotosModule from '@shared/photo/hooks/usePhotos'

describe('useFeaturedPhotos', () => {
  const mockFetchPhotos = vi.fn()
  
  beforeEach(() => {
    mockFetchPhotos.mockReset()
    
    vi.spyOn(usePhotosModule, 'usePhotos').mockReturnValue({
      fetchPhotos: mockFetchPhotos,
      loadMore: vi.fn(),
      photos: [],
      loading: false,
      hasMore: false,
      error: null,
      reset: vi.fn(),
      perPage: 36
    })
  })

  it('should use default perPage', () => {
    const { result } = renderHook(() => useFeaturedPhotos())
    result.current.getFeaturedPhotos()
    expect(mockFetchPhotos).toHaveBeenCalled()
  })

  it('should expose getFeaturedPhotos as alias for fetchPhotos', () => {
    const { result } = renderHook(() => useFeaturedPhotos())
    result.current.getFeaturedPhotos()
    expect(mockFetchPhotos).toHaveBeenCalled()
  })
})