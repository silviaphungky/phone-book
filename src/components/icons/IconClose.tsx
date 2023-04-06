interface Props {
  size?: number
  color?: string
}

const IconClose = ({ size, color }: Props) => {
  return (
    <svg
      data-testid="iconClose"
      xmlns="http://www.w3.org/2000/svg"
      width={size || 14}
      height={size || 14}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M13 1L1 13M1 1L13 13"
        stroke={color || '#B7B7B7'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconClose
