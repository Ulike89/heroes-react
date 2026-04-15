import { RouterProvider } from 'react-router'
import { appRouter } from './router/app.router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from './hooks/useTheme'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteHeroProvider } from './heroes/context/FavoriteHeroContext'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext'

const queryClient = new QueryClient()
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

export const HeroesApp = () => {
    // ensure theme is initialized on app mount
    useTheme()

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <FavoriteHeroProvider>
                        <RouterProvider router={appRouter} />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </FavoriteHeroProvider>
                </QueryClientProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    )
}