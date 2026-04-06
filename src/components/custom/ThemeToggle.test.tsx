import { render, screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

// mock useTheme so we can control state and observe toggle calls
vi.mock('@/hooks/useTheme', () => {
  return {
    useTheme: vi.fn(),
  }
})

const mockUseTheme = vi.mocked(require('@/hooks/useTheme').useTheme)

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.className = ''
  })

  test('renders sun icon when theme is dark and calls toggle', () => {
    const toggle = vi.fn()
    mockUseTheme.mockReturnValue({ theme: 'dark', toggle, setTheme: vi.fn() })
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
    // should render SunIcon, which has svg element inside
    expect(button.querySelector('svg')).toBeTruthy()
    fireEvent.click(button)
    expect(toggle).toHaveBeenCalled()
  })

  test('renders moon icon when theme is light', () => {
    mockUseTheme.mockReturnValue({ theme: 'light', toggle: vi.fn(), setTheme: vi.fn() })
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button.querySelector('svg')).toBeTruthy()
  })
})