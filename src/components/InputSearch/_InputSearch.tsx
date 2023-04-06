import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  gap: 0.75rem;
`

export const DropdownContainer = styled.ul`
  background: white;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  border-radius: 0.5rem;
  position: absolute;
  width: 7rem;
  li {
    padding: 0.5rem 1rem;
  }
`

export const SearchKeyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 13px;
`
