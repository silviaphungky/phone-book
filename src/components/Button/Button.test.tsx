import { render, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  test('renders with default "primary" variant', () => {
    const { getByTestId } = render(<Button>Click me</Button>)
    const button = getByTestId('button')
    expect(button).toHaveStyle(`
      color: #fff;
      background-color: navy;
    `)
  })

  test('renders with "secondary" variant', () => {
    const { getByTestId } = render(
      <Button variant="secondary">Click me</Button>
    )
    const button = getByTestId('button')
    expect(button).toHaveStyle(`
      color: #000;
      background-color: #FFC327;
    `)
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    const { getByTestId } = render(
      <Button onClick={handleClick}>Click me</Button>
    )
    const button = getByTestId('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders as disabled when disabled prop is true', () => {
    const { getByTestId } = render(<Button disabled>Click me</Button>)
    const button = getByTestId('button')
    expect(button).toBeDisabled()
  })

  test('renders with correct text text', () => {
    const { getByTestId } = render(<Button disabled>Click me</Button>)
    const button = getByTestId('button')
    expect(button).toHaveTextContent('Click me')
  })
})
