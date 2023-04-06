import { render } from '@testing-library/react'
import Shimmer from './Shimmer'

describe('Shimmer', () => {
  it('should render shimmer component', () => {
    const { getByTestId } = render(<Shimmer />)
    const shimmer = getByTestId('shimmer')

    expect(shimmer).toBeInTheDocument()
  })
})
