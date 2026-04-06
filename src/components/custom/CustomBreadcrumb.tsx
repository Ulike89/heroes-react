import { Link } from "react-router"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../ui/breadcrumb"
import { CustomBreadcrumbItem } from "./CustomBreadcrumbItem"

interface Props {
    path: string[]
}

export const CustomBreadcrumb = ({ path }: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {
                    path.map((subPath, index) => (
                        <CustomBreadcrumbItem
                            key={index}
                            subPath={subPath}
                        />
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
