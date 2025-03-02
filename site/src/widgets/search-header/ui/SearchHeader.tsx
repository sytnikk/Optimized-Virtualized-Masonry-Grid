import { Logo, SearchBar, SearchHeaderWrapper } from './SearchHeader.styles'
import { SearchInput } from './SearchInput'
import { LogoIcon } from './icons/LogoIcon'

export function SearchHeader({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <SearchHeaderWrapper>
      <Logo>
        <LogoIcon  />
      </Logo>
      <SearchBar>
        <SearchInput onSearch={onSearch} />
      </SearchBar>
    </SearchHeaderWrapper>
  )
}
