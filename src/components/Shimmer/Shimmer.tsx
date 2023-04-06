import { memo } from 'react'
import { ShimmerContainer } from './_Shimmer'

function Shimmer() {
  return <ShimmerContainer data-testid="shimmer" />
}

export default memo(Shimmer)
