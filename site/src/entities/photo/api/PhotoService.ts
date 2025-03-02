import { Photo, PhotoResponse, SearchPhotosParams } from './PhotoTypes'

const apiKey = import.meta.env.VITE_PEXELS_API_KEY
const apiUrl = 'https://api.pexels.com/v1'
const headers = {
  Authorization: apiKey,
}

export async function searchPhotos({
  query,
  page = 1,
  perPage = 30,
  signal,
}: SearchPhotosParams): Promise<PhotoResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  })

  if (query) {  
    params.set('query', query)
  }

  const response = await fetch(
    `${apiUrl}/search?${params.toString()}`,
    { headers, signal }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch photos')
  }

  return response.json()
}

export async function getCuratedPhotos({
  page = 1,
  perPage = 30,
  signal,
}: SearchPhotosParams): Promise<PhotoResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  })

  const response = await fetch(
    `${apiUrl}/curated?${params.toString()}`,
    { headers, signal }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch curated photos')
  }

  return response.json()
}

export async function getPhotoById(id: string, signal?: AbortSignal): Promise<Photo> {
  const response = await fetch(
    `${apiUrl}/photos/${id}`,
    { headers, signal }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch photo')
  }

  return response.json()
}
