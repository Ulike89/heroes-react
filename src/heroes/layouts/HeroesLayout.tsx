import { CustomMenu } from '@/components/custom/CustomMenu'
import { ThemeToggle } from '@/components/custom/ThemeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Outlet, useNavigate } from 'react-router'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const HeroesLayout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-4 gap-4">
                    <CustomMenu />
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.picture}
                                            alt="User Avatar"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem variant="destructive" onClick={handleLogout}>Log out</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}