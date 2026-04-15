import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils"

export const CustomMenu = () => {
    const { pathname } = useLocation()

    const isActive = (path: string): boolean => pathname === path

    return (
        <NavigationMenu className="py-5">
            <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={cn(
                            isActive('/heroes') && 'bg-slate-400',
                            'p-2 rounded-md')}
                    >
                        <Link to='/heroes'>Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={cn(
                            isActive('/heroes/search') && 'bg-slate-400',
                            'p-2 rounded-md')}>
                        <Link to='/heroes/search'>Search</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    )
}