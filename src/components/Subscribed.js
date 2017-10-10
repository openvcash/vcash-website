import React from 'react'
import { translate } from 'react-i18next'

@translate(['common'])
class Newsletter extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
  }

  render() {
    return (
      <div className="flex subscribed">
        <p>{this.t('subscribed')}</p>
      </div>
    )
  }
}

export default Newsletter
