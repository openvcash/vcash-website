import React from 'react'
import { translate } from 'react-i18next'
import { Tabs } from 'antd'

@translate(['common'])
class GetStarted extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
  }

  render () {
    return (
      <div className='flex get-started'>
        <div className='content wrapper'>
          <div className='flex' style={{ justifyContent: 'center' }}>
            <Tabs size='small' tabPosition='left'>
              <Tabs.TabPane tab='Daemon' key='1'>
                <div className='flex-sb download-tab'>
                  <div>
                    <img src='/static/images/screenshotDaemon.png' />
                    <div className='flex-sb download-bar'>
                      <div className='flex'>
                        <i className='fa fa-2x fa-github' />
                        <a
                          href='https://github.com/openvcash/vcash/releases/latest'
                          target='_blank'
                        >
                          {this.t('download')}
                        </a>
                      </div>
                      <div className='flex'>
                        <i className='material-icons md-20'>perm_identity</i>
                        <p>
                          <a
                            href='https://pgp.mit.edu/pks/lookup?op=get&search=0x85219EDEBA381B8C'
                            target='_blank'
                          >
                            {`xCore's`} PGP {this.t('key')}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex-sb os-icons'>
                    <i className='fa fa-2x fa-apple' />
                    <i className='fa fa-2x fa-windows' />
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab='wxWidgets GUI' key='2'>
                <div className='flex-sb download-tab'>
                  <div>
                    <img src='/static/images/screenshotWxWidgets.gif' />
                    <div className='flex-sb download-bar'>
                      <div className='flex'>
                        <i className='fa fa-2x fa-github' />
                        <a
                          href='https://github.com/openvcash/vcash/releases/latest'
                          target='_blank'
                        >
                          {this.t('download')}
                        </a>
                      </div>
                      <div className='flex'>
                        <i className='material-icons md-20'>perm_identity</i>
                        <p>
                          <a
                            href='https://pgp.mit.edu/pks/lookup?op=get&search=0x85219EDEBA381B8C'
                            target='_blank'
                          >
                            {`xCore's`} PGP {this.t('key')}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex-sb os-icons'>
                    <i className='fa fa-2x fa-apple' />
                    <i className='fa fa-2x fa-windows' />
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab='Electron GUI' key='3'>
                <div className='flex-sb download-tab'>
                  <div>
                    <img src='/static/images/screenshotElectron.gif' />
                    <div className='flex-sb download-bar'>
                      <div className='flex'>
                        <i className='fa fa-2x fa-github' />
                        <a
                          href='https://github.com/openvcash/vcash-electron/releases/latest'
                          target='_blank'
                        >
                          {this.t('download')}
                        </a>
                      </div>
                      <div className='flex'>
                        <i className='material-icons md-20'>perm_identity</i>
                        <p>
                          <a
                            href='https://pgp.mit.edu/pks/lookup?op=get&search=0x5810890F1F3082A9'
                            target='_blank'
                          >
                            {`whphhg's`} PGP {this.t('key')}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex-sb os-icons'>
                    <i className='fa fa-2x fa-apple' />
                    <i className='fa fa-2x fa-linux' />
                    <i className='fa fa-2x fa-windows' />
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default GetStarted
