import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { i18n, fetchTranslation } from '../src/utilities/i18next.js'
import { readCookie } from '../src/utilities/common.js'
import fetch from 'isomorphic-unfetch'
import www from '../.www.json'

/** Required comonents. */
import Layout from '../src/components/Layout.js'
import News from '../src/components/News.js'

/** Required stores. */
import { initNews } from '../src/stores/news.js'

class NewsPage extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = typeof window === 'undefined'
    const host = isServer === true ? www.server : www.client
    const language = readCookie(isServer, req)

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
