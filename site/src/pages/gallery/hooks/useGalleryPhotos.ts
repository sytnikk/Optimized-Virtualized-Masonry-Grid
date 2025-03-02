import { useSearchPhotos } from '@features/photo-search/hooks/useSearchPhotos';
import { useFeaturedPhotos } from '@features/featured-photos/hooks/useFeaturedPhotos';

export function useGalleryPhotos(searchQuery: string) {
  const {
    photos: searchResults,
    loading: searchLoading,
    searchPhotos,
    loadMore: loadMoreSearch,
    hasMore: hasMoreSearch,
    reset: resetSearch,
    perPage: searchPerPage,
  } = useSearchPhotos();

  const {
    photos: featuredPhotos,
    loading: featuredLoading = true,
    getFeaturedPhotos,
    loadMore: loadMoreFeatured,
    hasMore: hasMoreFeatured,
    reset: resetFeatured,
    perPage: featuredPerPage,
  } = useFeaturedPhotos();

  const photos = searchQuery ? searchResults : featuredPhotos;
  const loading = searchQuery ? searchLoading : featuredLoading;
  const hasMore = searchQuery ? hasMoreSearch : hasMoreFeatured;
  const perPage = searchQuery ? searchPerPage : featuredPerPage;

  return {
    photos,
    loading,
    hasMore,
    perPage,
    searchPhotos,
    loadMoreSearch,
    resetSearch,
    getFeaturedPhotos,
    loadMoreFeatured,
    resetFeatured,
  }
}
