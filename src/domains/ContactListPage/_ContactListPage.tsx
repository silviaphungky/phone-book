import styled from '@emotion/styled'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h2``

export const SubTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

export const ListContainer = styled.div`
  background: white;
  padding: 1rem;

  @media (max-width: 768px) {
    max-height: 50vh;
    overflow: auto;
  }
`
