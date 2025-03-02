export interface SearchPhotosParams {
  query?: string
  page?: number
  perPage?: number
  signal?: AbortSignal
}

export interface Photo {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

export interface PhotoResponse {
  total_results: number
  page: number
  per_page: number
  photos: Photo[]
  next_page?: string
}