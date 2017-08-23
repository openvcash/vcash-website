const fetch = require('isomorphic-unfetch')
const { instance, listUniqueId, apiKey } = require('../../mailchimp.json')

/**
 * Process newsletter subscription.
 */
async function subscribe (req, res) {
  /** Temporary until bottom code is tested with the actual API. */
  return res.redirect('/subscribed')

  /** Sanitize req.body.email input. */

  /**
   * If this simple fetch is not enough, use the wrapper library.
   * https://github.com/thorning/node-mailchimp.
   */
  await fetch(
    'https://' +
      instance +
      '.api.mailchimp.com/3.0/lists/' +
      listUniqueId +
      '/members/',
    {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + Buffer.from('any:' + apiKey).toString('base64'),
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email_address: req.body.email,
        status: 'subscribed'
      })
    }
  )
    .then(response => {
      if (response.ok === true) return response
    })
    .then(data => {
      console.log('check mc response', data)
      return res.redirect('/subscribed')
    })
    .catch(error => {
      console.log('handle mc error', error)
    })
}

module.exports = subscribe
