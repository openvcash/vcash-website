import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

/** Required components. */
import { CustomTick, CustomTooltip } from './RechartsCustom.js'

@translate(['network'], { wait: true })
@inject(['rewardCalculator'])
@observer
class Rewards extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
    this.rc = props.rewardCalculator
  }

  render() {
    return (
      <ResponsiveContainer height={230} width="100%">
        <LineChart
          data={this.rc.chartData}
          margin={{ top: 20, right: 25, bottom: 25, left: 25 }}
        >
          <CartesianGrid stroke="#CCCCCC" strokeDasharray="5 5" />
          <Line
            dataKey={this.t('network:powReward')}
            stroke="#5f0014"
            type="monotone"
          />
          <Line
            dataKey={this.t('network:miningShare')}
            stroke="#EC5E44"
            type="monotone"
          />
          <Line
            dataKey={this.t('network:incentiveShare')}
            stroke="#803888"
            type="monotone"
          />
          <Tooltip
            content={
              <CustomTooltip
                amounts
                labelText={this.t('network:rewardSplit')}
                labelType="number"
                language={this.props.i18n.language}
              />
            }
          />
          <XAxis
            dataKey="block"
            tick={
              <CustomTick
                language={this.props.i18n.language}
                textType="number"
                textX={0}
                textY={25}
              />
            }
          />
          <YAxis
            tick={<CustomTick textType="amount" textX={-10} textY={5} />}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default Rewards
