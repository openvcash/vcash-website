import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { Pie, PieChart, Tooltip } from 'recharts'

/** Required components. */
import { CustomTooltip } from './RechartsCustom.js'

@translate(['network'], { wait: true })
@inject('network')
@observer
class PeerOSs extends React.Component {
  constructor(props) {
    super(props)
    this.network = props.network
  }

  render() {
    return (
      <PieChart width={305} height={200}>
        <Pie
          isAnimationActive={false}
          data={Object.keys(this.network.stats.os).reduce((oss, os) => {
            oss.push({
              name: os,
              value: this.network.stats.os[os]
            })

            return oss
          }, [])}
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

export default PeerOSs
