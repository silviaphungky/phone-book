import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const shimmerAnimation = keyframes`{
  0%: { background-position: -1000px; }
  100%: { background-position: 1000px; }
}`

export const ShimmerContainer = styled.div`
  margin-bottom: 8px;
  display: block;
  height: 0.875rem;
  width: 100%;
  background-color: rgb(229, 231, 233);
  background-image: linear-gradient(
    120deg,
    #e5e7e9 0%,
    #e5e7e9 20%,
    #dbdee2 40%,
    #e5e7e9 100%
  );
  background-size: 100%;
  border-radius: 4px;
  background-repeat: no-repeat;
  animation: 1.3s linear 1ms infinite normal backwards running
    ${shimmerAnimation};
`
