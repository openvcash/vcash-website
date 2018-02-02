import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { i18n, fetchTranslation } from '../src/utilities/i18next'
import { readCookie } from '../src/utilities/common'
import fetch from 'isomorphic-unfetch'
import www from '../.www'

/** Required comonents. */
import Layout from '../src/components/Layout'
import Docs from '../src/components/Docs'

/** Required stores. */
import { initDocs } from '../src/stores/docs'

class DocsPage extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = typeof window === 'undefined'
    const host = isServer === true ? www.server : www.client
    const language = readCookie(isServer, req)

    /** Fetch the translation files for the language found in the cookie. */
    const translation = await fetchTranslation(language, ['common'], host)

    /** Fetch the docs. */
    let docs = await fetch(''.concat(host, '/api/docs'))
    docs = await docs.json()

    /** Return initial properties. */
    return { isServer, language, translation, docs }
  }

  constructor(props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
    this.docs = initDocs(props.isServer, props.docs)
  }

  render() {
    return (
      <Provider docs={this.docs}>
        <I18nextProvider i18n={this.i18n}>
          <Layout>
            <Docs id={this.props.url.query.id} />
          </Layout>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default DocsPage
