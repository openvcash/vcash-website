import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { Input, Pagination } from 'antd'

/** Required components. */
import NewsPost from './NewsPost'

@translate(['common'])
@inject('news')
@observer
class News extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
    this.news = props.news
  }

  /** Return GET request id, or the latest news post id. */
  id () {
    return typeof this.props.id === 'undefined'
      ? this.news.posts.length > 0 ? this.news.posts[0].id : ''
      : this.props.id
  }

  render () {
    const id = this.id()

    return (
      <div style={{ flex: '1 0 auto' }}>
        <div className='shadow news-post-featured'>
          <div className='content wrapper'>
            <div className='flex-sb news-search'>
              <div
                className='flex'
                style={{
                  background: '#b60127',
                  color: '#FFFFFF',
                  margin: '0 0 10px 0',
                  padding: '2px 10px'
                }}
              >
                <i className='material-icons md-16'>speaker_notes</i>
                <p style={{ fontSize: '18px' }}>
                  {typeof this.props.id === 'undefined'
                    ? this.t('latestNews')
                    : this.t('linkedNews')}
                </p>
              </div>
              <Input
                onChange={e => this.news.setSearch(e.target.value)}
                placeholder={this.t('searchNews')}
                prefix={<i className='material-icons md-14'>search</i>}
                size='small'
                style={{ margin: '0 0 10px 0', width: '200px' }}
                value={this.news.search.value}
              />
            </div>

            {this.news.byId.hasOwnProperty(id) === true &&
              <NewsPost post={this.news.byId[id]} pin />}
          </div>
        </div>
        <div className='wrapper'>
          <div
            className='flex news-columns'
            style={{ alignItems: 'flex-start', margin: '10px 0 0 0' }}
          >
            <div style={{ flex: 1 }}>
              {this.news.filtered.posts.map(
                post =>
                  post.id !== id &&
                  <NewsPost post={post} key={post.id} />
              )}

              {this.news.filtered.count === 0 &&
                <div className='flex'>
                  <i className='material-icons md-20'>warning</i>
                  <p>
                    {this.t('noResults')}
                  </p>
                </div>}

              {this.news.filtered.count > 0 &&
                <Pagination
                  current={this.news.page}
                  onChange={page => this.news.setPage(page)}
                  pageSize={this.news.perPage}
                  size='small'
                  style={{ margin: '10px 0 10px 0', textAlign: 'center' }}
                  total={this.news.filtered.count}
                />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default News
