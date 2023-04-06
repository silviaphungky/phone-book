import { useMutation } from '@apollo/client'
import QUERY from '@gql/mutation/DeleteContact.gql'

const useDeleteContact = () => {
  const [deleteContact] = useMutation<
    { delete_contact_by_pk: { id: number } },
    { id: number }
  >(QUERY)

  return { deleteContact }
}

export default useDeleteContact
