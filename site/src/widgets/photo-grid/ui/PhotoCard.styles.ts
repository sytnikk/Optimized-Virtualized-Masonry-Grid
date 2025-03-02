import styled, { keyframes } from 'styled-components'

export const CardContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: white;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`

export const ImageContainer = styled.div<{ $aspectRatio: number }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => `${props.$aspectRatio * 100}%`};
  overflow: hidden;
  cursor: pointer;
`

export const ImagePlaceholder = styled.div<{ $bgColor: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.$bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .placeholder-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: white;
    animation: spin 1s linear infinite;
  }
  
  .error-icon {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-color);
    font-size: 12px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

export const ImageTransition = styled.div<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: opacity 0.3s ease;
`

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`

export const PhotoInfo = styled.div`
  padding: 12px;
`

export const PhotographerName = styled.p`
  color: var(--text-color);
  font-size: 14px;
  text-decoration: none;
`

export const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

export const ImageSkeleton = styled.div<{ $aspectRatio: number }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => `${props.$aspectRatio * 100}%`};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`