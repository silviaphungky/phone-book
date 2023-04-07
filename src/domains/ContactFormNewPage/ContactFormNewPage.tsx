import { PageContainer } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { HeaderContainer } from './_ContactFormNewPage'
import useAddContactWithPhones from '@gql/hooks/useAddContactWithPhones'
import { ContactFormNew } from './components'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { alphaNumRegex } from '@utils/regex'

import { IconChevronRight } from '@components/icons'
import { css } from '@emotion/react'
import useCheckIsUnique from './hooks/useCheckIsUnique'

export interface FormValue {
  first_name: string
  last_name: string
  phones: Array<{ number: string }>
}

const ContactFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('first name is required')
    .test(
      'first_name',
      `first name can't contain special character`,
      (first_name) => {
        return alphaNumRegex.test(first_name)
      }
    ),
  last_name: Yup.string()
    .required('last name is required')
    .test(
      'last_name',
      `last name can't contain special character`,
      (last_name) => {
        return alphaNumRegex.test(last_name)
      }
    ),
  phones: Yup.array().of(
    Yup.object().shape({
      number: Yup.string()
        .required('phone is required')
        .matches(/^[1-9][0-9]*$/, 'Phone number format is not valid')
        .min(5, 'Minimal 5 characters')
        .max(15, 'Maximal 15 characters'),
    })
  ),
})

const ContactFormNewPage = () => {
  const router = useRouter()
  const { addContactWithPhones } = useAddContactWithPhones()
  const { checkIsUnique } = useCheckIsUnique()

  const methods = useForm<FormValue>({
    defaultValues: {
      first_name: '',
      last_name: '',
      phones: [{}],
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(ContactFormSchema),
  })

  const handleCreateContact = async ({
    first_name,
    last_name,
    phones,
  }: FormValue) => {
    const isUnique = await checkIsUnique({
      first_name,
      last_name,
      phones,
    })

    if (isUnique) {
      await addContactWithPhones({
        variables: {
          first_name,
          last_name,
          phones,
        },
        onCompleted: () => {
          router.push('/')
        },
      })
    }
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <div
          css={css`
            cursor: pointer;
            display: flex;
            align-items: center;
            svg {
              transform: rotate(180deg);
            }
          `}
          onClick={() => router.push('/')}
        >
          <IconChevronRight color={'#000'} />
        </div>
        <h2>New Contact</h2>
      </HeaderContainer>
      <FormProvider {...methods}>
        <ContactFormNew handleSubmitForm={handleCreateContact} />
      </FormProvider>
    </PageContainer>
  )
}

export default ContactFormNewPage
