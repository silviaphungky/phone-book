import styled from '@emotion/styled'

export const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
`

export const NameContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  div {
    flex: 1;
  }
  @media (max-width: 400px) {
    display: block;
  }
`

export const AddPhoneContainer = styled.div`
  text-align: right;
  cursor: pointer;
  margin-bottom: 3rem;
  margin-top: 1.5rem;
`

export const IconContainer = styled.div`
  cursor: pointer;
  display: block;
  text-align: right;
  margin-top: -0.5rem;
`
