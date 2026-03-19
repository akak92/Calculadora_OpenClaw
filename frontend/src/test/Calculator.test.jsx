import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Calculator from '../Calculator'

// Mock global fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockReset()
})

describe('Calculator — render inicial', () => {
  it('muestra el título', () => {
    render(<Calculator />)
    expect(screen.getByText('Calculadora')).toBeInTheDocument()
  })

  it('muestra los campos Operando A y Operando B', () => {
    render(<Calculator />)
    expect(screen.getByPlaceholderText('Ej: 10')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ej: 5')).toBeInTheDocument()
  })

  it('muestra el selector de operación', () => {
    render(<Calculator />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('muestra el botón Calcular', () => {
    render(<Calculator />)
    expect(screen.getByRole('button', { name: /calcular/i })).toBeInTheDocument()
  })

  it('no muestra resultado ni error al inicio', () => {
    render(<Calculator />)
    expect(screen.queryByText(/resultado/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })
})

describe('Calculator — validación de campos', () => {
  it('muestra error si se hace click sin completar los campos', async () => {
    render(<Calculator />)
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))
    expect(await screen.findByText(/completá ambos campos/i)).toBeInTheDocument()
  })

  it('no llama a fetch si los campos están vacíos', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))
    expect(mockFetch).not.toHaveBeenCalled()
  })
})

describe('Calculator — cálculo exitoso', () => {
  it('muestra el resultado cuando la API responde OK', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 15 }),
    })

    render(<Calculator />)
    fireEvent.change(screen.getByPlaceholderText('Ej: 10'), { target: { value: '10' } })
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '5' } })
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))

    await waitFor(() => {
      expect(screen.getByText(/resultado/i)).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
    })
  })

  it('muestra "Calculando..." mientras espera la respuesta', async () => {
    let resolveFetch
    mockFetch.mockReturnValueOnce(new Promise((r) => { resolveFetch = r }))

    render(<Calculator />)
    fireEvent.change(screen.getByPlaceholderText('Ej: 10'), { target: { value: '3' } })
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '2' } })
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))

    expect(screen.getByRole('button', { name: /calculando/i })).toBeDisabled()

    resolveFetch({ ok: true, json: async () => ({ result: 5 }) })
    await waitFor(() => expect(screen.getByRole('button', { name: /calcular/i })).not.toBeDisabled())
  })
})

describe('Calculator — manejo de errores', () => {
  it('muestra el error del servidor cuando la API responde con error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: 'Division by zero is not allowed' }),
    })

    render(<Calculator />)
    fireEvent.change(screen.getByPlaceholderText('Ej: 10'), { target: { value: '10' } })
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))

    expect(await screen.findByText(/division by zero/i)).toBeInTheDocument()
  })

  it('muestra error de conexión si fetch falla', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<Calculator />)
    fireEvent.change(screen.getByPlaceholderText('Ej: 10'), { target: { value: '5' } })
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '2' } })
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))

    expect(await screen.findByText(/no se pudo conectar/i)).toBeInTheDocument()
  })
})

describe('Calculator — selector de operación', () => {
  it('contiene las 4 operaciones disponibles', () => {
    render(<Calculator />)
    const select = screen.getByRole('combobox')
    const options = Array.from(select.querySelectorAll('option')).map((o) => o.value)
    expect(options).toContain('add')
    expect(options).toContain('sub')
    expect(options).toContain('mul')
    expect(options).toContain('div')
  })

  it('permite cambiar la operación seleccionada', () => {
    render(<Calculator />)
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'div' } })
    expect(select.value).toBe('div')
  })
})
