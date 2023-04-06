import { useEffect, RefObject } from 'react'

const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  showDropdown: boolean,
  setShowDropdown: (val: boolean) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        showDropdown
      ) {
        if (showDropdown) setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, setShowDropdown, showDropdown])
}

export default useClickOutside
