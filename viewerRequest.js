'use strict'
const dns = require('dns')

exports.handler = (event, context, callback) => {
  try {
    console.log(JSON.stringify(event))
    const request = event.Records[0].cf.request
    dns.reverse(request.clientIp, (error, hostname) => {
      if (/\.googlebot\.com$|\.google\.com$/.test(hostname)) {
        request.headers['is-google-bot-request'] = [
          {
            key: 'Is-Google-Bot-Request',
            value: '1'
          }
        ]
      } else {
        request.headers['is-google-bot-request'] = [
          {
            key: 'Is-Google-Bot-Request',
            value: '0'
          }
        ]
      }
      callback(null, request)
    })
  } catch (error) {
    event.Records[0].cf.request.headers['is-google-bot-request'] = [
      {
        key: 'Is-Google-Bot-Request',
        value: '0'
      }
    ]
    callback(null, event.Records[0].cf.request)
  }
}
