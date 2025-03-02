import { useRef, useEffect, useState } from 'react'
import { Input, ClearButton, Search } from './SearchInput.styles'
import { CrossIcon } from './icons/CrossIcon'

export function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
  const [showClearButton, setShowClearButton] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debouncedSearch = (query: string) => {
    if (query.length > 0) {
      setShowClearButton(true)
    } else {
      setShowClearButton(false)
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      onSearch(query)
    }, 300)
  }

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.value = ''
      debouncedSearch(inputRef.current.value)
    }
  }

  return (
    <Search>
      <Input
        ref={inputRef}
        type="text"
        onChange={(e) => {
          debouncedSearch(e.target.value)
        }}
        placeholder="Search amazing photos..."
      />
      {showClearButton && (
        <ClearButton type="button" onClick={handleClear}>
          <CrossIcon />
        </ClearButton>
      )}
    </Search>
  )
}
