import styled from 'styled-components'

export const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
  overflow-y: auto;
`

export const MasonryGrid = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`

export const MasonryColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  
  > div {
    width: 100%;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  .skeleton-wrapper {
    width: 100%;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  width: 100%;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #09f;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  p {
    margin-top: 16px;
    color: #666;
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  
  h3 {
    font-size: 24px;
    margin-bottom: 16px;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 24px;
  }
  
  button {
    background-color: #09f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
      background-color: #007dd1;
    }
  }
`
