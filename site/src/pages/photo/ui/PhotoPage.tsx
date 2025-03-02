import { useParams, useNavigate } from 'react-router-dom'
import { PhotoDetails } from '@widgets/photo-details'
import { usePhotoById } from '@widgets/photo-details/hooks/usePhotoById'
import { PhotoModal } from '@shared/ui/modal/PhotoModal'

export function PhotoPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { photo, error } = usePhotoById(id)

  const handleClose = () => {
    navigate('/')
  }

  return (
    <PhotoModal onClose={handleClose}>
      {error ? (
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h3>Error loading photo</h3>
          <p>{error.message}</p>
        </div>
      ) : photo ? (
        <PhotoDetails photo={photo} />
      ) : null}
    </PhotoModal>
  )
}
