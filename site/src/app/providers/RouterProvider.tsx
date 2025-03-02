import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { GalleryPage } from '@pages/gallery'
import { PhotoPage } from '@pages/photo'

export function Router() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<GalleryPage />}>
          <Route path="/photo/:id" element={<PhotoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
} 