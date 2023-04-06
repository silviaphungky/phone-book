import styled from '@emotion/styled'

export const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  outline: none;
  border-radius: 0.25rem;
  outline: none;
  border: none;
  cursor: pointer;
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `
          color: #fff;
          background-color: navy;

          &:disabled {
            opacity: 0.5;
          }
        `
      case 'secondary':
        return `
          color: #000;
          background-color: #FFC327;
        `
      default:
        return `
          color: #fff;
          background-color: navy;
          &:disabled {
            opacity: 0.5;
          }
        `
    }
  }};
`
