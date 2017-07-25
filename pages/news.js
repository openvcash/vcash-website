import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { parse as parseCookie } from 'cookie'
import { get as getCookie } from 'js-cookie'
import { i18n, fetchTranslation } from '../src/utilities/i18next'
import fetch from 'isomorphic-unfetch'

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
      newsPosts: [],
      translation: {}
    }

    /**
     * Read the language cookie from the request headers if on the server,
     * or read the cookie directly if on the client.
     */
    if (initProps.isServer === true) {
      const cookie = parseCookie(req.headers.cookie)
      initProps.language = cookie.language
    } else {
      initProps.language = getCookie('language')
    }

    /** Fetch the translation files for the language found in the cookie. */
    initProps.translation = await fetchTranslation(
      initProps.language,
      ['common'],
      'http://localhost:3000/static/locales/'
    )

    /** Fetch news posts. */
    const newsPosts = await fetch('http://localhost:3000/api/news')
    initProps.newsPosts = await newsPosts.json()

    /** Return initial properties. */
    return initProps
  }

  constructor (props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
    this.news = initNews(props.isServer, props.newsPosts)
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
