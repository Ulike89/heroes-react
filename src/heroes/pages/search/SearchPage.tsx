import { CustomBreadcrumb } from '@/components/custom/CustomBreadcrumb'
import { CustomJumbotron } from '@/components/custom/CustomJumbotron'
import { HeroGrid } from '@/heroes/components/HeroGrid'
import { HeroStats } from '@/heroes/components/HeroStats'
import { SearchControls } from './ui/SearchControls'
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'

export const SearchPage = () => {
    const [searchParams] = useSearchParams()

    const name = searchParams.get('name') || undefined
    const team = searchParams.get('team') || undefined
    const category = searchParams.get('category') || undefined
    const universe = searchParams.get('universe') || undefined
    const status = searchParams.get('status') || undefined
    const strength = searchParams.get('strength') || undefined

    const { data: heroes = [] } = useQuery({
        queryKey: ['search-information', { name, team, category, universe, status, strength }],
        queryFn: () => searchHeroesAction({ name, team, category, universe, status, strength }),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })

    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title="Búsqueda de SuperHéroes"
                description="Descubre, explora y administra super héroes y villanos"
            />

            <CustomBreadcrumb path={['search']} />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            < div className="text-center mb-8" >
                <h1 className="text-3xl font-bold mb-4">
                    Heroes found: {heroes.length}
                </h1>
            </div >

            {<HeroGrid heroes={heroes} />}
        </>
    )
}

export default SearchPage