import { renderHook } from '@testing-library/react'
import { useGalleryPhotos } from './useGalleryPhotos'
import { useSearchPhotos } from '@features/photo-search/hooks/useSearchPhotos'
import { useFeaturedPhotos } from '@features/featured-photos/hooks/useFeaturedPhotos'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Photo } from '@entities/photo/api/PhotoTypes'

vi.mock('@features/photo-search/hooks/useSearchPhotos')
vi.mock('@features/featured-photos/hooks/useFeaturedPhotos')

describe('useGalleryPhotos', () => {
  const mockSearchHook = {
    photos: ['search1', 'search2'] as unknown as Photo[],
    loading: false,
    hasMore: true,
    perPage: 30,
    searchPhotos: vi.fn(),
    loadMore: vi.fn(),
    reset: vi.fn(),
    error: null,
    fetchPhotos: vi.fn()
  }

  const mockFeaturedHook = {
    photos: ['featured1', 'featured2'] as unknown as Photo[],
    loading: true,
    hasMore: false,
    perPage: 20,
    getFeaturedPhotos: vi.fn(),
    loadMore: vi.fn(),
    reset: vi.fn(),
    error: null,
    fetchPhotos: vi.fn()
  }

  beforeEach(() => {
    vi.mocked(useSearchPhotos).mockReturnValue(mockSearchHook)
    vi.mocked(useFeaturedPhotos).mockReturnValue(mockFeaturedHook)
  })

  it('returns search data when query exists', () => {
    const { result } = renderHook(() => useGalleryPhotos('cats'))
    expect(result.current.photos).toBe(mockSearchHook.photos)
    expect(result.current.loading).toBe(mockSearchHook.loading)
  })

  it('returns featured data when no query', () => {
    const { result } = renderHook(() => useGalleryPhotos(''))
    expect(result.current.photos).toBe(mockFeaturedHook.photos)
    expect(result.current.loading).toBe(mockFeaturedHook.loading)
  })
})