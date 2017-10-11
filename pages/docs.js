import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { parse as parseCookie } from 'cookie'
import { get as getCookie } from 'js-cookie'
import { i18n, fetchTranslation } from '../src/utilities/i18next'
import { wwwHost } from '../package'
import fetch from 'isomorphic-unfetch'

/** Required comonents. */
import Layout from '../src/components/Layout'
import Docs from '../src/components/Docs'

/** Required stores. */
import { initDocs } from '../src/stores/docs'

class DocsPage extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = typeof window === 'undefined'
    const host = isServer === true ? wwwHost.server : wwwHost.client

    /** Get language cookie from req headers on server or directly on client. */
    const language =
      isServer === true
        ? 'headers' in req === true
          ? parseCookie(req.headers.cookie).language || 'en-US'
          : 'en-US'
        : getCookie('language') || 'en-US'

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
