import React from 'react'
import { translate } from 'react-i18next'
import { set as setCookie } from 'js-cookie'
import { languages } from '../utilities/common.js'

/** Ant Design */
import Select from 'antd/lib/select'

@translate(['common'])
class SelectLanguage extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
    this.languages = languages
  }

  /**
   * Set display language and save it to cookies.
   * @function setLanguage
   * @param {string} language - Display language.
   */
  setLanguage(language) {
    setCookie('language', language, { expires: 365 })
    document.location.reload()
  }

  render() {
    return (
      <div className="flex select-language">
        <div className="flex" style={{ margin: '0 10px 0 0' }}>
          <i className="material-icons md-16">language</i>
          <p>{this.t('selectLanguage')}</p>
        </div>
        <Select
          defaultValue={this.props.i18n.language}
          notFoundContent={this.t('languageNotFound')}
          onChange={language => this.setLanguage(language)}
          optionFilterProp="children"
          showSearch
          size="small"
          style={{ width: '120px' }}
        >
          {this.languages.map(entry => (
            <Select.Option key={entry.language} value={entry.language}>
              {entry.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    )
  }
}

export default SelectLanguage
