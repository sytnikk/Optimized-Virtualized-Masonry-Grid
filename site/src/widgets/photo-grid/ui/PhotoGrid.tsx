import { useRef } from 'react'
import { Photo } from '@entities/photo/api/PhotoTypes'
import { usePhotoDistribution } from '../hooks/usePhotoDistribution'
import { useResponsiveColumns } from '../hooks/useResponsiveColumns'
import { useVirtualGrid } from '../hooks/useVirtualGrid'
import { useInfiniteLoader } from '../hooks/useInfiniteLoader'
import { MasonryColumn, GridContainer, MasonryGrid } from './PhotoGrid.styles'
import { PhotoCard } from './PhotoCard'

interface PhotoGridProps {
  photos: Photo[]
  loading: boolean
  error?: Error
  onLoadMore: () => void
  hasMore: boolean
}

export function PhotoGrid({
  photos,
  loading,
  onLoadMore,
  hasMore = false,
}: PhotoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const columns = useResponsiveColumns()
  const photosByColumn = usePhotoDistribution(photos, columns)
  
  const { 
    visibleRanges, 
    maxColumnHeight, 
    handleItemMeasured 
  } = useVirtualGrid({
    photos: photosByColumn,
    columns,
    containerRef,
    overscan: 5,
    gap: 16
  })

  const { loadMoreTriggerRef } = useInfiniteLoader({
    loading,
    hasMore,
    onLoadMore
  })
  
  return (
    <GridContainer ref={containerRef}>
      <MasonryGrid 
        style={{ height: maxColumnHeight > 0 ? maxColumnHeight : 'auto' }}
      >
        {photosByColumn.map((column, colIndex) => {
          const range = visibleRanges[colIndex]
          
          return (
            <MasonryColumn key={colIndex}>
              {range && range.startOffset > 0 && (
                <div style={{ height: range.startOffset }} />
              )}
              {range && column.slice(range.startIndex, range.endIndex + 1).map((photo, index) => {
                const actualIndex = range.startIndex + index
                return (
                  <PhotoCard
                    key={`${photo.id}-${colIndex}-${actualIndex}`}
                    photo={photo}
                    onRender={(height) => handleItemMeasured(photo, height, colIndex, actualIndex)}
                  />
                )
              })}
              {range && range.endOffset > 0 && (
                <div style={{ height: range.endOffset }} />
              )}
            </MasonryColumn>
          )
        })}
      </MasonryGrid>
      
      <div 
        ref={loadMoreTriggerRef}
        style={{ height: 20, opacity: 0 }}
      />
    </GridContainer>
  )
}
