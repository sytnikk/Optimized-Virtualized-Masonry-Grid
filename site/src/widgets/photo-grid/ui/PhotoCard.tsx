import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Photo } from '@entities/photo/api/PhotoTypes'
import {
  CardContainer,
  ImageContainer,
  ImagePlaceholder,
  PhotoImage,
  PhotoInfo,
  PhotographerName,
  ImageTransition,
  ImageSkeleton,
} from './PhotoCard.styles'

interface PhotoCardProps {
  photo: Photo
  lazyLoad?: boolean
  onRender?: (height: number) => void
}

export function PhotoCard({
  photo,
  lazyLoad = true,
  onRender,
}: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const getOptimizedImageUrl = () => {
    return photo.src.medium
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  useEffect(() => {
    if (imageLoaded && cardRef.current && onRender) {
      const height = cardRef.current.offsetHeight
      onRender(height)
    }
  }, [imageLoaded, onRender])

  return (
    <CardContainer ref={cardRef}>
      <Link 
        to={`/photo/${photo.id}`} 
        state={{ photo }}
        style={{ textDecoration: 'none' }}
        onClick={(e) => {
          e.preventDefault()
          navigate(`/photo/${photo.id}`, { state: { photo } })
        }}
      >
        <ImageContainer $aspectRatio={photo.height / photo.width}>
          {!imageLoaded && !imageError && (
            <ImageSkeleton $aspectRatio={photo.height / photo.width} />
          )}

          {!imageError ? (
            <ImageTransition $isLoaded={imageLoaded}>
              <PhotoImage
                ref={imageRef}
                src={getOptimizedImageUrl()}
                alt={photo.alt || photo.photographer}
                loading={lazyLoad ? 'lazy' : 'eager'}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </ImageTransition>
          ) : (
            <ImagePlaceholder $bgColor='#f8f8f8'>
              <div className='error-icon'></div>
              <p>Failed to load image</p>
            </ImagePlaceholder>
          )}
        </ImageContainer>

        <PhotoInfo>
          <PhotographerName>by {photo.photographer}</PhotographerName>
        </PhotoInfo>
      </Link>
    </CardContainer>
  )
}
