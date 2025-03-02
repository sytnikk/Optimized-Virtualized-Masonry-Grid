import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@test/utils/test-utils'
import { SearchHeader } from './SearchHeader'

describe('SearchHeader', () => {
  it('renders logo and search input', () => {
    const onSearch = vi.fn()
    render(<SearchHeader onSearch={onSearch} />)

    expect(screen.getByPlaceholderText('Search amazing photos...')).toBeInTheDocument()
  })

  it('calls onSearch with the correct query', async () => {
    const onSearch = vi.fn()
    render(<SearchHeader onSearch={onSearch} />)
    
    const input = screen.getByPlaceholderText('Search amazing photos...')
    fireEvent.input(input, { target: { value: 'test' } })
    fireEvent.blur(input)
    
    await waitFor(() => { 
      expect(onSearch).toHaveBeenCalledWith('test')
    })
  })
})
