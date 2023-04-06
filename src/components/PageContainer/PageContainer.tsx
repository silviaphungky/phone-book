import { ReactNode } from 'react'
import { StyledContainer } from './_PageContainer'

interface Props {
  children: ReactNode
}

function PageContainer({ children, ...otherProps }: Props) {
  return <StyledContainer {...otherProps}>{children}</StyledContainer>
}

export default PageContainer
