import { ReactNode } from 'react'
import { StyledButton } from './_Button'
import { SerializedStyles, css } from '@emotion/react'

interface Props {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  css?: SerializedStyles
  type?: 'submit'
  disabled?: boolean
}

const Button = ({ children, variant, onClick, ...props }: Props) => {
  return (
    <StyledButton
      data-testid="button"
      variant={variant || 'primary'}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
