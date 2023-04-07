import { useMutation } from '@apollo/client'
import QUERY from '@gql/mutation/EditPhoneNumber.gql'

const useEditPhoneNumber = () => {
  const [editPhoneNumber] = useMutation(QUERY)

  return { editPhoneNumber }
}

export default useEditPhoneNumber
