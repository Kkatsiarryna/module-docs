import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@app/routing/protected-route.tsx'
import { DocumentsPage } from '@pages/documents'
import { LoginPage } from '@pages/login'
import { useAppSelector } from '@app/store'
import { selectIsLoggedIn } from '@features/auth/model'
import { routes } from '@shared/config'
import { ConfirmPasswordPage } from '@pages/confirm-password'
import { ProfilePage } from '@pages/profile'
import { AdminPage } from '@pages/admin'
import { TokenUserRoles } from '@shared/model/user'

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
      <Route path={routes.confirmPassword} element={<ConfirmPasswordPage />} />

      <Route
        path={routes.documents}
        element={
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={routes.profile}
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path={routes.admin}
        element={
          <ProtectedRoute roles={[TokenUserRoles.admin]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  )
}
