import { Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from '@app/routing/protected-route.tsx'
import { DocumentsPage } from '@pages/documents'
import { LoginPage } from '@pages/login'
import { useAppSelector } from '@app/store'
import { selectIsLoggedIn } from '@features/auth/model'
import { routes } from '@shared/config'

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          isLoggedIn ? (
            <Navigate to={routes.documents} replace />
          ) : (
            <Navigate to={routes.login} replace />
          )
        }
      />
      <Route
        path={routes.login}
        element={isLoggedIn ? <Navigate to={routes.documents} replace /> : <LoginPage />}
      />
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
}
