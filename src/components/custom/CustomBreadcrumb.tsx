import { Link } from "react-router"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../ui/breadcrumb"
import { CustomBreadcrumbItem } from "./CustomBreadcrumbItem"
import type { route } from "../interfaces/route.interfaces"

interface Props {
    route: route[]
}

export const CustomBreadcrumb = ({ route }: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/heroes">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {
                    route.length > 0 &&
                    route.map((subRoute, index) => (
                        <CustomBreadcrumbItem
                            key={index}
                            subPath={subRoute.path}
                            name={subRoute.name}
                        />
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
