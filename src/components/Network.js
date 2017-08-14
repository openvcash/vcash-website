import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { Table } from 'antd'

/** Required components. */
import PeerClients from './charts/PeerClients'
import PeerOSs from './charts/PeerOSs'
import PeerTypes from './charts/PeerTypes'
import RewardCalculator from './RewardCalculator'

@translate(['common', 'network'])
@inject('network')
@observer
class Network extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
    this.network = props.network
    this.language = props.i18n.language
  }

  componentDidMount () {
    this.props.network.fetchPeers()
  }

  componentWillUnmount () {
    this.props.network.stopFetching()
  }

  render () {
    return (
      <div>
        <div className='network shadow'>
          <div className='content wrapper'>
            <div className='flex-sb network-info'>
              <div className='flex'>
                <i className='material-icons md-18'>language</i>
                <p>
                  {this.t('network:health')}{' '}
                  <span style={{ fontWeight: '500' }}>
                    {(this.network.stats.health > 95 &&
                      this.t('network:excellent')) ||
                      (this.network.stats.health > 85 &&
                        this.t('network:ok')) ||
                      (this.network.stats.health > 75 &&
                        this.t('network:poor')) ||
                      this.t('network:bad')}
                  </span>{' '}
                  {this.t('network:at')}{' '}
                  <span style={{ fontWeight: '500' }}>
                    {new Intl.NumberFormat(this.props.i18n.language, {
                      maximumFractionDigits: 2
                    }).format(this.network.stats.health)}%
                  </span>
                </p>
              </div>
              <div className='flex'>
                <i className='material-icons md-18'>cached</i>
                <p>
                  {this.t('network:avgRTT')}{' '}
                  <span style={{ fontWeight: '500' }}>
                    {new Intl.NumberFormat(this.props.i18n.language, {
                      maximumFractionDigits: 2
                    }).format(this.network.stats.avgRTT)}{' '}
                    ms
                  </span>
                </p>
              </div>
              <div className='flex' style={{ justifyContent: 'flex-end' }}>
                <i className='material-icons md-18'>extension</i>
                <p>
                  {this.t('network:longestHeight')}{' '}
                  <span style={{ fontWeight: '500' }}>
                    {new Intl.NumberFormat(this.props.i18n.language).format(
                      this.network.stats.maxBlockHeight
                    )}
                  </span>, {this.t('network:average')}{' '}
                  <span style={{ fontWeight: '500' }}>
                    {new Intl.NumberFormat(this.props.i18n.language, {
                      maximumFractionDigits: 0
                    }).format(this.network.stats.avgBlockHeight)}
                  </span>
                </p>
              </div>
            </div>
            <div className='flex peer-charts'>
              <PeerOSs />
              <PeerClients />
              <PeerTypes />
            </div>
            <div
              style={{
                borderTop: '1px dotted #cbcbcb',
                margin: '30px 0 20px 0'
              }}
            />
            <RewardCalculator />
          </div>
        </div>
        <div className='content wrapper'>
          <div className='flex' style={{ margin: '0 0 10px 0' }}>
            <i className='material-icons md-20'>router</i>
            <p style={{ fontSize: '18px' }}>
              {this.t('network:corePeers')}
            </p>
          </div>
          <Table
            bordered
            columns={[
              {
                dataIndex: 'endpoint',
                title: this.t('network:endpoint'),
                fixed: 'left',
                width: '130px',
                filters: [
                  {
                    text: this.t('network:public'),
                    value: 1
                  },
                  {
                    text: this.t('network:firewalled'),
                    value: 0
                  }
                ],
                onFilter: (value, record) => {
                  if (value === '0') {
                    return record.tcp_open === false
                  } else {
                    return record.tcp_open === true
                  }
                }
              },
              {
                dataIndex: 'version',
                title: this.t('network:version')
              },
              {
                dataIndex: 'protocol',
                title: this.t('network:protocol'),
                render: protocol =>
                  <div className={(protocol < 60055 && 'red') || 'green'}>
                    {protocol}
                  </div>
              },
              {
                dataIndex: 'useragent',
                title: this.t('network:userAgent')
              },
              {
                dataIndex: 'height',
                title: this.t('network:height'),
                render: height =>
                  new Intl.NumberFormat(this.language).format(height)
              },
              {
                dataIndex: 'uptime',
                title: this.t('network:uptime'),
                render: uptime =>
                  <div className={(uptime > 28000 && 'green') || 'orange'}>
                    {uptime} s
                  </div>
              },
              {
                dataIndex: 'last_update',
                title: this.t('network:lastUpdate'),
                render: lastUpdate =>
                  <div className={(lastUpdate < 3600 && 'green') || 'red'}>
                    {lastUpdate} s
                  </div>
              },
              {
                dataIndex: 'last_probed',
                title: this.t('network:lastProbed'),
                render: lastProbed =>
                  <div className={(lastProbed < 900 && 'green') || 'red'}>
                    {lastProbed} s
                  </div>
              },
              {
                dataIndex: 'rtt',
                title: 'RTT',
                render: rtt =>
                  <div className={(rtt < 1000 && 'green') || 'red'}>
                    {rtt} s
                  </div>
              },
              {
                dataIndex: 'udp_bps_inbound',
                title: 'UDP Bps (in)',
                render: udpIn =>
                  <div className={(udpIn < 8096 && 'green') || 'red'}>
                    {udpIn}
                  </div>
              },
              {
                dataIndex: 'udp_bps_outbound',
                title: 'UDP Bps (out)',
                render: udpOut =>
                  <div className={(udpOut < 8096 && 'green') || 'red'}>
                    {udpOut}
                  </div>
              },
              {
                dataIndex: 'tcp_open',
                fixed: 'right',
                title: this.t('network:tcpOpen'),
                width: '80px',
                render: tcpOpen =>
                  <div className={(tcpOpen === true && 'green') || 'red'}>
                    {tcpOpen === true ? this.t('yes') : this.t('no')}
                  </div>
              }
            ]}
            dataSource={this.network.peers.peek()}
            locale={{
              emptyText: 'Statistics are not available.',
              filterConfirm: this.t('ok'),
              filterReset: this.t('reset')
            }}
            pagination={{
              current: this.network.page,
              onChange: page => this.network.setPage(page),
              pageSize: this.network.perPage
            }}
            scroll={{ x: 1150 }}
            size='small'
          />
        </div>
      </div>
    )
  }
}

export default Network
