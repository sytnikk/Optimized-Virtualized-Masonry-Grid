import { getCuratedPhotos } from '@entities/photo/api/PhotoService'
import { usePhotos } from '@shared/photo/hooks/usePhotos'

export function useFeaturedPhotos(perPage = 36) {
  const photos = usePhotos(getCuratedPhotos, perPage);

  return { 
    ...photos,
    getFeaturedPhotos: (signal?: AbortSignal) => photos.fetchPhotos({}, signal)
  };
}