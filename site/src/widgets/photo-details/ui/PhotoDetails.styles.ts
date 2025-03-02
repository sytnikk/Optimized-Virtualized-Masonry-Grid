import styled from 'styled-components';

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
`;

export const PhotoImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  overflow: hidden;
  position: relative;
`;

export const FullSizeImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const PhotoInfoPanel = styled.div`
  padding: 20px;
  background-color: white;
  border-top: 1px solid #eee;
`;

export const PhotoTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
`;

export const PhotographerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const MetadataItem = styled.div`
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 4px;
  
  h4 {
    margin-top: 0;
    margin-bottom: 5px;
    color: #666;
    font-size: 14px;
  }
  
  p {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const PhotographerLink = styled.a`
  color: var(--primary-color);

  &:hover {
    color: var(--secondary-color);
  }
`;
