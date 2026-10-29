// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Button from './Button'

describe('Button', () => {
  describe('Button', () => {
    it('es type="button" por defecto para no enviar formularios', () => {
      render(<Button>Cancelar</Button>)
      expect(screen.getByRole('button', { name: 'Cancelar' }).getAttribute('type')).toBe('button')
    })

    it('respeta type="submit" si se lo pasa explícitamente', () => {
      render(<Button type='submit'>Asignar</Button>)
      expect(screen.getByRole('button', { name: 'Asignar' }).getAttribute('type')).toBe('submit')
    })
  })
})
