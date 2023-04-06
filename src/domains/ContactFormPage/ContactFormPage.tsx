import { PageContainer } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { HeaderContainer } from './_ContactFormPage'
import useAddContactWithPhones from '@gql/hooks/useAddContactWithPhones'
import { ContactForm } from './components'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { alphaNumRegex } from '@utils/regex'
import { useApolloClient } from '@apollo/client'
import getContactListQuery from '@gql/query/GetContactList.gql'
import { IconChevronRight } from '@components/icons'
import { css } from '@emotion/react'
import { GetContactListResponse } from '@gql/hooks/useGetClientContactList'

export interface FormValue {
  first_name: string
  last_name: string
  phones: Array<{ number: string }>
}

const ContactFormPage = () => {
  const router = useRouter()
  const { addContactWithPhones } = useAddContactWithPhones()

  const client = useApolloClient()

  const checkIsUnique = async ({
    first_name,
    last_name,
    phones,
  }: {
    first_name: string
    last_name: string
    phones: Array<{ number: string }>
  }) => {
    const { data } = await client.query({
      query: getContactListQuery,
      variables: {
        where: {
          _or: [
            {
              _and: [
                { first_name: { _like: first_name } },
                { last_name: { _like: last_name } },
              ],
            },
            {
              phones: {
                _or: phones.map((phone) => ({
                  number: {
                    _eq: phone.number,
                  },
                })),
              },
            },
          ],
        },
        limit: 1,
      },
      fetchPolicy: 'no-cache',
    })

    const isUnique = data.contact.length === 0

    const existsContactNames = data.contact.map(
      (item: GetContactListResponse) => ({
        first_name: item.first_name,
        last_name: item.last_name,
      })
    )

    if (!isUnique) {
      alert(
        `Contact info duplicate with: ${JSON.stringify(
          existsContactNames
        )}. Try to find the contact in My Contact List page.`
      )
    }
    return isUnique
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
        number: Yup.string().required('phone is required'),
      })
    ),
  })

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
        <ContactForm handleSubmitForm={handleCreateContact} />
      </FormProvider>
    </PageContainer>
  )
}

export default ContactFormPage
