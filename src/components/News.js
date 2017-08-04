import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { Input, Pagination } from 'antd'
import Link from 'next/link'

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

  render () {
    return (
      <div>
        <div className='flex news-columns' style={{ alignItems: 'flex-start' }}>
          <div style={{ minWidth: '200px' }}>
            <div className='flex'>
              <i className='material-icons md-16'>speaker_notes</i>
              <p style={{ fontSize: '18px' }}>
                {this.t('latestNews')}
              </p>
            </div>
            <div style={{ margin: '10px 0 10px 0' }}>
              {this.news.latestFive.map(post =>
                <p key={post.id}>
                  <Link as={'/news/' + post.id} href={'/news?id=' + post.id}>
                    <a>
                      {post.title}
                    </a>
                  </Link>
                </p>
              )}
            </div>
            <Input
              onChange={e => this.news.setSearch(e.target.value)}
              placeholder={this.t('searchNews')}
              prefix={<i className='material-icons md-14'>search</i>}
              size='small'
              style={{ margin: '0 0 10px 0', width: '170px' }}
              value={this.news.search.value}
            />
          </div>
          <div style={{ flex: 1 }}>
            {this.news.byId.hasOwnProperty(this.props.id) === true &&
              <NewsPost post={this.news.byId[this.props.id]} pin />}

            {this.news.filtered.posts.map(post =>
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
    )
  }
}

export default News
