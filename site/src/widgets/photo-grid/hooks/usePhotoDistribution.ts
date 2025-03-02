import { useMemo } from 'react'
import { Photo } from '@entities/photo/api/PhotoTypes'

export function usePhotoDistribution(photos: Photo[], columns: number) {
  const photosByColumn = useMemo(() => {
    const photosByColumn: Photo[][] = Array(columns).fill(null).map(() => [])
    
    photos.forEach((photo, index) => {
      const columnIndex = index % columns
      photosByColumn[columnIndex].push(photo)
    })
    
    return photosByColumn
  }, [photos, columns])

  return photosByColumn
}