import React from 'react'
import { inject, observer } from 'mobx-react'
import { Pie, PieChart, Tooltip } from 'recharts'

/** Required components. */
import { CustomTooltip } from './RechartsCustom'

@inject('network')
@observer
class PeerClients extends React.Component {
  constructor(props) {
    super(props)
    this.network = props.network
  }

  render() {
    return (
      <PieChart width={305} height={200}>
        <Pie
          isAnimationActive={false}
          data={Object.keys(
            this.network.stats.versions
          ).reduce((versions, version) => {
            versions.push({
              name: version,
              value: this.network.stats.versions[version]
            })

            return versions
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

export default PeerClients
