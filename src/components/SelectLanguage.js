import React from 'react'
import { translate } from 'react-i18next'
import { Select } from 'antd'
import { set as setCookie } from 'js-cookie'

@translate(['common'])
class SelectLanguage extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
    this.language = props.i18n.language

    /** Available languages. */
    this.languages = [
      { language: 'en-US', name: 'English' },
      { language: 'sl-SI', name: 'Slovenian' }
    ]
  }

  /**
   * Set display language and save it to cookies.
   * @function setLanguage
   * @param {string} language - Display language.
   */
  setLanguage (language) {
    setCookie('language', language, { expires: 365 })
    document.location.reload()
  }

  render () {
    return (
      <div className='flex-sb'>
        <div className='flex'>
          <i className='material-icons md-16'>language</i>
          <p>
            {this.t('selectLanguage')}
          </p>
        </div>
        <Select
          defaultValue={this.language}
          notFoundContent={this.t('languageNotFound')}
          onChange={language => this.setLanguage(language)}
          optionFilterProp='children'
          showSearch
          size='small'
          style={{ width: '120px' }}
        >
          {this.languages.map(entry =>
            <Select.Option key={entry.language} value={entry.language}>
              {entry.name}
            </Select.Option>
          )}
        </Select>
      </div>
    )
  }
}

export default SelectLanguage
