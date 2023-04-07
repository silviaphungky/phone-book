import { useMutation } from '@apollo/client'
import QUERY from '@gql/mutation/EditContact.gql'

const useEditContact = () => {
  const [editContact] = useMutation(QUERY)

  return { editContact }
}

export default useEditContact
