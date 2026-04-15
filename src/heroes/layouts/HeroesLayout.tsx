import { CustomMenu } from '@/components/custom/CustomMenu'
import { ThemeToggle } from '@/components/custom/ThemeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/AuthContext'
import { Outlet } from 'react-router'

export const HeroesLayout = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-4">
                    <CustomMenu />
                    {/* theme switcher button */}
                    <ThemeToggle />
                    <Avatar>
                        <AvatarImage
                            src={user?.picture}
                            alt="User Avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
