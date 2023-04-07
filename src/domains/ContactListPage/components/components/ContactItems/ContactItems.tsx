import { ContactWithMappedStatus } from '@domains/ContactListPage/ContactListPage'
import { Container } from './_ContactItems'
import ContactItemAction from '../ContactItemAction/ContactItemAction'
import { Shimmer } from '@components'
import { IconEmptyData, IconPencil } from '@components/icons'
import { css } from '@emotion/react'
import { Dispatch, useState } from 'react'
import ContactFormEdit from '@domains/ContactFormNewPage/components/ContactFormEdit/ContactFormEdit'

const ContactItems = ({
  id,
  isLoading,
  refetch,
  contactsData,
  handleToggleFavBtn,
  setIsLoadingFav,
  setIsLoadingRegular,
}: {
  id: string
  isLoading: boolean
  refetch: () => void
  contactsData: ContactWithMappedStatus[]
  handleToggleFavBtn: (contact: ContactWithMappedStatus) => void
  setIsLoadingFav: Dispatch<boolean>
  setIsLoadingRegular: Dispatch<boolean>
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editField, setEditField] = useState<'name' | 'phone' | ''>('')
  const [selectedContact, setSelectedContact] = useState(
    {} as ContactWithMappedStatus
  )
  return (
    <Container data-testid="contactItemsContainer">
      {isEdit && (
        <ContactFormEdit
          selectedContact={selectedContact}
          field={editField}
          setIsEdit={setIsEdit}
          refetch={refetch}
        />
      )}
      {isLoading && (
        <>
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </>
      )}
      {contactsData.length === 0 && !isLoading && (
        <div data-testid="emptyContentContainer">
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
        </div>
      )}
      {!isLoading &&
        contactsData.map((contact, index) => {
          return (
            <li
              data-testid="listContainer"
              key={`${id}-contact-${contact.first_name}-${contact.last_name}-${index}`}
              css={css`
                border-bottom: 1px solid #f4f4f4;
              `}
            >
              <div
                css={css`
                  line-height: 1.5rem;
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <strong data-testid="fullName">{`${contact.first_name} ${contact.last_name}`}</strong>
                <ContactItemAction
                  contact={contact}
                  handleToggleFavBtn={handleToggleFavBtn}
                  refetch={refetch}
                  setIsEdit={setIsEdit}
                  setEditField={setEditField}
                  setSelectedContact={setSelectedContact}
                  setIsLoadingFav={setIsLoadingFav}
                  setIsLoadingRegular={setIsLoadingRegular}
                />
              </div>
              <div>
                {contact.phones.map((phone) => (
                  <div
                    data-testid="phoneNumber"
                    style={{ fontFamily: 'Barlow' }}
                    key={`${id}-phone-${phone.number}`}
                    css={css`
                      padding-bottom: 0.15rem;
                      display: flex;
                      align-items: center;
                      gap: 1.5rem;
                    `}
                  >
                    <div>{phone.number}</div>
                    <div
                      css={css`
                        cursor: pointer;
                      `}
                      onClick={() => {
                        setIsEdit(true)
                        setEditField('phone')
                        setSelectedContact({
                          ...contact,
                          phones: [
                            {
                              number: phone.number,
                            },
                          ],
                        })
                      }}
                    >
                      <IconPencil />
                    </div>
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
