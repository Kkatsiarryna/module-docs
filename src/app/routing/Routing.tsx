import { Route, Routes } from 'react-router-dom'
import { routes } from '@app/routing/routes.ts'
import { ProtectedRoute } from '@app/routing/protected-route.tsx'
import { DocumentsPage } from '@pages/documents'
import { LoginPage } from '@pages/login'

export const Routing = () => (
  <Routes>
    <Route path={'/'} element={<DocumentsPage />} /> //временно, потом убрать
    {/* Публичные маршруты */}
    <Route path={routes.login} element={<LoginPage />} />
    {/* Защищенные маршруты */}
    <Route
      path={routes.documents}
      element={
        <ProtectedRoute>
          <DocumentsPage />
        </ProtectedRoute>
      }
    />
    {/* Редиректы */}
    <Route path="*" element={<div>404 - Page Not Found</div>} />
  </Routes>
)
