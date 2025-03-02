import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@test/utils/test-utils'
import { SearchInput } from './SearchInput'

describe('SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce search', async () => {
    const onSearch = vi.fn()
    render(<SearchInput onSearch={onSearch} />)
    
    fireEvent.change(screen.getByPlaceholderText('Search amazing photos...'), { target: { value: 'test' } })
    
    expect(onSearch).not.toBeCalled()
    vi.advanceTimersByTime(300)
    expect(onSearch).toBeCalledWith('test')
  })

  it('should show/hide clear button', () => {
    render(<SearchInput onSearch={() => {}} />)
    const input = screen.getByPlaceholderText('Search amazing photos...')
    
    fireEvent.change(input, { target: { value: 'test' } })
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    fireEvent.change(input, { target: { value: '' } })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should clear input on button click', () => {
    const onSearch = vi.fn()
    render(<SearchInput onSearch={onSearch} />)
    const input = screen.getByPlaceholderText('Search amazing photos...')
    
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(screen.getByRole('button'))
    
    expect(input).toHaveValue('')
    vi.advanceTimersByTime(300)
    expect(onSearch).toBeCalledWith('')
  })
})