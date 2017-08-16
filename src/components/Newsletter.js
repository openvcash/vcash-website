import React from 'react'
import { translate } from 'react-i18next'
import { Button, Input } from 'antd'

/** TODO: Add mailchimp support on server & client. */

@translate(['common'])
class Newsletter extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
  }

  render () {
    return (
      <div>
        <div className='flex-sb'>
          <Input
            placeholder={this.t('newsletter')}
            size='small'
            style={{ flex: 1 }}
          />
          <Button size='small' style={{ margin: '0 0 0 5px' }}>
            {this.t('subscribe')}
          </Button>
        </div>
      </div>
    )
  }
}

export default Newsletter
