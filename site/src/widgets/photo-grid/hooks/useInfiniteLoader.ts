import { useEffect, useRef } from 'react';

interface UseInfiniteLoaderProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export function useInfiniteLoader({
  loading,
  hasMore,
  onLoadMore,
  rootMargin = '300px'
}: UseInfiniteLoaderProps) {
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const loadMoreObserver = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    if (loading || !hasMore) return;
    
    if (loadMoreObserver.current) {
      loadMoreObserver.current.disconnect();
    }
    
    loadMoreObserver.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    }, { rootMargin });
    
    if (loadMoreTriggerRef.current) {
      loadMoreObserver.current.observe(loadMoreTriggerRef.current);
    }
    
    return () => {
      if (loadMoreObserver.current) {
        loadMoreObserver.current.disconnect();
      }
    };
  }, [hasMore, loading, onLoadMore, rootMargin]);
  
  return {
    loadMoreTriggerRef
  };
}