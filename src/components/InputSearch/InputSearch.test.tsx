import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputSearch from './InputSearch'

describe('InputSearch', () => {
  const options = [
    { name: 'Option A', key: 'a' },
    { name: 'Option B', key: 'b' },
    { name: 'Option C', key: 'c' },
  ]

  test('should render with initial selected search value and placeholder text', () => {
    const onChange = jest.fn()
    const onChangeSearchBy = jest.fn()
    render(
      <InputSearch
        searchKey="a"
        searchOptions={options}
        onChange={onChange}
        onChangeSearchBy={onChangeSearchBy}
        placeholder="Search placeholder"
      />
    )
    const input = screen.getByPlaceholderText('Search placeholder')
    const selectedValue = screen.getByTestId('searchKeyContainer')
    expect(input).toBeInTheDocument()
    expect(selectedValue).toHaveTextContent('Option A')
  })

  test('should toggle dropdown on click', () => {
    const onChange = jest.fn()
    const onChangeSearchBy = jest.fn()
    render(
      <InputSearch
        searchKey="a"
        searchOptions={options}
        onChange={onChange}
        onChangeSearchBy={onChangeSearchBy}
      />
    )
    const dropdown = screen.getByTestId('dropdownContainer')
    const searchKeyContainer = screen.getByTestId('searchKeyContainer')
    expect(dropdown).toHaveStyle({ display: 'none' })
    fireEvent.click(searchKeyContainer)
    expect(dropdown).toHaveStyle({ display: 'block' })
    fireEvent.click(searchKeyContainer)
    expect(dropdown).toHaveStyle({ display: 'none' })
  })

  test('should select search option on click', () => {
    const onChange = jest.fn()
    const onChangeSearchBy = jest.fn()
    render(
      <InputSearch
        searchKey="a"
        searchOptions={options}
        onChange={onChange}
        onChangeSearchBy={onChangeSearchBy}
      />
    )
    const searchOptionB = screen.getByText('Option B')
    expect(searchOptionB).toBeInTheDocument()
    fireEvent.click(searchOptionB)
    expect(onChangeSearchBy).toHaveBeenCalledWith('b')
  })
})
