import ContactListPage from '@domains/ContactListPage'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Contacts</title>
        <meta name="description" content="list of contact" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContactListPage />
    </>
  )
}
