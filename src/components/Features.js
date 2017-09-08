import React from 'react'
import { translate } from 'react-i18next'

@translate(['common'])
class Features extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
  }

  render () {
    return (
      <div>
        <div className='shadow short-description'>
          <div className='wrapper'>
            <img src='/static/images/logoRed.png' width='48px' />
            <p
              className='raleway'
              style={{ fontSize: '16px', margin: '20px 0 0 0' }}
            >
              {this.t('descOne')} {this.t('descTwo')} {this.t('descThree')}
            </p>
            <p
              className='roboto-condensed'
              style={{ fontSize: '18px', margin: '50px 0 50px 0' }}
            >
              {this.t('engineeredFor')}
            </p>
            <div
              className='flex-sb raleway'
              style={{ alignItems: 'flex-start' }}
            >
              <div className='flex short-description-link'>
                <i className='material-icons md-20'>autorenew</i>
                <p>
                  {this.t('tradeOn')}{' '}
                  <a
                    href='https://bittrex.com/Market/Index?MarketName=BTC-XVC'
                    target='_blank'
                  >
                    Bittrex
                  </a>{' '}
                  {this.t('and')}{' '}
                  <a
                    href='https://poloniex.com/exchange#btc_xvc'
                    target='_blank'
                  >
                    Poloniex
                  </a>
                </p>
              </div>
              <div className='flex short-description-link'>
                <i className='material-icons md-20'>developer_board</i>
                <p>
                  {this.t('mineOn')}{' '}
                  <a href='https://pool.vchain.info' target='_blank'>
                    Vchain {this.t('miningPool')}
                  </a>
                </p>
              </div>
              <div className='flex short-description-link'>
                <i className='material-icons md-20'>extension</i>
                <p>
                  {this.t('explorersBy')}{' '}
                  <a href='https://explorer.vcash.info' target='_blank'>
                    xCore
                  </a>{' '}
                  {this.t('and')}{' '}
                  <a href='http://explorer.vcashproject.org' target='_blank'>
                    Wuher
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='wrapper features'>
          <div
            className='flex-sb'
            style={{ alignItems: 'stretch', flexWrap: 'wrap' }}
          >
            <div className='flex features-column shadow'>
              <div style={{ flex: 1 }}>
                <div className='features-title'>
                  <i className='material-icons md-30'>layers</i>
                  <p className='roboto-condensed'>
                    {this.t('networkLayers')}
                  </p>
                </div>
                <p className='features-body raleway'>
                  {this.t('networkLayersOne')} {this.t('networkLayersTwo')}
                </p>
              </div>
              <div className='roboto-condensed'>
                <p>{this.t('whitePapers')}</p>
                <a
                  href='https://github.com/openvcash/papers/blob/master/vanillacoin.pdf'
                  target='_blank'
                >
                  Vanillacoin
                </a>{' '}
                {this.t('and')}{' '}
                <a
                  href='https://github.com/openvcash/papers/blob/master/scaling_the_blockchain.pdf'
                  target='_blank'
                >
                  Scaling the blockchain
                </a>
              </div>
            </div>

            <div className='flex features-column shadow'>
              <div style={{ flex: 1 }}>
                <div className='features-title'>
                  <i className='material-icons md-30'>event_seat</i>
                  <p className='roboto-condensed'>
                    {this.t('incentive')}
                  </p>
                </div>
                <p className='features-body raleway'>
                  {this.t('incentiveOne')} {this.t('incentiveTwo')}
                </p>
              </div>
              <div className='roboto-condensed'>
                <p>{this.t('whitePapers')}</p>
                <a
                  href='https://github.com/openvcash/papers/blob/master/incentive.pdf'
                  target='_blank'
                >
                  Incentive
                </a>,{' '}
                <a
                  href='https://github.com/openvcash/papers/blob/master/rewardv2.pdf'
                  target='_blank'
                >
                  PoW reward v2
                </a>{' '}
                {this.t('and')}{' '}
                <a
                  href='https://github.com/openvcash/papers/blob/master/rewardv3.pdf'
                  target='_blank'
                >
                  PoW reward v3
                </a>
              </div>
            </div>

            <div className='flex features-column shadow'>
              <div style={{ flex: 1 }}>
                <div className='features-title'>
                  <i className='material-icons md-30'>lock_outline</i>
                  <p className='roboto-condensed'>
                    {this.t('zerotime')}
                  </p>
                </div>
                <p className='features-body raleway'>
                  {this.t('zerotimeOne')} {this.t('zerotimeTwo')}
                </p>
              </div>
              <div className='roboto-condensed'>
                <p>
                  {this.t('whitePapers')}
                </p>
                <a
                  href='https://github.com/openvcash/papers/blob/master/zerotime.pdf'
                  target='_blank'
                >
                  ZeroTime
                </a>
              </div>
            </div>

            <div className='flex features-column shadow'>
              <div style={{ flex: 1 }}>
                <div className='features-title'>
                  <i className='material-icons md-30'>shuffle</i>
                  <p className='roboto-condensed'>
                    {this.t('blending')}
                  </p>
                </div>
                <p className='features-body raleway'>
                  {this.t('blendingOne')} {this.t('blendingTwo')}
                </p>
              </div>
              <div className='roboto-condensed'>
                <p>
                  {this.t('whitePapers')}
                </p>
                <a
                  href='https://github.com/openvcash/papers/blob/master/chainblender.pdf'
                  target='_blank'
                >
                  ChainBlender
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Features
