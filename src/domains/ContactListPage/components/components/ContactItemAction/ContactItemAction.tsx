import {
  ActionContainer,
  ActionItem,
  IconContainer,
  MoreActionContainer,
} from './_ContactItemAction'
import { ContactWithMappedStatus } from '@domains/ContactListPage/ContactListPage'
import IconKebabMenu from '@components/icons/IconKebabMenu'
import { useRef, useState } from 'react'
import useClickOutside from '@utils/hooks/useClickOutside'
import useDeleteContact from '@gql/hooks/useDeleteContact'
import { Star } from '../ContactItem/_ContactItems'
import { css } from '@emotion/react'

interface Props {
  contact: ContactWithMappedStatus
  handleToggleFavBtn: (contact: ContactWithMappedStatus) => void
  refetch: () => void
}

const ContactItemAction = ({ contact, handleToggleFavBtn, refetch }: Props) => {
  const divRef = useRef(null)
  const [isMoreAction, setIsMoreAction] = useState(false)
  const handleToggleMoreAction = () => {
    setIsMoreAction(!isMoreAction)
  }

  useClickOutside(divRef, isMoreAction, () => setIsMoreAction(false))

  const { deleteContact } = useDeleteContact()

  const handleDeleteContact = async (contact: ContactWithMappedStatus) => {
    await deleteContact({
      variables: {
        id: contact.id,
      },
      onCompleted: () => {
        alert(
          `Success delete contact ${contact.first_name} ${contact.last_name}.`
        )
        refetch()
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
          <ActionItem>Edit</ActionItem>
          <ActionItem onClick={() => handleDeleteContact(contact)}>
            Delete
          </ActionItem>
        </MoreActionContainer>
      )}
    </ActionContainer>
  )
}

export default ContactItemAction
