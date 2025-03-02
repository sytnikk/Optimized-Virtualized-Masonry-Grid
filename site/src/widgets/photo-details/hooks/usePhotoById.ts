import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getPhotoById } from '@entities/photo/api/PhotoService';
import { Photo } from '@entities/photo/api/PhotoTypes';

export const usePhotoById = (id: string | undefined) => {
  const location = useLocation()
  const [photo, setPhoto] = useState<Photo | null>(
    location.state?.photo || null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (photo) return

    const fetchPhoto = async () => {
      if (!id) return

      try {
        setLoading(true)
        const fetchedPhoto = await getPhotoById(id)
        setPhoto(fetchedPhoto)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load photo'))
      } finally {
        setLoading(false)
      }
    }

    fetchPhoto()
  }, [id, photo])

  return { photo, loading, error }
}
