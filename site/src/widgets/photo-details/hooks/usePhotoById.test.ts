import { renderHook, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { usePhotoById } from './usePhotoById'
import { getPhotoById } from '@entities/photo/api/PhotoService'

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn()
}))

vi.mock('@entities/photo/api/PhotoService', () => ({
  getPhotoById: vi.fn()
}))

import { useLocation } from 'react-router-dom'

describe('usePhotoById', () => {
  const mockPhoto = { id: '123', url: 'photo.jpg' }
  const mockUseLocation = useLocation as ReturnType<typeof vi.fn>
  const mockGetPhotoById = getPhotoById as ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockUseLocation.mockReturnValue({ state: null })
    vi.clearAllMocks()
  })

  it('should return photo from location state if available', () => {
    mockUseLocation.mockReturnValue({ state: { photo: mockPhoto } })
    
    const { result } = renderHook(() => usePhotoById('123'))
    
    expect(result.current.photo).toEqual(mockPhoto)
    expect(result.current.loading).toBe(true)
    expect(mockGetPhotoById).not.toHaveBeenCalled()
  })

  it('should fetch photo if not in location state', async () => {
    mockGetPhotoById.mockResolvedValue(mockPhoto)
    
    const { result } = renderHook(() => usePhotoById('123'))
    
    expect(result.current.loading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.photo).toEqual(mockPhoto)
    expect(mockGetPhotoById).toHaveBeenCalledWith('123')
  })

  it('should handle errors when fetching photo', async () => {
    const error = new Error('Failed to fetch')
    mockGetPhotoById.mockRejectedValue(error)
    
    const { result } = renderHook(() => usePhotoById('123'))
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.error).toBeTruthy()
    expect(result.current.photo).toBeNull()
  })

  it('should not fetch when id is undefined', () => {
    const { result } = renderHook(() => usePhotoById(undefined))
    
    expect(result.current.loading).toBe(true)
    expect(mockGetPhotoById).not.toHaveBeenCalled()
  })
})