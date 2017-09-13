import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { parse as parseCookie } from 'cookie'
import { get as getCookie } from 'js-cookie'
import { i18n, fetchTranslation } from '../src/utilities/i18next'

/** Required comonents. */
import Layout from '../src/components/Layout'
import News from '../src/components/News'

/** Required stores. */
import { initNews } from '../src/stores/news'

class NewsPage extends React.Component {
  static async getInitialProps ({ req }) {
    const initProps = {
      isServer: typeof window === 'undefined',
      language: 'en-US',
      translation: {}
    }

    /**
     * Read the language cookie from the request headers if on the server,
     * or read the cookie directly if on the client.
     */
    if (initProps.isServer === true) {
      initProps.language =
        typeof req.headers.cookie === 'undefined'
          ? 'en-US'
          : parseCookie(req.headers.cookie).language
    } else {
      initProps.language =
        typeof getCookie('language') === 'undefined'
          ? 'en-US'
          : getCookie('language')
    }

    /** Fetch the translation files for the language found in the cookie. */
    initProps.translation = await fetchTranslation(
      initProps.language,
      ['common'],
      'http://localhost:3000/static/locales/'
    )

    /** Return initial properties. */
    return initProps
  }

  constructor (props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
    this.news = initNews(props.isServer)
  }

  render () {
    return (
      <Provider news={this.news}>
        <I18nextProvider i18n={this.i18n}>
          <Layout>
            <News id={this.props.url.query.id} />
          </Layout>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default NewsPage
