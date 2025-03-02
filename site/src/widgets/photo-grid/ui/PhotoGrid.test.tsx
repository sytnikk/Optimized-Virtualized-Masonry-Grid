import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@test/utils/test-utils'
import { PhotoGrid } from './PhotoGrid'
import * as useResponsiveColumnsModule from '../hooks/useResponsiveColumns'
import * as useVirtualGridModule from '../hooks/useVirtualGrid'
import * as usePhotoDistributionModule from '../hooks/usePhotoDistribution'
import { Photo } from '@entities/photo/api/PhotoTypes'

vi.mock('./PhotoCard', () => ({
  PhotoCard: ({ photo, onRender }: { photo: Photo, onRender: (height: number) => void }) => {
    setTimeout(() => onRender(200), 0)
    return (
      <div data-testid={`photo-card-${photo.id}`} className="photo-card">
        {photo.photographer}
      </div>
    )
  },
}))

describe('PhotoGrid', () => {
  const mockPhotos: Photo[] = [
    {
      id: 1,
      width: 1200,
      height: 800,
      photographer: 'John Doe',
      photographer_url: 'https://example.com/john',
      url: 'https://example.com/photo1',
      liked: false,
      src: {
        original: 'https://example.com/photo1-original.jpg',
        large: 'https://example.com/photo1-large.jpg',
        medium: 'https://example.com/photo1-medium.jpg',
        small: 'https://example.com/photo1-small.jpg',
        large2x: 'https://example.com/photo1-large2x.jpg',
        portrait: 'https://example.com/photo1-portrait.jpg',
        landscape: 'https://example.com/photo1-landscape.jpg',
        tiny: 'https://example.com/photo1-tiny.jpg',
      },
      alt: 'Beautiful landscape',
    },
    {
      id: 2,
      width: 800,
      height: 1200,
      photographer: 'Jane Smith',
      photographer_url: 'https://example.com/jane',
      url: 'https://example.com/photo2',
      liked: false,
      src: {
        original: 'https://example.com/photo2-original.jpg',
        large: 'https://example.com/photo2-large.jpg',
        medium: 'https://example.com/photo2-medium.jpg',
        small: 'https://example.com/photo2-small.jpg',
        large2x: 'https://example.com/photo2-large2x.jpg',
        portrait: 'https://example.com/photo2-portrait.jpg',
        landscape: 'https://example.com/photo2-landscape.jpg',
        tiny: 'https://example.com/photo2-tiny.jpg',
      },
      alt: 'City skyline',
    },
    {
      id: 3,
      width: 1000,
      height: 1000,
      photographer: 'Sam Brown',
      photographer_url: 'https://example.com/sam',
      url: 'https://example.com/photo3',
      liked: false,
      src: {
        original: 'https://example.com/photo3-original.jpg',
        large: 'https://example.com/photo3-large.jpg',
        medium: 'https://example.com/photo3-medium.jpg',
        small: 'https://example.com/photo3-small.jpg',
        large2x: 'https://example.com/photo3-large2x.jpg',
        portrait: 'https://example.com/photo3-portrait.jpg',
        landscape: 'https://example.com/photo3-landscape.jpg',
        tiny: 'https://example.com/photo3-tiny.jpg',
      },
      alt: 'Mountain view',
    },
  ]

  beforeEach(() => {
    // Reset all mocks
    vi.resetAllMocks()
    
    // Mock hooks
    vi.spyOn(useResponsiveColumnsModule, 'useResponsiveColumns').mockReturnValue(2)
    
    vi.spyOn(usePhotoDistributionModule, 'usePhotoDistribution').mockReturnValue([
      [mockPhotos[0], mockPhotos[2]],
      [mockPhotos[1]]
    ])
    
    vi.spyOn(useVirtualGridModule, 'useVirtualGrid').mockReturnValue({
      visibleRanges: [
        { startIndex: 0, endIndex: 1, startOffset: 0, endOffset: 0, topOffset: 0 },
        { startIndex: 0, endIndex: 0, startOffset: 0, endOffset: 0, topOffset: 0 }
      ],
      maxColumnHeight: 800,
      handleItemMeasured: vi.fn()
    })
  })

  it('renders the grid with the correct number of columns', () => {
    render(
      <PhotoGrid
        photos={mockPhotos}
        loading={false}
        onLoadMore={vi.fn()}
        hasMore={true}
      />
    )

    const cards = screen.getAllByText(/John Doe|Jane Smith|Sam Brown/)
    expect(cards).toHaveLength(mockPhotos.length)
  })
})