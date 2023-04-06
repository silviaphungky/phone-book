import getConfig from 'next/config'
import { memo } from 'react'
import {
  ApolloClient,
  createHttpLink,
  from,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { setContext } from '@apollo/client/link/context'

const { publicRuntimeConfig: config } = getConfig()

/* Link Section */
const httpLink = createHttpLink({
  uri: config['graphql-url'],

  // Use explicit `window.fetch` so that outgoing requests
  // are captured and deferred until the Service Worker is ready.
  fetch: (...args) => fetch(...args),
})

const errorHandle = onError(({ graphQLErrors, networkError }) => {
  const errorCode = graphQLErrors?.[0]?.extensions?.errorCode
  const query = graphQLErrors?.[0]?.path?.[0]
  const requestId = graphQLErrors?.[0]?.extensions?.requestID
})
const refreshTokenLink = setContext(async (operation) => {
  return null
})

const retryLink = new RetryLink()

const client = new ApolloClient({
  link: from([
    errorHandle,
    ApolloLink.split(
      ({ getContext }) => !getContext().disabledRetry,
      retryLink
    ),
    refreshTokenLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
})

interface Props {
  children: React.ReactNode
  showError?: React.Dispatch<React.SetStateAction<any>>
}

const ApolloProviderClientComponent = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const ApolloProviderClient = memo(ApolloProviderClientComponent)

export default ApolloProviderClient
