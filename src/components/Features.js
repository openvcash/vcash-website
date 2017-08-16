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
            <p style={{ margin: '20px 0 0 0' }}>
              {this.t('descOne')} {this.t('descTwo')} {this.t('descThree')}
            </p>
            <p style={{ margin: '20px 0 60px 0' }}>
              {this.t('engineeredFor')}
            </p>
            <div className='flex-sb' style={{ alignItems: 'flex-start' }}>
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
                    Vchain
                  </a>{' '}
                  {this.t('miningPool')}
                </p>
              </div>
              <div className='flex short-description-link'>
                <i className='material-icons md-20'>extension</i>
                <p>
                  {this.t('explorersBy')}{' '}
                  <a href='https://explorer.vchain.info' target='_blank'>
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
          <div className='flex features-title'>
            <i className='material-icons md-20'>layers</i>
            <p>
              {this.t('networkLayers')}
            </p>
          </div>
          <ul>
            <li>
              {this.t('networkLayersOne')}
            </li>
            <li>
              {this.t('networkLayersTwo')}
            </li>
            <li>
              {this.t('networkLayersThree')}
            </li>
            <li>
              {this.t('networkLayersFour')}
            </li>
          </ul>
          <p>
            {this.t('referTo')}{' '}
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
            </a>{' '}
            {this.t('whitePapers')}
          </p>

          <div className='separator' />
          <div className='flex features-title'>
            <i className='material-icons md-20'>event_seat</i>
            <p>
              {this.t('incentive')}
            </p>
          </div>
          <ul>
            <li>
              {this.t('incentiveOne')}
            </li>
            <li>
              {this.t('incentiveTwo')}
            </li>
          </ul>
          <p>
            {this.t('referTo')}{' '}
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
            </a>{' '}
            {this.t('whitePapers')}
          </p>

          <div className='separator' />
          <div className='flex features-title'>
            <i className='material-icons md-20'>lock_outline</i>
            <p>
              {this.t('zerotime')}
            </p>
          </div>
          <ul>
            <li>
              {this.t('zerotimeOne')}
            </li>
            <li>
              {this.t('zerotimeTwo')}
            </li>
          </ul>
          <p>
            {this.t('referTo')}{' '}
            <a
              href='https://github.com/openvcash/papers/blob/master/zerotime.pdf'
              target='_blank'
            >
              ZeroTime
            </a>{' '}
            {this.t('whitePaper')}
          </p>

          <div className='separator' />
          <div className='flex features-title'>
            <i className='material-icons md-20'>shuffle</i>
            <p>
              {this.t('blending')}
            </p>
          </div>
          <ul>
            <li>
              {this.t('blendingOne')}
            </li>
            <li>
              {this.t('blendingTwo')}
            </li>
            <li>
              {this.t('blendingThree')}
            </li>
          </ul>
          <p>
            {this.t('referTo')}{' '}
            <a
              href='https://github.com/openvcash/papers/blob/master/chainblender.pdf'
              target='_blank'
            >
              ChainBlender
            </a>{' '}
            {this.t('whitePaper')}
          </p>
        </div>
      </div>
    )
  }
}

export default Features
