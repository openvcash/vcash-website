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
import News from '../src/components/News'

/** Required stores. */
import { initNews } from '../src/stores/news'

class NewsPage extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = typeof window === 'undefined'
    const host = isServer === true ? wwwHost.server : wwwHost.client

    /** Get language cookie from req headers on server or directly on client. */
    const language =
      isServer === true
        ? 'headers' in req === true &&
          parseCookie(req.headers.cookie || 'language=en-US').language
        : getCookie('language') || 'en-US'

    /** Fetch the translation files for the language found in the cookie. */
    const translation = await fetchTranslation(language, ['common'], host)

    /** Fetch the news posts. */
    let posts = await fetch(''.concat(host, '/api/news'))
    posts = await posts.json()

    /** Return initial properties. */
    return { isServer, language, translation, posts }
  }

  constructor(props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
    this.news = initNews(props.isServer, props.posts)
  }

  render() {
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
