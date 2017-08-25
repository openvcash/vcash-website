import React from 'react'
import { translate } from 'react-i18next'
import Link from 'next/link'
import Markdown from 'react-markdown'
import moment from 'moment'

@translate(['common'])
class NewsPost extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
  }

  render () {
    const { author, body, id, timestamp, title } = this.props.post
    return (
      <div
        className={this.props.pin === true ? 'news-post-pinned' : ''}
        style={{ margin: '0 0 20px 0' }}
      >
        <div className='flex-sb news-post'>
          <div className='flex'>
            <h3>
              {title}
            </h3>
            <Link as={'/news/' + id} href={'/news?id=' + id}>
              <a className='flex'>
                <i className='material-icons md-20'>link</i>
              </a>
            </Link>
          </div>
          <div className='flex'>
            <p>
              {this.t('postedBy')} <span className='red'>{author}</span>{' '}
              {this.t('on')}{' '}
              <span style={{ fontWeight: '500' }}>
                {moment(timestamp).format('LL')}
              </span>
            </p>
          </div>
        </div>
        <div className='news-post-body'>
          <Markdown source={body} />
        </div>
      </div>
    )
  }
}

export default NewsPost
