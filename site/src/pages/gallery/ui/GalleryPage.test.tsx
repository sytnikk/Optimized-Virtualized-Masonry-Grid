import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { GalleryPage } from './GalleryPage'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import * as useGalleryPhotosModule from '../hooks/useGalleryPhotos'

describe('GalleryPage', () => {
  const mockGalleryPhotos = {
    photos: [],
    loading: false,
    hasMore: false,
    searchPhotos: vi.fn(),
    loadMoreSearch: vi.fn(),
    resetSearch: vi.fn(),
    getFeaturedPhotos: vi.fn(), 
    loadMoreFeatured: vi.fn(),
    resetFeatured: vi.fn(),
    perPage: 36
  }

  beforeEach(() => {
    vi.spyOn(useGalleryPhotosModule, 'useGalleryPhotos').mockReturnValue(mockGalleryPhotos)
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  it('loads featured photos initially', () => {
    render(<GalleryPage />)
    expect(mockGalleryPhotos.getFeaturedPhotos).toHaveBeenCalled()
  })

  it('searches when query entered', async () => {
    render(<GalleryPage />)
 
    const input = screen.getByPlaceholderText('Search amazing photos...')
    fireEvent.input(input, { target: { value: 'test' } })
    fireEvent.blur(input)
    
    await waitFor(() => { 
      expect(mockGalleryPhotos.searchPhotos).toHaveBeenCalled()
      expect(mockGalleryPhotos.searchPhotos.mock.calls[0][0]).toBe('test')
    })
  })
})