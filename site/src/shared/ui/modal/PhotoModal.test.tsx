import { vi, describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PhotoModal } from './PhotoModal'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}))

describe('PhotoModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders content when open', () => {
    render(<PhotoModal>Test</PhotoModal>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('closes on escape key', async () => {
    const onClose = vi.fn()
    render(<PhotoModal onClose={onClose}>Test</PhotoModal>)
    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('navigates home when no onClose provided', async () => {
    render(<PhotoModal>Test</PhotoModal>)
    
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })
})