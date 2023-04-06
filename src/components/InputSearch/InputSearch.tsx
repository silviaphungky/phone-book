import Input from '@components/Input'
import {
  Container,
  DropdownContainer,
  SearchKeyContainer,
} from './_InputSearch'
import { ChangeEvent, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { IconChevronRight } from '@components/icons'
import useClickOutside from '@utils/hooks/useClickOutside'

interface Props {
  searchKey: string
  searchOptions: Array<{ name: string; key: string }>
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeSearchBy: (key: string) => void
  placeholder?: string
}

const InputSearch = ({
  searchKey,
  searchOptions,
  onChange,
  onChangeSearchBy,
  ...props
}: Props) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const selectedSearchValue = searchOptions.find((el) => el.key === searchKey)
  const handleTriggerDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }

  const divRef = useRef(null)

  useClickOutside(divRef, isOpenDropdown, () => setIsOpenDropdown(false))

  return (
    <Container data-testid="inputSearchContainer">
      <div
        css={css`
          flex: 0 0 25%;
        `}
      >
        <div ref={divRef}>
          <SearchKeyContainer
            onClick={handleTriggerDropdown}
            css={css`
              cursor: pointer;
            `}
          >
            <div data-testid="searchKeyContainer">
              {selectedSearchValue?.name}
            </div>
            <div
              css={css`
                svg {
                  display: block;
                  margin-left: auto;
                }
              `}
            >
              {isOpenDropdown ? (
                <div
                  css={css`
                    svg {
                      transform: rotate(270deg);
                    }
                  `}
                >
                  <IconChevronRight size={10} />
                </div>
              ) : (
                <div
                  css={css`
                    svg {
                      transform: rotate(90deg);
                    }
                  `}
                >
                  <IconChevronRight size={10} />
                </div>
              )}
            </div>
          </SearchKeyContainer>

          <DropdownContainer
            data-testid="dropdownContainer"
            css={css`
              margin-top: 0.5rem;
              display: ${isOpenDropdown ? 'block' : 'none'};
              box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
            `}
          >
            {searchOptions.map((item) => {
              return (
                <li
                  css={css`
                    cursor: pointer;
                    &:hover {
                      background: #f2f2f2;
                    }
                  `}
                  key={`option-${item.key}`}
                  onClick={() => {
                    onChangeSearchBy(item.key)
                    setIsOpenDropdown(false)
                  }}
                >
                  {item.name}
                </li>
              )
            })}
          </DropdownContainer>
        </div>
      </div>

      <Input
        css={css`
          margin-bottom: 0;
        `}
        onChange={onChange}
        placeholder={props.placeholder || 'Search here..'}
      />
    </Container>
  )
}
export default InputSearch
