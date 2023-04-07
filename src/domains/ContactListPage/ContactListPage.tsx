import useGetContactList, {
  GetContactListResponse,
} from '@gql/hooks/useGetClientContactList'
import {
  HeaderContainer,
  ListContainer,
  SubTitle,
  Title,
} from './_ContactListPage'
import { useEffect, useMemo, useState } from 'react'
import { ContactItems } from './components/components'
import Link from 'next/link'
import { Button, InputSearch, PageContainer } from '@components'
import { css } from '@emotion/react'
import useDebounce from '@utils/hooks/useDebounce'
import { IconChevronRight } from '@components/icons'

export type ContactWithMappedStatus = GetContactListResponse & {
  is_favorite: boolean
}

export const favKey = 'favoriteContactIds'
const defaultLimit = 10
const searchOptions = [
  { name: 'First Name', key: 'first_name' },
  { name: 'Last Name', key: 'last_name' },
  { name: 'Phone', key: 'phones' },
]

const ContactListPage = () => {
  const [contacts, setContacts] = useState<ContactWithMappedStatus[]>([])
  const [limit, setLimit] = useState(defaultLimit)
  const [offset, setOffset] = useState(0)
  const [searchKey, setSearchKey] = useState(searchOptions[0].key)
  const [searchValue, setSearchValue] = useState('')
  const [isLoadingRegular, setIsLoadingRegular] = useState(true)
  const [isLoadingFav, setIsLoadingFav] = useState(true)

  const debouncedValue = useDebounce(searchValue, 500)
  const formattedSearchPayload =
    searchKey === 'phones'
      ? {
          phones: {
            number: { _ilike: `%${debouncedValue}%` },
          },
        }
      : {
          [searchKey]: {
            _ilike: `%${debouncedValue}%`,
          },
        }

  const { contactList, refetchContactList, loading } = useGetContactList({
    order_by: [
      {
        first_name: 'asc',
      },
    ],
    limit,
    offset,
    where: debouncedValue ? formattedSearchPayload : {},
  })
  const contactsData = useMemo(
    () => contactList?.contact || [],
    [contactList?.contact]
  )

  useEffect(() => {
    const cachedFavContactId = localStorage.getItem(favKey)
    let favContacts: ContactWithMappedStatus[] = []
    if (cachedFavContactId) {
      const parsed = JSON.parse(cachedFavContactId)
      favContacts = parsed
    }

    const favIds = favContacts.map((item) => item.id)
    const mergedContacts = [...favContacts, ...contactsData]

    let uniqueContacs: ContactWithMappedStatus[] = []
    mergedContacts.filter(function (item) {
      const i = uniqueContacs.findIndex((x) => x.id == item.id)
      if (i <= -1) {
        uniqueContacs.push({ ...item, is_favorite: favIds.includes(item.id) })
      }
      return null
    })

    setContacts(uniqueContacs)
    setLimit(defaultLimit + favIds.length)
    setIsLoadingFav(false)
    setIsLoadingRegular(false)
  }, [contactsData])

  const regularContacts = contacts.filter((el) => !el.is_favorite)
  const favoriteContacts = contacts.filter((el) => el.is_favorite)
  const handleToggleFavBtn = (contact: ContactWithMappedStatus) => {
    const updatedContacts = contacts.map((item) => {
      if (item.id === contact.id)
        return {
          ...item,
          is_favorite: !item.is_favorite,
        }
      return item
    })
    setContacts(updatedContacts)
    const favContacts = updatedContacts.filter((el) => el.is_favorite)

    localStorage.setItem(favKey, JSON.stringify(favContacts))
  }

  const onChangeSearchBy = (key: string) => {
    setSearchKey(key)
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>My Contact List</Title>
        <div>
          <Link href={'/add-contact'}>
            <Button>add contact</Button>
          </Link>
        </div>
      </HeaderContainer>
      <InputSearch
        searchOptions={searchOptions}
        onChangeSearchBy={onChangeSearchBy}
        searchKey={searchKey}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <SubTitle
        css={css`
          margin-top: 1rem;
        `}
      >
        Favorite
      </SubTitle>
      <ListContainer>
        <ContactItems
          id="favorite"
          isLoading={isLoadingFav}
          refetch={refetchContactList}
          contactsData={favoriteContacts}
          handleToggleFavBtn={handleToggleFavBtn}
          setIsLoadingFav={setIsLoadingFav}
          setIsLoadingRegular={setIsLoadingRegular}
        />
      </ListContainer>
      <SubTitle
        css={css`
          margin-top: 1rem;
        `}
      >
        Regular
      </SubTitle>
      <ListContainer>
        <ContactItems
          id="regular"
          isLoading={isLoadingRegular || loading}
          refetch={refetchContactList}
          contactsData={regularContacts}
          handleToggleFavBtn={handleToggleFavBtn}
          setIsLoadingFav={setIsLoadingFav}
          setIsLoadingRegular={setIsLoadingRegular}
        />
      </ListContainer>
      <div
        css={css`
          margin-top: 1rem;
          gap: 2rem;
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        `}
      >
        <Button
          disabled={offset <= 0}
          onClick={() => {
            setOffset(offset - limit < 0 ? 0 : offset - limit)
          }}
          css={css`
            transform: rotate(180deg);
            svg {
              display: block;
              margin: auto;
            }
          `}
        >
          <IconChevronRight />
        </Button>
        <Button
          disabled={!contactsData.length && !loading}
          onClick={() => {
            setOffset(limit + offset)
          }}
          css={css`
            svg {
              display: block;
              margin: auto;
            }
          `}
        >
          <IconChevronRight />
        </Button>
      </div>
    </PageContainer>
  )
}

export default ContactListPage
