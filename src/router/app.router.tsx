import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { createBrowserRouter, Navigate } from "react-router";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";
import { LoginPage } from "@/auth/pages/LoginPage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'))

export const appRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <LoginPage />
        },
        {
            path: '/heroes',
            element: <HeroesLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: 'heroe/:idSlug',
                    element: <HeroPage />
                },
                {
                    path: 'search',
                    element: <SearchPage />
                },
                {
                    path: 'heroes/*',
                    element: <Navigate to='/heroes' />
                }
            ]
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    index: true,
                    element: <AdminPage />
                }
            ]
        }
    ]
)