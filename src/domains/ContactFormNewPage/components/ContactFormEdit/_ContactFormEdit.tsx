import styled from '@emotion/styled'

export const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  @media (max-width: 768px) {
    padding: 1rem 0rem;
  }
`

export const NameContainer = styled.div`
  display: block;
`

export const IconContainer = styled.div`
  cursor: pointer;
  display: block;
  text-align: right;
  margin-top: -0.5rem;
`
