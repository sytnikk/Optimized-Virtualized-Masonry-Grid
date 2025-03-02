import { useState } from 'react'
import { Photo, PhotoResponse, SearchPhotosParams } from '@entities/photo/api/PhotoTypes'

export function usePhotos(
  fetchFn: (params: SearchPhotosParams) => Promise<PhotoResponse>,
  perPage = 36
) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPhotos = async (additionalParams: SearchPhotosParams = {}, signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await fetchFn({ 
        ...additionalParams,
        signal, 
        page, 
        perPage 
      });
      setPage(page + 1);
      setPhotos(response.photos);
      setHasMore(!!response.next_page);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async (additionalParams: SearchPhotosParams = {}, signal?: AbortSignal) => {
    try {
      if (!hasMore) return;

      const response = await fetchFn({ 
        ...additionalParams,
        signal, 
        page, 
        perPage 
      });
      setPage(page + 1);
      setHasMore(!!response.next_page);
      setPhotos(prevPhotos => [...prevPhotos, ...response.photos]);
    } catch (err) {
      setError(err as Error);
    }
  };

  const reset = () => {
    setPhotos([]);
    setHasMore(false);
    setPage(1);
    setError(null);
  };

  return { 
    photos, 
    loading, 
    error, 
    fetchPhotos, 
    loadMore, 
    hasMore, 
    reset, 
    perPage 
  };
}