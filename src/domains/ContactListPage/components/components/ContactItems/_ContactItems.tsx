import styled from '@emotion/styled'

export const Container = styled.ul`
  padding: 0;
  list-style: none;
  margin-top: 0.5rem;
  margin-bottom: 0;

  li {
    padding: 0.5rem 0;
  }
`

export const Star = styled.i<{ color?: string }>`
  position: relative;

  display: inline-block;
  width: 0;
  height: 0;

  margin-left: 0.9em;
  margin-right: 0.9em;
  margin-bottom: 1.2em;

  border-right: 0.3em solid transparent;
  border-bottom: 0.7em solid ${(props) => props.color || '#fc0'};
  border-left: 0.3em solid transparent;

  /* Controlls the size of the stars. */
  font-size: 10px;

  &:before,
  &:after {
    content: '';

    display: block;
    width: 0;
    height: 0;

    position: absolute;
    top: 0.6em;
    left: -1em;

    border-right: 1em solid transparent;
    border-bottom: 0.7em solid ${(props) => props.color || '#fc0'};
    border-left: 1em solid transparent;

    transform: rotate(-35deg);
  }

  &:after {
    transform: rotate(35deg);
  }
`
