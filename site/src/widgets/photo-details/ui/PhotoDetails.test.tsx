import { describe, it, expect } from 'vitest'
import { render, screen } from '@test/utils/test-utils'
import { PhotoDetails } from './PhotoDetails'
import { Photo } from '@entities/photo/api/PhotoTypes'

describe('PhotoDetails', () => {
  const mockPhoto: Photo = {
    id: 123,
    width: 1920,
    height: 1080,
    url: 'https://example.com/photo.jpg',
    photographer: 'Sanic Hegehog',
    photographer_url: 'https://example.com/johndoe',
    liked: false,
    src: {
      original: 'https://example.com/photo_original.jpg',
      large: 'https://example.com/photo_large.jpg',
      medium: 'https://example.com/photo_medium.jpg',
      small: 'https://example.com/photo_small.jpg',
      large2x: 'https://example.com/photo_large2x.jpg',
      portrait: 'https://example.com/photo_portrait.jpg',
      landscape: 'https://example.com/photo_landscape.jpg',
      tiny: 'https://example.com/photo_tiny.jpg',
    },
    alt: 'Beautiful landscape',
  }

  it('renders photographer name', () => {
    render(<PhotoDetails photo={mockPhoto} />)
    
    expect(screen.getByText(/Sanic Hegehog/i)).toBeInTheDocument()
  })

  it('renders photo title', () => {
    render(<PhotoDetails photo={mockPhoto} />)
    
    expect(screen.getByText('Beautiful landscape')).toBeInTheDocument()
  })

  it('renders resolution information', () => {
    render(<PhotoDetails photo={mockPhoto} />)
    
    expect(screen.getByText('1920 × 1080')).toBeInTheDocument()
  })

  it('shows photographer link when available', () => {
    render(<PhotoDetails photo={mockPhoto} />)
    
    const link = screen.getByText('Visit Profile')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com/johndoe')
  })
})