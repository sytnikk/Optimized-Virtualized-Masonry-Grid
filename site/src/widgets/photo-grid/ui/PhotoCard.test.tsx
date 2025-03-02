import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@test/utils/test-utils'
import { PhotoCard } from './PhotoCard'
import { Photo } from '@entities/photo/api/PhotoTypes'
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('PhotoCard', () => {
  let mockPhoto: Photo

  beforeEach(() => {
    mockNavigate.mockClear()
    
    mockPhoto = {
      id: 123,
      width: 1200,
      height: 800,
      url: 'https://example.com/photo/123',
      photographer: 'Jane Doe',
      photographer_url: 'https://example.com/photographers/jane-doe',
      src: {
        original: 'https://example.com/photos/original.jpg',
        large: 'https://example.com/photos/large.jpg',
        medium: 'https://example.com/photos/medium.jpg',
        small: 'https://example.com/photos/small.jpg',
        large2x: 'https://example.com/photos/large2x.jpg',
        portrait: 'https://example.com/photos/portrait.jpg',
        landscape: 'https://example.com/photos/landscape.jpg',
        tiny: 'https://example.com/photos/tiny.jpg',
      },
      liked: false,
      alt: 'A beautiful landscape'
    }
  })
  
  it('renders the photo card with photographer information', () => {
    render(<PhotoCard photo={mockPhoto} />)
    
    expect(screen.getByText(`by ${mockPhoto.photographer}`)).toBeInTheDocument()
  })
  
  it('hides skeleton and shows image after load', async () => {
    render(<PhotoCard photo={mockPhoto} />)
    
    const image = screen.getByAltText(mockPhoto.alt || mockPhoto.photographer)
    
    fireEvent.load(image)
    
    await waitFor(() => {
      expect(image.parentElement).toHaveStyle('opacity: 1')
    })
    
    const skeleton = document.querySelector('[class$="ImageSkeleton"]')
    expect(skeleton).not.toBeInTheDocument()
  })
  
  it('shows a placeholder when image fails to load', async () => {
    render(<PhotoCard photo={mockPhoto} />)
    
    const image = screen.getByAltText(mockPhoto.alt || mockPhoto.photographer)
    
    fireEvent.error(image)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument()
    })
  })
  
  it('navigates to the photo detail page when clicked', () => {
    render(<PhotoCard photo={mockPhoto} />)
    
    const link = screen.getByRole('link')
    fireEvent.click(link)
    
    expect(mockNavigate).toHaveBeenCalledWith(
      `/photo/${mockPhoto.id}`, 
      { state: { photo: mockPhoto } }
    )
  })
  
  it('uses the correct image source from photo data', () => {
    render(<PhotoCard photo={mockPhoto} />)
    
    const image = screen.getByAltText(mockPhoto.alt || mockPhoto.photographer)
    expect(image).toHaveAttribute('src', mockPhoto.src.medium)
  })
  
  it('falls back to photographer name when alt text is missing', () => {
    const photoWithoutAlt = {...mockPhoto, alt: ''}
    
    render(<PhotoCard photo={photoWithoutAlt} />)
    
    const image = screen.getByAltText(photoWithoutAlt.photographer)
    expect(image).toBeInTheDocument()
  })
})