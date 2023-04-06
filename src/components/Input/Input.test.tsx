import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
  test('renders an input element', () => {
    render(<Input onChange={() => {}} data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toBeInTheDocument()
  })

  test('calls onChange when input value changes', () => {
    const onChangeMock = jest.fn()
    render(<Input onChange={onChangeMock} data-testid="input" />)
    const input = screen.getByTestId('input')
    fireEvent.change(input, { target: { value: 'new value' } })
    expect(onChangeMock).toHaveBeenCalled()
  })

  test('displays error message when error prop is provided', () => {
    const errorMessage = 'This is an error message'
    render(
      <Input onChange={() => {}} error={errorMessage} data-testid="input" />
    )
    const errorText = screen.getByText(errorMessage)
    expect(errorText).toBeInTheDocument()
  })

  test('sets input color to red when error prop is provided', () => {
    const errorMessage = 'This is an error message'
    render(
      <Input onChange={() => {}} error={errorMessage} data-testid="input" />
    )
    const input = screen.getByTestId('input')
    expect(input).toHaveStyle('border: 1px solid red;')
  })
})
