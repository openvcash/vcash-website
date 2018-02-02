import React from 'react'
import { translate } from 'react-i18next'
import releases from '../../.releases.json'

/** Ant Design */
import Tabs from 'antd/lib/tabs'

@translate(['common'])
class GetStarted extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
  }

  render() {
    return (
      <div className="flex get-started">
        <div className="content wrapper">
          <div className="flex">
            <Tabs size="small" tabPosition="top">
              <Tabs.TabPane tab="Coinomi" key="1">
                <div className="download-tab">
                  <img src="/static/images/screenshotCoinomi.png" />
                  <div className="flex-sb download-links">
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-android" />
                      <div className="download-link">
                        <p>Android</p>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.coinomi.wallet"
                          target="_blank"
                        >
                          Google Play
                        </a>{' '}
                        /{' '}
                        <a
                          href="https://coinomi.com/downloads/"
                          target="_blank"
                        >
                          APK
                        </a>
                      </div>
                    </div>
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-apple" />
                      <div
                        className="download-link"
                        style={{ minWidth: '113px' }}
                      >
                        <p>iOS</p>
                        <span>{this.t('comingSoon')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Electron GUI" key="2">
                <div className="download-tab">
                  <img src="/static/images/screenshotElectron.gif" />
                  <div className="flex-sb download-links">
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-linux" />
                      <div className="download-link">
                        <p>Linux</p>
                        <a href={releases.electron.zip} target="_blank">
                          .zip
                        </a>{' '}
                        /{' '}
                        <a href={releases.electron.deb} target="_blank">
                          .deb
                        </a>
                      </div>
                    </div>
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-apple" />
                      <div className="download-link">
                        <p>Mac</p>
                        <a href={releases.electron.mac} target="_blank">
                          64-bit .dmg
                        </a>
                      </div>
                    </div>
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-windows" />
                      <div className="download-link">
                        <p>Windows</p>
                        <a href={releases.electron.win32} target="_blank">
                          32-bit
                        </a>{' '}
                        /{' '}
                        <a href={releases.electron.win64} target="_blank">
                          64-bit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex-sb signatures">
                    <div className="download-bar shadow">
                      <a href={releases.electron.sha256sums} target="_blank">
                        <div className="flex">
                          <i className="material-icons md-20">receipt</i>
                          <p>SHA256SUMS.txt</p>
                        </div>
                      </a>
                    </div>
                    <div className="download-bar shadow">
                      <a
                        href="https://pgp.mit.edu/pks/lookup?op=get&search=0x5810890F1F3082A9"
                        target="_blank"
                      >
                        <div className="flex">
                          <i className="material-icons md-20">perm_identity</i>
                          <p>whphhg{this.t('pgpKey')}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="wxWidgets GUI" key="3">
                <div className="download-tab">
                  <img src="/static/images/screenshotWxWidgets.gif" />
                  <div className="flex-sb download-links">
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-linux" />
                      <div className="download-link">
                        <p>Linux</p>
                        <a href={releases.wxWidgets.linux} target="_blank">
                          {this.t('sourceCode')}
                        </a>
                      </div>
                    </div>
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-apple" />
                      <div className="download-link">
                        <p>Mac</p>
                        <a href={releases.wxWidgets.mac} target="_blank">
                          64-bit
                        </a>
                      </div>
                    </div>
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-windows" />
                      <div className="download-link">
                        <p>Windows</p>
                        <a href={releases.wxWidgets.win64} target="_blank">
                          64-bit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex-sb signatures">
                    <div className="download-bar shadow">
                      <a href={releases.daemon.sha256sums} target="_blank">
                        <div className="flex">
                          <i className="material-icons md-20">receipt</i>
                          <p>SHA256SUMS.txt</p>
                        </div>
                      </a>
                    </div>
                    <div className="download-bar shadow">
                      <a
                        href="https://pgp.mit.edu/pks/lookup?op=get&search=0x85219EDEBA381B8C"
                        target="_blank"
                      >
                        <div className="flex">
                          <i className="material-icons md-20">perm_identity</i>
                          <p>xCore{this.t('pgpKey')}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Daemon" key="4">
                <div className="download-tab">
                  <img src="/static/images/screenshotDaemon.gif" />
                  <div className="flex-sb download-links">
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-linux" />
                      <div className="download-link">
                        <p>Linux</p>
                        <a href={releases.daemon.linux} target="_blank">
                          {this.t('sourceCode')}
                        </a>
                      </div>
                    </div>
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-apple" />
                      <div className="download-link">
                        <p>Mac</p>
                        <a href={releases.daemon.mac} target="_blank">
                          64-bit
                        </a>
                      </div>
                    </div>
                    <div className="flex-sb shadow">
                      <i className="fa fa-2x fa-windows" />
                      <div className="download-link">
                        <p>Windows</p>
                        <a href={releases.daemon.win32} target="_blank">
                          32-bit
                        </a>{' '}
                        /{' '}
                        <a href={releases.daemon.win64} target="_blank">
                          64-bit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex-sb signatures">
                    <div className="download-bar shadow">
                      <a href={releases.daemon.sha256sums} target="_blank">
                        <div className="flex">
                          <i className="material-icons md-20">receipt</i>
                          <p>SHA256SUMS.txt</p>
                        </div>
                      </a>
                    </div>
                    <div className="download-bar shadow">
                      <a
                        href="https://pgp.mit.edu/pks/lookup?op=get&search=0x85219EDEBA381B8C"
                        target="_blank"
                      >
                        <div className="flex">
                          <i className="material-icons md-20">perm_identity</i>
                          <p>xCore{this.t('pgpKey')}</p>
                        </div>
                      </a>
                    </div>
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
