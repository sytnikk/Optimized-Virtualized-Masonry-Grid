import { renderHook } from '@testing-library/react'
import { usePhotoDistribution } from './usePhotoDistribution'
import { expect, describe, it } from 'vitest'
import { Photo } from '@entities/photo/api/PhotoTypes'

describe('usePhotoDistribution', () => {
  const mockPhotos = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ]

  it('should distribute photos evenly across columns', () => {
    const mockPhotosWithProps: Photo[] = mockPhotos.map(photo => ({
      ...photo,
      width: 100,
      height: 100,
      url: 'test.jpg',
      photographer: 'Test',
      photographer_url: 'test.com',
      src: {
        original: 'test.jpg',
        large: 'test.jpg',
        medium: 'test.jpg',
        small: 'test.jpg',
        large2x: 'test.jpg',
        portrait: 'test.jpg',
        landscape: 'test.jpg',
        tiny: 'test.jpg'
      },
      alt: 'Test photo',
      liked: false,
      avgColor: '#000',
      id: 1
    }))

    const { result } = renderHook(() => 
      usePhotoDistribution(mockPhotosWithProps, 2)
    )
    
    expect(result.current).toHaveLength(2)
    expect(result.current[0]).toEqual([mockPhotosWithProps[0], mockPhotosWithProps[2]])
    expect(result.current[1]).toEqual([mockPhotosWithProps[1], mockPhotosWithProps[3]])
  })

  it('should handle empty photos array', () => {
    const { result } = renderHook(() => 
      usePhotoDistribution([], 3)
    )
    
    expect(result.current).toHaveLength(3)
    expect(result.current.every(col => col.length === 0)).toBe(true)
  })
})