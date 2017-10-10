import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import Input from 'antd/lib/input'
import moment from 'moment'

/** Required components. */
import Rewards from './charts/Rewards'

@translate(['network'], { wait: true })
@inject('network', 'rewardCalculator')
@observer
class RewardCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
    this.network = props.network
    this.rc = props.rewardCalculator
    this.language = props.i18n.language
  }

  render() {
    return (
      <div className="flex-sb reward-calculator">
        <div className="reward-calculator-text">
          <div className="flex-sb" style={{ margin: '0 0 20px 0' }}>
            <div className="flex">
              <i className="material-icons md-18">extension</i>
              <p>{this.t('network:rewardCalculator')}</p>
            </div>
            <div>
              <Input
                maxLength={7}
                onChange={e => this.rc.setBlock(e)}
                placeholder={new Intl.NumberFormat(this.language).format(
                  this.rc.block
                )}
                size="small"
                style={{ width: '100px' }}
                value={this.rc.enteredBlock}
              />
            </div>
          </div>
          <div
            className="flex-sb"
            style={{ alignItems: 'flex-start', margin: '0 0 20px 0' }}
          >
            <div>
              <div className="flex">
                <i className="material-icons md-16">stars</i>
                <p>{this.t('network:powReward')}</p>
              </div>
              <div className="flex">
                <i className="material-icons md-16">developer_board</i>
                <p>{this.t('network:miningShare')}</p>
              </div>
              <div className="flex">
                <i className="material-icons md-16">event_seat</i>
                <p>{this.t('network:incentiveShare')}</p>
              </div>
            </div>
            <div style={{ margin: '0 0 0 5px' }}>
              <p style={{ margin: '1px 0 0 0' }}>
                <span style={{ fontWeight: '500' }}>
                  {new Intl.NumberFormat(this.language, {
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6
                  }).format(this.rc.powReward)}
                </span>{' '}
                XVC
              </p>
              <p style={{ margin: '1px 0 0 0' }}>
                <span style={{ fontWeight: '500' }}>
                  {new Intl.NumberFormat(this.language, {
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6
                  }).format(this.rc.miningReward)}
                </span>{' '}
                XVC ({100 - this.rc.incentivePercent}%)
              </p>
              <p style={{ margin: '1px 0 0 0' }}>
                <span style={{ fontWeight: '500' }}>
                  {new Intl.NumberFormat(this.language, {
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6
                  }).format(this.rc.incentiveReward)}
                </span>{' '}
                XVC ({this.rc.incentivePercent}%)
              </p>
            </div>
          </div>

          {this.rc.block > this.network.stats.maxBlockHeight && (
            <div className="flex" style={{ margin: '0 0 20px 0' }}>
              <i className="material-icons md-16">alarm</i>
              <p>
                {this.t('network:blockEstimation')}{' '}
                <span style={{ fontWeight: '500' }}>
                  {moment().to(this.rc.time)}
                </span>.
              </p>
            </div>
          )}
        </div>
        <div className="reward-calculator-chart">
          <Rewards data={this.rc.chartData} />
        </div>
      </div>
    )
  }
}

export default RewardCalculator
