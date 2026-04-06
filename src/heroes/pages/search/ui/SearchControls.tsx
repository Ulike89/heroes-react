import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useRef, type KeyboardEvent } from "react"
import { useSearchParams } from "react-router"

export const SearchControls = () => {
    const searchInputRef = useRef<HTMLInputElement>(null)
    const teamInputRef = useRef<HTMLInputElement>(null)
    const categoryInputRef = useRef<HTMLInputElement>(null)
    const universeInputRef = useRef<HTMLInputElement>(null)
    const statusInputRef = useRef<HTMLInputElement>(null)

    const [searchParams, setSearchParams] = useSearchParams()

    const activeAccordion = searchParams.get('active-accordion') || ''
    const selectedStrength = Number(searchParams.get('strength') || '0')

    const setQueryParams = (name: string, value: string) => {
        if (value) {
            setSearchParams(prev => {
                prev.set(name, value)
                return prev
            })
            return
        }

        setSearchParams(prev => {
            prev.delete(name)
            return prev
        })
    }

    const handleKeyDownBySearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value: string = searchInputRef.current?.value ?? ''

            setQueryParams('name', value)
        }
    }

    const handleKeyDownByTeam = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value: string = teamInputRef.current?.value ?? ''

            setQueryParams('team', value)
        }
    }

    const handleKeyDownByCategory = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value: string = categoryInputRef.current?.value ?? ''

            setQueryParams('category', value)
        }
    }

    const handleKeyDownByUniverse = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value: string = universeInputRef.current?.value ?? ''

            setQueryParams('universe', value)
        }
    }

    const handleKeyDownByStatus = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value: string = statusInputRef.current?.value ?? ''

            setQueryParams('status', value)
        }
    }

    const handleClearFilters = () => {
        setSearchParams({})
        if (searchInputRef?.current) {
            searchInputRef.current.value = '';
        }
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        name="search"
                        ref={searchInputRef}
                        placeholder="Search name..."
                        className="pl-12 h-12 text-lg bg-white"
                        onKeyDown={handleKeyDownBySearch}
                        defaultValue={searchParams.get('name') ?? ''}
                    >
                    </Input>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button
                        variant={activeAccordion === 'advanced-filters' ? 'default' : 'outline'}
                        className="h-12"
                        onClick={
                            () => {
                                if (activeAccordion === 'advanced-filters') {
                                    setSearchParams(prev => {
                                        prev.delete('active-accordion', 'advanced-filters')
                                        return prev
                                    })
                                    return
                                }
                                setQueryParams('active-accordion', 'advanced-filters')
                            }
                        }
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button variant="outline" className="h-12">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort by Name
                    </Button>

                    <Button variant="outline" className="h-12">
                        <Grid className="h-4 w-4" />
                    </Button>

                    <Button className="h-12">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Character
                    </Button>
                </div>
            </div>

            {/* Advanced Filters */}
            <Accordion type="single" collapsible value={activeAccordion} data-testid="accordion">
                <AccordionItem value="advanced-filters">
                    <AccordionContent>
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button
                                    variant="destructive"
                                    onClick={handleClearFilters}
                                >Clear All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="team" className="text-sm font-medium">Team</label>
                                    <Input
                                        id="team"
                                        name="team"
                                        ref={teamInputRef}
                                        placeholder="Search team..."
                                        className="h-10 text-lg bg-white"
                                        onKeyDown={handleKeyDownByTeam}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                                    <Input
                                        id="category"
                                        name="category"
                                        ref={categoryInputRef}
                                        placeholder="Search category..."
                                        className="h-10 text-lg bg-white"
                                        onKeyDown={handleKeyDownByCategory}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="universe" className="text-sm font-medium">Universe</label>
                                    <Input
                                        id="universe"
                                        name="universe"
                                        ref={universeInputRef}
                                        placeholder="Search universe..."
                                        className="h-10 text-lg bg-white"
                                        onKeyDown={handleKeyDownByUniverse}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <Input
                                        id="status"
                                        name="status"
                                        ref={statusInputRef}
                                        placeholder="Search status..."
                                        className="h-10 text-lg bg-white"
                                        onKeyDown={handleKeyDownByStatus}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="strength" className="text-sm font-medium">Minimum Strength: {selectedStrength}/10</label>
                                <Slider
                                    id="strength"
                                    name="strength"
                                    defaultValue={[selectedStrength]}
                                    max={10}
                                    step={1}
                                    onValueChange={
                                        value => {
                                            if (value[0] > 0)
                                                setQueryParams('strength', value[0].toString())
                                            else
                                                setSearchParams(prev => {
                                                    prev.delete('strength')
                                                    return prev
                                                })
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}