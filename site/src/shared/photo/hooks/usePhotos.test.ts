import { renderHook, waitFor } from '@testing-library/react'
import { usePhotos } from './usePhotos'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('usePhotos', () => {
  const mockFetchFn = vi.fn()
  const mockResponse = {
    photos: [{id: 1}, {id: 2}],
    next_page: true
  }

  beforeEach(() => {
    mockFetchFn.mockClear()
    mockFetchFn.mockResolvedValue(mockResponse)
  })

  it('initial state', () => {
    const { result } = renderHook(() => usePhotos(mockFetchFn))
    expect(result.current.photos).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.hasMore).toBe(false)
  })

  it('fetchPhotos success', async () => {
    const { result } = renderHook(() => usePhotos(mockFetchFn))
    await waitFor(() => result.current.fetchPhotos())
    expect(result.current.photos).toEqual(mockResponse.photos)
    expect(result.current.hasMore).toBe(true)
  })

  it('loadMore', async () => {
    const { result } = renderHook(() => usePhotos(mockFetchFn))
    await waitFor(() => result.current.fetchPhotos())
    await waitFor(() => result.current.loadMore())
    expect(result.current.photos).toHaveLength(4)
  })

  it('reset', async () => {
    const { result } = renderHook(() => usePhotos(mockFetchFn))
    await waitFor(() => result.current.reset())
    expect(result.current.photos).toEqual([])
  })
})