import { searchPhotos as searchPhotosApi } from '@entities/photo/api/PhotoService'
import { usePhotos } from '../../../shared/photo/hooks/usePhotos'

export function useSearchPhotos(perPage = 36) {
  const photos = usePhotos(searchPhotosApi, perPage);

  const searchPhotos = async (query: string, signal?: AbortSignal) => {
    if (!query) return;
    return photos.fetchPhotos({ query }, signal);
  };
  
  const loadMore = async (query: string, signal?: AbortSignal) => {
    if (!query) return;
    return photos.loadMore({ query }, signal);
  };
  
  return { 
    ...photos,
    searchPhotos,
    loadMore
  };
}