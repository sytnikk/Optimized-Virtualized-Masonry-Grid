import styled from 'styled-components'

export const Search = styled.div`
  position: relative;
  width: 100%;
`

export const Input = styled.input`
  width: 100%;
  padding: 12px 48px 12px 20px;
  background: var(--background-color);
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: white;
    box-shadow: 0 4px 12px rgba(255, 0, 184, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;

  ${Input}:focus ~ & {
    color: var(--primary-color);
  }

  &:hover {
    color: #920792;
  }
`