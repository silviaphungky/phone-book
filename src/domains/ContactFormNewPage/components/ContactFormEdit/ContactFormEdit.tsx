import { Controller, useForm } from 'react-hook-form'
import { Container, NameContainer } from './_ContactFormEdit'
import { Button, Input, Modal } from '@components'
import { css } from '@emotion/react'
import { Dispatch } from 'react'
import { ContactWithMappedStatus } from '@domains/ContactListPage/ContactListPage'
import useEditContact from '@gql/hooks/useEditContact'
import useEditPhoneNumber from '@gql/hooks/useEditPhoneNumber'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

interface EditValue {
  first_name?: string
  last_name?: string
  new_phone_number?: string
}

const EditFormSchema = Yup.object().shape({
  new_phone_number: Yup.string()
    .required('phone is required')
    .matches(/^[1-9][0-9]*$/, 'Phone number format is not valid')
    .min(5, 'Minimal 5 characters')
    .max(15, 'Maximal 15 characters'),
})

const ContactFormEdit = ({
  field,
  setIsEdit,
  selectedContact,
  refetch,
}: {
  field: 'name' | 'phone' | ''
  setIsEdit: Dispatch<boolean>
  selectedContact: ContactWithMappedStatus
  refetch: () => void
}) => {
  const defaultValues =
    field === 'name'
      ? {
          first_name: selectedContact.first_name,
          last_name: selectedContact.last_name,
        }
      : { new_phone_number: selectedContact.phones?.[0].number }

  const { control, handleSubmit } = useForm<EditValue>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(
      field === 'name' ? Yup.object().shape({}) : EditFormSchema
    ),
  })

  const { editContact } = useEditContact()

  const { editPhoneNumber } = useEditPhoneNumber()

  const handleSubmitForm = ({
    first_name,
    last_name,
    new_phone_number,
  }: {
    first_name?: string
    last_name?: string
    new_phone_number?: string
  }) => {
    if (field === 'name') {
      editContact({
        variables: {
          id: selectedContact.id,
          _set: {
            first_name,
            last_name,
          },
        },
        onCompleted: () => {
          alert('Success Update Contact Name')
          setIsEdit(false)
          refetch()
        },
      })
    } else {
      editPhoneNumber({
        variables: {
          pk_columns: {
            number: selectedContact.phones[0].number,
            contact_id: selectedContact.id,
          },
          new_phone_number,
        },
        onCompleted: (data) => {
          alert('Success Update Phone Number')
          setIsEdit(false)
          refetch()
          console.log(data)
        },
      })
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        setIsEdit(false)
      }}
    >
      <Container>
        <h3>Update Contact Detail</h3>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          {field === 'name' ? (
            <NameContainer>
              <Controller
                control={control}
                name="first_name"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <h4
                      css={css`
                        margin-top: 0;
                        margin-bottom: 0.5rem;
                      `}
                    >{`First Name`}</h4>
                    <Input
                      placeholder="First Name"
                      {...field}
                      error={error?.message}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="last_name"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <h4
                      css={css`
                        margin-top: 0;
                        margin-bottom: 0.5rem;
                      `}
                    >
                      {`Last Name`}
                    </h4>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      error={error?.message}
                    />
                  </div>
                )}
              />
            </NameContainer>
          ) : (
            <Controller
              control={control}
              name="new_phone_number"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <h4
                    css={css`
                      margin-top: 0;
                      margin-bottom: 0.5rem;
                    `}
                  >{`Phone`}</h4>
                  <Input
                    placeholder="New Phone Number"
                    {...field}
                    error={error?.message}
                  />
                </div>
              )}
            />
          )}

          <div
            css={css`
              margin-top: 1rem;
              width: 100%;
            `}
          >
            <Button
              type="submit"
              variant="primary"
              css={css`
                width: 100% !important;
                display: block;
                marginleft: auto;
              `}
            >
              Update Contact
            </Button>
          </div>
        </form>
      </Container>
    </Modal>
  )
}

export default ContactFormEdit
