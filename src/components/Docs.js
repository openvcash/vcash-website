import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'

/** Ant Design */
import Menu from 'antd/lib/menu'
import Router from 'next/router'
import Remarkable from 'remarkable'
import HighlightJS from 'highlight.js'

@inject('docs')
@translate(['common'])
@observer
class Docs extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
    this.docs = props.docs

    /** Enable code highlighting in Remarkable. */
    this.md = new Remarkable({
      highlight: function(str, lang) {
        if (lang && HighlightJS.getLanguage(lang)) {
          try {
            return HighlightJS.highlight(lang, str).value
          } catch (err) {}
        }

        try {
          return HighlightJS.highlightAuto(str).value
        } catch (err) {}

        return '' // use external default escaping
      }
    })

    /** Set request's GET id if present. */
    if (typeof this.props.id !== 'undefined') {
      this.docs.setViewingDoc(this.props.id)
    }
  }

  /**
   * Build the menu.
   * @function buildMenu
   * @param {object} items - Menu items.
   */
  buildMenu(items) {
    return Object.keys(items).reduce((menu, key) => {
      menu.push(
        items[key].hasOwnProperty('key') === true ? (
          <Menu.Item key={items[key]['key']}>
            {key.replace(/-/g, ' ')}
          </Menu.Item>
        ) : (
          <Menu.SubMenu key={key} title={key}>
            {this.buildMenu(items[key])}
          </Menu.SubMenu>
        )
      )

      return menu
    }, [])
  }

  /**
   * Set viewing document and navigate to it.
   * @function onMenuClick
   * @param {object} item - Menu item.
   * @param {string} key - Item key.
   * @param {array} keyPath - Item key path.
   */
  onMenuClick({ item, key, keyPath }) {
    this.docs.setViewingDoc(key)

    /** Navigate to the document. */
    Router.push({
      pathname: '/docs',
      query: { id: key }
    })
  }

  render() {
    return (
      <div style={{ flex: '1 0 auto' }}>
        <div className="docs">
          <div className="content wrapper">
            <div className="flex" style={{ margin: '15px 0 15px 0' }}>
              <div
                className="flex shadow"
                style={{
                  background: '#b60127',
                  color: '#FFFFFF',
                  padding: '2px 10px'
                }}
              >
                <i className="material-icons md-16">dvr</i>
                <p style={{ fontSize: '18px' }}>{this.t('docs')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div
            className="flex"
            style={{
              alignItems: 'flex-start',
              margin: '10px 0 10px 0'
            }}
          >
            <div>
              <div className="shadow docs-menu">
                <Menu
                  style={{ width: 240 }}
                  defaultSelectedKeys={[this.docs.id]}
                  defaultOpenKeys={[
                    'Block',
                    'Configuration',
                    'Technologies',
                    ...this.docs.id.split('_')
                  ]}
                  mode="inline"
                  onClick={(item, key, keyPath) =>
                    this.onMenuClick(item, key, keyPath)
                  }
                  theme="dark"
                >
                  {this.buildMenu(this.docs.contents)}
                </Menu>
              </div>
            </div>
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{
                __html: this.md.render(this.docs.viewing.body)
              }}
              style={{ width: '900px' }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Docs
