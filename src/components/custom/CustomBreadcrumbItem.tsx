import { Link } from 'react-router'
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../ui/breadcrumb'
import { SlashIcon } from 'lucide-react'

interface Props {
    subPath: string
}

export const CustomBreadcrumbItem = ({ subPath }: Props) => {
    return (
        <>
            <BreadcrumbSeparator>
                <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to={`/${subPath}`}>{subPath}</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
        </>

    )
}