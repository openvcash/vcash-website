import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { Pie, PieChart, Tooltip } from 'recharts'

/** Required components. */
import { CustomTooltip } from './RechartsCustom'

@translate(['network'], { wait: true })
@inject('network')
@observer
class PeerTypes extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
    this.network = props.network
  }

  render() {
    return (
      <PieChart width={305} height={200}>
        <Pie
          isAnimationActive={false}
          data={[
            {
              name: this.t('network:public'),
              value: this.network.stats.public
            },
            {
              name: this.t('network:firewalled'),
              value: this.network.stats.firewalled
            }
          ]}
          outerRadius={60}
          fill="#5f0014"
          label={({ name, value }) => name}
          labelLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    )
  }
}

export default PeerTypes
