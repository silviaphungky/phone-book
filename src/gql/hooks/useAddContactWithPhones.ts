import { useMutation } from '@apollo/client'
import QUERY from '@gql/mutation/AddContactWithPhones.gql'

const useAddContactWithPhones = () => {
  const [addContactWithPhones] = useMutation(QUERY)

  return { addContactWithPhones }
}

export default useAddContactWithPhones
