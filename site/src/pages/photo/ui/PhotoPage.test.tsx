import { beforeEach, vi, describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PhotoPage } from './PhotoPage'
import { usePhotoById } from '@widgets/photo-details/hooks/usePhotoById'
import { Photo } from '@entities/photo/api/PhotoTypes'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => mockNavigate
}))

vi.mock('@widgets/photo-details/hooks/usePhotoById', () => ({
  usePhotoById: vi.fn()
}))

describe('PhotoPage', () => {
  const mockPhoto: Photo = {
    id: 1,
    width: 100,
    height: 100,
    url: 'https://example.com/photo.jpg',
    photographer: 'John Doe',
    alt: 'Test Photo',
    src: {
      original: 'https://example.com/photo.jpg',
      large2x: 'https://example.com/photo-large2x.jpg',
      large: 'https://example.com/photo-large.jpg',
      medium: 'https://example.com/photo-medium.jpg',
      small: 'https://example.com/photo-small.jpg',
      portrait: 'https://example.com/photo-portrait.jpg',
      landscape: 'https://example.com/photo-landscape.jpg',
      tiny: 'https://example.com/photo-tiny.jpg'
    },
    liked: false,
    photographer_url: 'https://example.com/photographer',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(usePhotoById).mockImplementation(() => ({ photo: null, error: null, loading: false }))
  })

  it('renders photo details on success', () => {
    vi.mocked(usePhotoById).mockImplementation(() => ({ photo: mockPhoto, error: null, loading: false }))
    render(<PhotoPage />)
    
    expect(screen.getByText('Test Photo')).toBeInTheDocument()
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
  })

  it('renders error message on failure', () => {
    vi.mocked(usePhotoById).mockImplementation(() => ({ photo: null, error: new Error('Failed'), loading: false }))
    render(<PhotoPage />)
    expect(screen.getByText('Error loading photo')).toBeInTheDocument()
  })

  it('navigates back on Escape key', async () => {
    render(<PhotoPage />)
    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })
})