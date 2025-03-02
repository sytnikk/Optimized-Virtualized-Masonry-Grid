import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalOverlay, ModalContent, CloseButton } from './PhotoModal.styles'

interface PhotoModalProps {
  children: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export function PhotoModal({ children, isOpen = true, onClose }: PhotoModalProps) {
  const navigate = useNavigate()
  const [isClosing, setIsClosing] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      if (onClose) {
        onClose()
      } else {
        navigate('/')
      }
    }, 200)
  }, [navigate, onClose])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [handleClose])
  
  if (!isOpen) return null
  
  return (
    <ModalOverlay 
      ref={overlayRef}
      style={{ opacity: isClosing ? 0 : 1, transition: 'opacity 0.2s' }}
    >
      <ModalContent>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  )
} 