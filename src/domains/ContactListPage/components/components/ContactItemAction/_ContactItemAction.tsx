import styled from '@emotion/styled'

export const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
`
export const IconContainer = styled.div`
  cursor: pointer;
`

export const MoreActionContainer = styled.div`
  border-radius: 0.5rem;
  background: white;
  width: 7rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: absolute;
  right: 0;
  z-index: 1;
  top: 1.5rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
`
export const ActionItem = styled.div`
  padding: 0.25rem;
  padding-left: 1rem;
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
  }
`
