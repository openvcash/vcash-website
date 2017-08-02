import React from 'react'
import { translate } from 'react-i18next'

/** Required components. */
import Newsletter from './Newsletter'
import SelectLanguage from './SelectLanguage'

@translate(['common'])
class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
  }

  render () {
    return (
      <footer>
        <div className='flex-sb footer wrapper'>
          <div style={{ minWidth: '300px' }}>
            <SelectLanguage />
          </div>
          <div>
            <div className='flex footer-icons'>
              <a href='https://github.com/openvcash' target='_blank'>
                <img
                  src='/static/images/iconGitHub.png'
                  height='24px'
                  width='24px'
                />
              </a>
              <a href='https://twitter.com/Vcashinfo' target='_blank'>
                <img
                  src='/static/images/iconTwitter.png'
                  height='21px'
                  width='24px'
                />
              </a>
              <a href='https://slack.vcash.info' target='_blank'>
                <img
                  src='/static/images/iconSlack.png'
                  height='24px'
                  width='24px'
                />
              </a>
              <a href='https://www.reddit.com/r/Vcash/' target='_blank'>
                <img
                  src='/static/images/iconReddit.png'
                  height='24px'
                  width='24px'
                />
              </a>
              <a
                href='https://webchat.freenode.net/?channels=vcash'
                target='_blank'
              >
                <img
                  src='/static/images/iconIRC.png'
                  height='19px'
                  width='34px'
                />
              </a>
            </div>
          </div>
          <div style={{ minWidth: '300px' }}>
            <Newsletter />
          </div>
        </div>
        <div
          className='flex'
          style={{ justifyContent: 'center', margin: '15px 0 10px 0' }}
        >
          <i className='material-icons md-16'>copyright</i>
          <p>
            Vcash {this.t('developers')} 2013 - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer
