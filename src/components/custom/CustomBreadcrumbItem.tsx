import { Link } from 'react-router'
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../ui/breadcrumb'
import { SlashIcon } from 'lucide-react'

interface Props {
    subPath: string
    name: string
}

export const CustomBreadcrumbItem = ({ subPath, name }: Props) => {
    return (
        <>
            <BreadcrumbSeparator>
                <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to={`/${subPath}`}>{name}</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
        </>

    )
}