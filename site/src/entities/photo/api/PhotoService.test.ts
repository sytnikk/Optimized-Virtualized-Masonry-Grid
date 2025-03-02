import { vi, describe, it, expect, beforeEach } from 'vitest'
import { searchPhotos, getPhotoById, getCuratedPhotos } from './PhotoService'

vi.mock('import.meta', () => ({
  env: { VITE_PEXELS_API_KEY: 'test-key' }
}))

describe('PhotoService', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ photos: [] })
    } as Response)
  })

  it('searchPhotos calls correct endpoint with params', async () => {
    await searchPhotos({ query: 'test', page: 1 })
    expect(fetch).toHaveBeenCalledWith(
      'https://api.pexels.com/v1/search?page=1&per_page=30&query=test',
      expect.any(Object)
    )
  })

  it('getCuratedPhotos calls correct endpoint with params', async () => {
    await getCuratedPhotos({ page: 1 })
    expect(fetch).toHaveBeenCalledWith(
      'https://api.pexels.com/v1/curated?page=1&per_page=30',
      expect.any(Object)
    )
  })

  it('getPhotoById calls correct endpoint with params', async () => {
    await getPhotoById('123')
    expect(fetch).toHaveBeenCalledWith(
      'https://api.pexels.com/v1/photos/123',
      expect.any(Object)
    )
  })

  it('handles API errors', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false } as Response)
    await expect(getPhotoById('123')).rejects.toThrow('Failed to fetch photo')
  })
})