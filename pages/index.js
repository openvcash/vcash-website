import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n, fetchTranslation } from '../src/utilities/i18next'
import { parse as parseCookie } from 'cookie'
import { get as getCookie } from 'js-cookie'

/** Required components. */
import Features from '../src/components/Features'
import GetStarted from '../src/components/GetStarted'
import Layout from '../src/components/Layout'

class HomePage extends React.Component {
  /** Initial component properties. */
  static async getInitialProps ({ req }) {
    const initProps = { language: 'en-US', translation: {} }

    /** Read the language cookie from the request headers, or directly. */
    if (
      typeof req === 'object' &&
      req.hasOwnProperty('headers') === true &&
      typeof req.headers.cookie === 'string'
    ) {
      const cookie = parseCookie(req.headers.cookie)
      initProps.language = cookie.language
    } else {
      initProps.language = getCookie('language')
    }

    /** Fetch the translation files for the language found in the cookie. */
    initProps.translation = await fetchTranslation(
      initProps.language,
      ['common', 'features', 'getStarted'],
      'http://localhost:3000/static/locales/'
    )

    /** Return initial properties. */
    return initProps
  }

  constructor (props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
  }

  render () {
    return (
      <I18nextProvider i18n={this.i18n}>
        <Layout>
          <GetStarted />
          <Features />
        </Layout>
      </I18nextProvider>
    )
  }
}

export default HomePage
