import { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppContext, AppProps } from 'next/app'
import getConfig from 'next/config'
import App from 'next/app'
import ApolloProviderClient from '@utils/graphql/client'
import { colorToken } from 'src/styles/colorToken'
// import '@styles/globals.css'
import { Global } from '@emotion/react'

type TypeLocales = 'id' | 'en'

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   require('../mocks')
// }

const { publicRuntimeConfig } = getConfig()

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const globalStyles = `
  @font-face {
    font-family: 'Inter';
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Inter', sans-serif;
    max-width: 100vw;
    overflow-x: hidden;
    margin: 0;
    min-height: 100vh;
    background: #f4f7f8;
    color: #363636
  }
  div {
    font-size: 14px;
  }
`

const Container = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <>{getLayout(<Component {...pageProps} />)}</>
}

function MyApp({ ...otherProps }: AppProps) {
  return (
    <div css={[colorToken]}>
      <Global styles={globalStyles} />
      <ApolloProviderClient showError={() => {}}>
        <Container {...otherProps} />
      </ApolloProviderClient>
    </div>
  )
}

export default MyApp
