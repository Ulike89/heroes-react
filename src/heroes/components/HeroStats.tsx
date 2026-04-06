import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import { HeroStatsCard } from "./HeroStatsCard"
import { useHeroSummary } from "../hooks/useHeroSummary"
import { use } from "react"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"
import type { SummaryInformationResponse } from "../types/summary-information.response"

export const HeroStats = () => {
    const { data: summary } = useHeroSummary()
    const { favoritesCount } = use(FavoriteHeroContext)

    const getPercentage = (summary: SummaryInformationResponse, favoritesCount: number): string =>
        ((favoritesCount / summary.totalHeroes) * 100).toFixed(2)

    if (!summary) return <div>Loading...</div>

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <HeroStatsCard
                title="Total Characters"
                icon={<Users className="h-4 w-4 text-foreground" />}
            >
                <div className="text-2xl font-bold">{summary.totalHeroes}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summary.heroCount} Heroes
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summary.villainCount} Villains
                    </Badge>
                </div>
            </HeroStatsCard>

            <HeroStatsCard
                title="Favorites"
                icon={<Heart className="h-4 w-4 text-foreground" />}
            >
                <div className="text-2xl font-bold text-red-600" data-testid="favorite-count">
                    {favoritesCount}
                </div>
                <p className="text-xs text-foreground" data-testid="favorite-percentage">
                    {getPercentage(summary, favoritesCount)}% of total
                </p>
            </HeroStatsCard>

            <HeroStatsCard
                title="Strongest"
                icon={<Zap className="h-4 w-4 text-foreground" />}
            >
                <div className="text-lg font-bold">{summary.strongestHero.alias}</div>
                <p className="text-xs text-foreground">Strength: {summary.strongestHero.strength}/10</p>
            </HeroStatsCard>

            <HeroStatsCard
                title="Smartest"
                icon={<Trophy className="h-4 w-4 text-foreground" />}
            >
                <div className="text-lg font-bold">{summary.smartestHero.alias}</div>
                <p className="text-xs text-foreground">Intelligence: {summary.smartestHero.intelligence}/10</p>
            </HeroStatsCard>
        </div>
    )
}