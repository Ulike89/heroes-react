import { CustomMenu } from '@/components/custom/CustomMenu'
import { ThemeToggle } from '@/components/custom/ThemeToggle'
import { Outlet } from 'react-router'

export const HeroesLayout = () => {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-4">
                    <CustomMenu />
                    {/* theme switcher button */}
                    <ThemeToggle />
                </div>
                <Outlet />
            </div>
        </div>
    )
}
