import { ContactWithMappedStatus } from '@domains/ContactListPage/ContactListPage'
import { Container } from './_ContactItems'
import ContactItemAction from '../ContactItemAction/ContactItemAction'
import { Shimmer } from '@components'
import { IconEmptyData } from '@components/icons'
import { css } from '@emotion/react'

const ContactItems = ({
  id,
  isLoading,
  refetch,
  contactsData,
  handleToggleFavBtn,
}: {
  id: string
  isLoading: boolean
  refetch: () => void
  contactsData: ContactWithMappedStatus[]
  handleToggleFavBtn: (contact: ContactWithMappedStatus) => void
}) => {
  return (
    <Container>
      {isLoading && (
        <>
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </>
      )}
      {contactsData.length === 0 && !isLoading && (
        <>
          <IconEmptyData />
          <div
            css={css`
              margin-top: 0.75rem;
              color: gray;
              text-align: center;
            `}
          >
            Contact is empty
          </div>
        </>
      )}
      {contactsData.map((contact, index) => {
        return (
          <li
            key={`${id}-contact-${contact.first_name}-${contact.last_name}-${index}`}
          >
            <div
              style={{
                lineHeight: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <strong>{`${contact.first_name} ${contact.last_name}`}</strong>
              <ContactItemAction
                contact={contact}
                handleToggleFavBtn={handleToggleFavBtn}
                refetch={refetch}
              />
            </div>
            <div>
              {contact.phones.map((phone) => (
                <div
                  style={{ fontFamily: 'Barlow' }}
                  key={`${id}-phone-${phone.number}`}
                >
                  {phone.number}
                </div>
              ))}
            </div>
          </li>
        )
      })}
    </Container>
  )
}

export default ContactItems
