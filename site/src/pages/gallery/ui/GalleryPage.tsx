import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SearchHeader } from '@widgets/search-header'
import { PhotoGrid } from '@widgets/photo-grid/ui/PhotoGrid'
import { useGalleryPhotos } from '@pages/gallery/hooks/useGalleryPhotos'
import { GalleryPageContainer, GalleryPageContent } from './GalleryPage.styles'

export function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    photos,
    loading,
    hasMore,
    searchPhotos,
    loadMoreSearch,
    resetSearch, 
    getFeaturedPhotos,
    loadMoreFeatured,
    resetFeatured,
  } = useGalleryPhotos(searchQuery)

  useEffect(() => {
    resetSearch();
    resetFeatured();

    const controller = new AbortController()

    if (searchQuery) {
      searchPhotos(searchQuery, controller.signal)
    } else {
      getFeaturedPhotos(controller.signal)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })

    return () => controller.abort()
  }, [searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  };

  const loadMore = async () => {
    if (searchQuery) {
      await loadMoreSearch(searchQuery)
    } else {
      await loadMoreFeatured()
    }
  }

  return (
    <>
      <GalleryPageContainer>
        <SearchHeader onSearch={handleSearch} />
        <GalleryPageContent>
        <PhotoGrid
          photos={photos}
          loading={loading}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />
        </GalleryPageContent>
      </GalleryPageContainer>
      <Outlet />
    </>
  )
}
