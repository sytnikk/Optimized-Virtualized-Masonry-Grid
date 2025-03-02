import { useState, useCallback, useEffect, RefObject } from 'react';
import { Photo } from '@entities/photo/api/PhotoTypes';

interface UseVirtualGridProps {
  photos: Photo[][];
  columns: number;
  containerRef: RefObject<HTMLDivElement | null>;
  overscan?: number;
  gap?: number;
  defaultItemHeight?: number;
}

export function useVirtualGrid({
  photos,
  columns, 
  containerRef,
  overscan = 5,
  gap = 16,
  defaultItemHeight = 300
}: UseVirtualGridProps) {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [itemHeights, setItemHeights] = useState<Record<string, number>>({});
  const [columnOffsets, setColumnOffsets] = useState<number[]>([]);

  const predictPhotoHeight = useCallback((photo: Photo) => {
    if (!containerRef.current) return defaultItemHeight;
    
    const columnWidth = (containerRef.current.offsetWidth - (gap * (columns - 1))) / columns;
    const aspectRatio = photo.height / photo.width;
    const imageHeight = columnWidth * aspectRatio;

    return imageHeight + 60; // for card padding and title
  }, [columns, defaultItemHeight, gap, containerRef]);

  const getOffsetForIndex = useCallback((column: Photo[], index: number, colIndex: number) => {
    let offset = columnOffsets[colIndex] || 0;
    
    for (let i = 0; i < index; i++) {
      const photo = column[i];
      const id = `${photo.id}-${colIndex}-${i}`;
      const height = itemHeights[id] || predictPhotoHeight(photo);
      offset += height + gap;
    }
    
    return offset;
  }, [itemHeights, predictPhotoHeight, columnOffsets, gap]);

  const getTotalColumnHeight = useCallback((column: Photo[], colIndex: number) => {
    let totalHeight = columnOffsets[colIndex] || 0;
    
    column.forEach((photo, i) => {
      const id = `${photo.id}-${colIndex}-${i}`;
      const height = itemHeights[id] || predictPhotoHeight(photo);
      totalHeight += height + gap;
    });
    
    return totalHeight > 0 ? totalHeight - gap : 0;
  }, [itemHeights, predictPhotoHeight, columnOffsets, gap]);
  
  const getVisibleRanges = useCallback(() => {
    return photos.map((column, colIndex) => {
      let startIndex = 0;
      let endIndex = column.length - 1;
      let currentOffset = columnOffsets[colIndex] || 0;

      for (let i = 0; i < column.length; i++) {
        const photo = column[i];
        const id = `${photo.id}-${colIndex}-${i}`;
        const height = itemHeights[id] || predictPhotoHeight(photo);
        
        if (currentOffset + height >= scrollTop - (height * overscan)) {
          startIndex = Math.max(0, i - overscan);
          break;
        }
        currentOffset += height + gap;
      }

      currentOffset = columnOffsets[colIndex] || 0;

      for (let i = 0; i < startIndex; i++) {
        const photo = column[i];
        const id = `${photo.id}-${colIndex}-${i}`;
        const height = itemHeights[id] || predictPhotoHeight(photo);
        currentOffset += height + gap;
      }

      for (let i = startIndex; i < column.length; i++) {
        const photo = column[i];
        const id = `${photo.id}-${colIndex}-${i}`;
        const height = itemHeights[id] || predictPhotoHeight(photo);
        
        if (currentOffset > scrollTop + viewportHeight + (height * overscan)) {
          endIndex = Math.min(column.length - 1, i + overscan);
          break;
        }
        currentOffset += height + gap;
      }
      
      return {
        startIndex,
        endIndex,
        topOffset: columnOffsets[colIndex] || 0,
        startOffset: getOffsetForIndex(column, startIndex, colIndex),
        endOffset: getTotalColumnHeight(column, colIndex) - getOffsetForIndex(column, endIndex + 1, colIndex)
      };
    });
  }, [photos, scrollTop, viewportHeight, itemHeights, columnOffsets, overscan, gap, getOffsetForIndex, getTotalColumnHeight, predictPhotoHeight]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    setScrollTop(containerRef.current.scrollTop);
    setViewportHeight(containerRef.current.clientHeight);
  }, [containerRef]);

  const handleItemMeasured = useCallback((photo: Photo, height: number, colIndex: number, index: number) => {
    const id = `${photo.id}-${colIndex}-${index}`;
    
    setItemHeights(prev => {
      if (prev[id] !== height) {
        return { ...prev, [id]: height };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    

    setViewportHeight(container.clientHeight);
    setScrollTop(container.scrollTop);
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, handleScroll]);
  

  useEffect(() => {
    const handleResize = () => {
      setItemHeights({});
      setColumnOffsets(Array(columns).fill(0));

      handleScroll();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns, handleScroll]);

  const visibleRanges = getVisibleRanges();

  const maxColumnHeight = Math.max(
    ...photos.map((column, index) => getTotalColumnHeight(column, index))
  );
  
  return {
    visibleRanges,
    maxColumnHeight,
    handleItemMeasured,
  };
}