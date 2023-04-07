import { useApolloClient } from '@apollo/client'
import { GetContactListResponse } from '@gql/hooks/useGetClientContactList'
import getContactListQuery from '@gql/query/GetContactList.gql'

const useCheckIsUnique = () => {
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

  return { checkIsUnique }
}

export default useCheckIsUnique
