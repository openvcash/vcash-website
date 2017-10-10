import React from 'react'
import { translate } from 'react-i18next'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'

@translate(['common'])
class Newsletter extends React.Component {
  constructor(props) {
    super(props)
    this.t = props.t
  }

  render() {
    return (
      <form action="/subscribe" method="post">
        <div className="flex-sb">
          <Input
            name="email"
            placeholder={this.t('newsletter')}
            size="small"
            style={{ flex: 1 }}
          />
          <Button
            htmlType="submit"
            size="small"
            style={{ margin: '0 0 0 5px' }}
          >
            {this.t('subscribe')}
          </Button>
        </div>
      </form>
    )
  }
}

export default Newsletter
