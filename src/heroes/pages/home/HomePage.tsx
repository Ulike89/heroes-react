import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { useHomePage } from "@/heroes/hooks/useHomePage"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"
import { use } from "react"

export const HomePage = () => {
    const { page, limit, category, selectedTab, setSearchParams } = useHomePage()

    const {
        data: heroesResponse = {
            total: 0,
            pages: 0,
            heroes: []
        }
    } = usePaginatedHero(+page, +limit, category)
    const {
        data: summary = {
            totalHeroes: 0,
            strongestHero: {},
            smartestHero: {},
            heroCount: 0,
            villainCount: 0
        }
    } = useHeroSummary()

    const { favoritesCount, favorites } = use(FavoriteHeroContext)

    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title="Universo de SuperHéroes"
                description="Descubre, explora y administra super héroes y villanos"
            />

            <CustomBreadcrumb path={['']} />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Tabs */}
            <Tabs value={selectedTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" onClick={
                        () =>
                            setSearchParams(prev => {
                                prev.set('tab', 'all')
                                prev.set('category', 'all')
                                prev.set('page', '1')
                                return prev
                            })
                    }>
                        All Characters ({summary.totalHeroes})
                    </TabsTrigger>
                    <TabsTrigger value="favorites" onClick={
                        () =>
                            setSearchParams(prev => {
                                prev.set('tab', 'favorites')
                                prev.set('category', 'favorite')
                                prev.set('page', '1')
                                return prev
                            })
                    }>
                        Favorites ({favoritesCount})
                    </TabsTrigger>
                    <TabsTrigger value="heroes" onClick={
                        () =>
                            setSearchParams(prev => {
                                prev.set('tab', 'heroes')
                                prev.set('category', 'hero')
                                prev.set('page', '1')
                                return prev
                            })
                    }>
                        Heroes ({summary.heroCount})
                    </TabsTrigger>
                    <TabsTrigger value="villains" onClick={
                        () =>
                            setSearchParams(prev => {
                                prev.set('tab', 'villains')
                                prev.set('category', 'villain')
                                prev.set('page', '1')
                                return prev
                            })
                    }>
                        Villains ({summary.villainCount})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <HeroGrid heroes={heroesResponse.heroes} />
                </TabsContent>
                <TabsContent value="favorites">
                    <HeroGrid heroes={favorites} />
                </TabsContent>
                <TabsContent value="heroes">
                    <HeroGrid heroes={heroesResponse.heroes} />
                </TabsContent>
                <TabsContent value="villains">
                    <HeroGrid heroes={heroesResponse.heroes} />
                </TabsContent>
            </Tabs>

            {/* Pagination */}
            {heroesResponse.pages > 0 && <CustomPagination totalPages={heroesResponse.pages} />}
        </>
    )
}