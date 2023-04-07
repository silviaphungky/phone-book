import { Controller, useFormContext } from 'react-hook-form'
import {
  AddPhoneContainer,
  Container,
  IconContainer,
  NameContainer,
} from './_ContactFormNew'
import { Button, Input } from '@components'
import { css } from '@emotion/react'
import { useState } from 'react'
import { IconClose } from '@components/icons'
import { FormValue } from '@domains/ContactFormNewPage/ContactFormNewPage'

const ContactFormNew = ({
  handleSubmitForm,
}: {
  handleSubmitForm: (value: FormValue) => void
}) => {
  const [phoneFieldCount, setPhoneFieldCount] = useState(1)
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useFormContext<FormValue>()

  const addNewPhoneField = () => {
    const phonesValue = getValues('phones')

    if (!phonesValue[phoneFieldCount - 1]?.number) {
      trigger('phones')
    } else {
      setValue('phones', [...phonesValue, {} as { number: string }])
      setPhoneFieldCount(phoneFieldCount + 1)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                  placeholder="first name"
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
                  placeholder="last name"
                  {...field}
                  error={error?.message}
                />
              </div>
            )}
          />
        </NameContainer>
        <Controller
          control={control}
          name="phones"
          render={({ field, fieldState: { error } }) => (
            <>
              {Array.from(Array(phoneFieldCount).keys()).map(
                (item, index: number) => {
                  return (
                    <div key={`phone-input-${index}`}>
                      <h4
                        css={css`
                          margin-top: 0;
                          margin-bottom: 0.5rem;
                        `}
                      >{`Phone ${index + 1}`}</h4>
                      <Input
                        placeholder="phone"
                        defaultValue={field.value[index]?.number}
                        onChange={(e) => {
                          const value = [...field.value]
                          value[index] = {
                            number: e.target.value,
                          }
                          field.onChange(value)
                        }}
                        error={error?.[index]?.number?.message}
                      />
                      {index > 0 && (
                        <IconContainer
                          onClick={() => {
                            setPhoneFieldCount(phoneFieldCount - 1)
                            field.value.splice(index, 1)
                            setValue('phones', field.value)
                          }}
                        >
                          {`remove phone ${index + 1} field`}
                        </IconContainer>
                      )}
                    </div>
                  )
                }
              )}
            </>
          )}
        />
        <AddPhoneContainer onClick={addNewPhoneField}>
          + add another phone number
        </AddPhoneContainer>
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
            `}
            disabled={isSubmitting}
          >
            Create Contact
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default ContactFormNew
