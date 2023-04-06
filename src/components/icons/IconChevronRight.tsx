interface Props {
  size?: number
  color?: string
}

const IconChevronRight = ({ size, color }: Props) => {
  return (
    <svg
      data-testid="iconChevron"
      xmlns="http://www.w3.org/2000/svg"
      width={size || 14}
      height={size || 14}
      viewBox="0 0 8 14"
      fill="none"
    >
      <path
        d="M1 13L7 7L0.999999 1"
        stroke={color || '#B7B7B7'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconChevronRight
