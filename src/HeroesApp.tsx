import { RouterProvider } from 'react-router'
import { appRouter } from './router/app.router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from './hooks/useTheme'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteHeroProvider } from './heroes/context/FavoriteHeroContext'

const queryClient = new QueryClient()

export const HeroesApp = () => {
    // ensure theme is initialized on app mount
    useTheme()

    return (
        <QueryClientProvider client={queryClient}>
            <FavoriteHeroProvider>
                <RouterProvider router={appRouter} />
                <ReactQueryDevtools initialIsOpen={false} />
            </FavoriteHeroProvider>
        </QueryClientProvider>
    )
}