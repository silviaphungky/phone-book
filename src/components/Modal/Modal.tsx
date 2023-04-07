import { css } from '@emotion/react'
import { ReactNode, useState } from 'react'

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}) => {
  const [isVisible, setIsVisible] = useState(isOpen)

  const handleOverlayClick = () => {
    onClose()
    setIsVisible(false)
  }

  const handleModalClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  return (
    <div css={styles.overlay(isVisible)}>
      <div css={styles.modal(isVisible)} onClick={handleModalClick}>
        <button css={styles.closeButton} onClick={handleOverlayClick}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal

const styles = {
  overlay: (isVisible: boolean) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: ${isVisible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
  `,
  modal: (isVisible: boolean) => css`
    position: relative;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 101;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transform: ${isVisible ? 'scale(1)' : 'scale(0.5)'};
    transition: transform 0.3s ease-in-out;
    width: 40vw;
    @media (max-width: 768px) {
      width: 70vw;
    }
  `,
  closeButton: css`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  `,
}
