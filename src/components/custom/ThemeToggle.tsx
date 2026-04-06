import { SunIcon, MoonIcon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme()

  return (
    <ToggleGroup type="single" defaultValue={theme}>
      <ToggleGroupItem value="light" aria-label="Toggle light" onClick={() => toggle('light')}>
        <SunIcon className="size-5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Toggle dark" onClick={() => toggle('dark')}>
        <MoonIcon className="size-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}