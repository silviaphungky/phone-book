import { useQuery } from '@apollo/client'
import QUERY from '../query/GetContactList.gql'

type DistinctOnOrderBy =
  | 'asc'
  | 'asc_nulls_first'
  | 'asc_nulls_last'
  | 'desc'
  | 'desc_nulls_first'
  | 'desc_nulls_last'

type DistictOn =
  | 'created_at'
  | 'first_name: DistinctOnOrderBy'
  | 'id: DistinctOnOrderBy'
  | 'last_name: DistinctOnOrderBy'
  | 'last_name: DistinctOnOrderBy'

type ContactOrderBy =
  | {
      created_at: DistinctOnOrderBy
    }
  | {
      first_name: DistinctOnOrderBy
    }
  | { id: DistinctOnOrderBy }
  | { last_name: DistinctOnOrderBy }
  | { updated_at: DistinctOnOrderBy }
  | { created_at: DistinctOnOrderBy }
  | { phone_aggregate_order_by: {} }

interface GetContactListPayload {
  distinct_on?: DistictOn[]
  limit?: number
  offset?: number
  order_by?: ContactOrderBy[]
  where?: { first_name?: {}; last_name?: {}; phones?: {} }
}

export interface GetContactListResponse {
  id: number
  first_name: string
  last_name: string
  phones: [
    {
      number: string
    }
  ]
}

const useGetContactList = (payload?: GetContactListPayload) => {
  const {
    data: contactList,
    refetch,
    loading,
  } = useQuery<{ contact: GetContactListResponse[] }, GetContactListPayload>(
    QUERY,
    {
      variables: {
        ...payload,
      },
    }
  )

  return { contactList, refetchContactList: refetch, loading }
}

export default useGetContactList
