import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/(auth)/login/page'
import * as authActions from '@/app/auth/actions'

vi.mock('@/app/auth/actions', () => ({
  login: vi.fn(),
}))

const mockPush = vi.fn()
const mockRefresh = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}))

describe('LoginPage form submission', () => {
  it('calls login when submit button is clicked', async () => {
    const mockLogin = vi.mocked(authActions.login)
    mockLogin.mockResolvedValue({ error: 'Invalid login credentials' })

    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('name@example.com')
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /log in/i })

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(screen.getByText('Invalid login credentials')).toBeDefined()
    })
  })

  it('navigates to dashboard on successful login', async () => {
    const mockLogin = vi.mocked(authActions.login)
    mockLogin.mockResolvedValue({ success: true })

    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('name@example.com')
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /log in/i })

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
      expect(mockRefresh).toHaveBeenCalled()
    })
  })
})
