import {
  ActionContainer,
  ActionItem,
  IconContainer,
  MoreActionContainer,
} from './_ContactItemAction'
import {
  ContactWithMappedStatus,
  favKey,
} from '@domains/ContactListPage/ContactListPage'
import IconKebabMenu from '@components/icons/IconKebabMenu'
import { Dispatch, useRef, useState } from 'react'
import useClickOutside from '@utils/hooks/useClickOutside'
import useDeleteContact from '@gql/hooks/useDeleteContact'
import { Star } from '../ContactItems/_ContactItems'
import { css } from '@emotion/react'

interface Props {
  contact: ContactWithMappedStatus
  handleToggleFavBtn: (contact: ContactWithMappedStatus) => void
  refetch: () => void
  setIsEdit: Dispatch<boolean>
  setEditField: Dispatch<'name' | 'phone' | ''>
  setSelectedContact: Dispatch<ContactWithMappedStatus>
  setIsLoadingFav: Dispatch<boolean>
  setIsLoadingRegular: Dispatch<boolean>
}

const ContactItemAction = ({
  contact,
  handleToggleFavBtn,
  refetch,
  setIsEdit,
  setEditField,
  setSelectedContact,
  setIsLoadingFav,
  setIsLoadingRegular,
}: Props) => {
  const divRef = useRef(null)
  const [isMoreAction, setIsMoreAction] = useState(false)
  const handleToggleMoreAction = () => {
    setIsMoreAction(!isMoreAction)
  }

  useClickOutside(divRef, isMoreAction, () => setIsMoreAction(false))

  const { deleteContact } = useDeleteContact()

  const handleDeleteContact = async (contact: ContactWithMappedStatus) => {
    setIsLoadingFav(true)
    setIsLoadingRegular(true)
    await deleteContact({
      variables: {
        id: contact.id,
      },
      onCompleted: (data) => {
        alert(
          `Success delete contact ${contact.first_name} ${contact.last_name}.`
        )
        refetch()
        const id = data.delete_contact_by_pk.id

        const cachedFav = localStorage.getItem(favKey)

        if (cachedFav) {
          const parsed = JSON.parse(cachedFav)
          const filtered = parsed.filter(
            (el: ContactWithMappedStatus) => el.id !== id
          )
          localStorage.setItem(favKey, JSON.stringify(filtered))
          setIsLoadingFav(false)
          setIsLoadingRegular(false)
        }
      },
    })
  }

  return (
    <ActionContainer ref={divRef}>
      <div
        css={css`
          cursor: pointer;
        `}
        onClick={() => handleToggleFavBtn(contact)}
      >
        {contact.is_favorite ? <Star /> : <Star color="grey" />}
      </div>
      <IconContainer onClick={handleToggleMoreAction}>
        <IconKebabMenu />
      </IconContainer>
      {isMoreAction && (
        <MoreActionContainer>
          <ActionItem
            onClick={() => {
              setIsEdit(true)
              setEditField('name')
              setSelectedContact(contact)
              setIsMoreAction(false)
            }}
          >
            Edit
          </ActionItem>
          <ActionItem
            onClick={() => {
              handleDeleteContact(contact)
              setIsMoreAction(false)
            }}
          >
            Delete
          </ActionItem>
        </MoreActionContainer>
      )}
    </ActionContainer>
  )
}

export default ContactItemAction
