import styled from '@emotion/styled'

export const StyledContainer = styled.div`
  min-height: 100vh;
  padding: 0 25%;
  @media (max-width: 500px) {
    padding: 0 1rem;
  }
  @media (min-width: 500px) and (max-width: 1023px) {
    padding: 0 3rem;
  }
`
