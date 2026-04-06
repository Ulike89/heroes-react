import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

export const useHomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const activeTab: string = searchParams.get('tab') || 'all'
    const page: string = searchParams.get('page') || '1'
    const limit: string = searchParams.get('limit') || '6'
    const category: string = searchParams.get('category') || 'all'

    const selectedTab: string = useMemo(() => {
        const validTabs: string[] = ['all', 'favorites', 'heroes', 'villains']
        return validTabs.includes(activeTab) ? activeTab : 'all'
    }, [activeTab])

    return {
        page,
        limit,
        category,
        selectedTab,
        setSearchParams
    }
}