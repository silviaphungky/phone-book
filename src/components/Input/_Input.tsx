import styled from '@emotion/styled'

export const StyledInput = styled.input<{ error: boolean }>`
  height: 2.5rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.25rem;
  outline: none;
  border: ${(props) => (props.error ? '1px red solid' : '1px solid #3c3c3c')};
`

export const TextError = styled.div`
  color: red;
  margin-bottom: 1.25rem;
  margin-top: -0.5rem;
`
