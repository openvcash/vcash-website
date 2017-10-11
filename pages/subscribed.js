import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { parse as parseCookie } from 'cookie'
import { get as getCookie } from 'js-cookie'
import { i18n, fetchTranslation } from '../src/utilities/i18next'
import { wwwHost } from '../package'

/** Required components. */
import Layout from '../src/components/Layout'
import Subscribed from '../src/components/Subscribed'

class SubscribedPage extends React.Component {
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

    /** Return initial properties. */
    return { language, translation }
  }

  constructor(props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
  }

  render() {
    return (
      <Provider>
        <I18nextProvider i18n={this.i18n}>
          <Layout>
            <Subscribed />
          </Layout>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default SubscribedPage
