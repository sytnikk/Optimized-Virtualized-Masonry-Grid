import { media } from '@shared/constants/breakpoints'
import styled from 'styled-components'

export const SearchHeaderWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 16px 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  z-index: 1000;
`

export const Logo = styled.div`
  position: absolute;
  left: 24px;
`

export const SearchBar = styled.div`
  width: 100%;
  margin-left: auto;

  ${media.tablet} {
    max-width: 600px;
  }

  ${media.laptop} {
    margin-left: 0;
  }
`