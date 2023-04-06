import Document, { Html, Head, Main, NextScript } from 'next/document'
import { extractCritical } from '@emotion/server'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const { css, ids } = extractCritical(initialProps.html)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            key="emotion-css"
            dangerouslySetInnerHTML={{ __html: css }}
            data-emotion-css={ids.join(' ')}
          />
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head>{/* any head elements you need */}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
