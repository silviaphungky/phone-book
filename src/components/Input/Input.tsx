import { ChangeEvent, forwardRef } from 'react'
import { StyledInput, TextError } from './_Input'
import { SerializedStyles, css } from '@emotion/react'

interface Props {
  defaultValue?: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  css?: SerializedStyles
  error?: string
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ error, ...props }, ref) => {
    return (
      <div
        css={css`
          width: -webkit-fill-available;
          ${props.css}
        `}
      >
        <StyledInput
          data-testid="input"
          error={!!error}
          ref={ref}
          {...props}
          css={css`
            width: -webkit-fill-available;
          `}
        />
        {error && <TextError>{error}</TextError>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
