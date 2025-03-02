import { useState } from 'react'
import { Photo } from '@entities/photo/api/PhotoTypes'
import { PhotoContainer, PhotoImageContainer, FullSizeImage, PhotoInfoPanel, PhotoTitle, PhotographerInfo, MetadataGrid, MetadataItem, PhotographerLink } from './PhotoDetails.styles'

export function PhotoDetails({ photo }: { photo: Photo }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <PhotoContainer>
      <PhotoImageContainer>
        <FullSizeImage 
          src={photo.src.large || photo.src.original} 
          alt={photo.alt || photo.photographer}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      </PhotoImageContainer>
      <PhotoInfoPanel>
        <PhotoTitle>{photo.alt || `Photo by ${photo.photographer}`}</PhotoTitle>
        <PhotographerInfo>
          <span>By {photo.photographer}</span>
        </PhotographerInfo>
        
        <MetadataGrid>
          <MetadataItem>
            <h4>Resolution</h4>
            <p>{photo.width} × {photo.height}</p>
          </MetadataItem>
          {photo.photographer_url && (
            <MetadataItem>
              <h4>Photographer Page</h4>
              <PhotographerLink href={photo.photographer_url} target="_blank" rel="noopener noreferrer">
                Visit Profile
              </PhotographerLink>
            </MetadataItem>
          )}
        </MetadataGrid>
      </PhotoInfoPanel>
    </PhotoContainer>
  )
}
