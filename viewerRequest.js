'use strict'
const util = require('util')
const dns = require('dns')
const dnsReverse = util.promisify(dns.reverse)

exports.handler = async (event, context, callback) => {
  try {
    console.log(JSON.stringify(event))
    const request = event.Records[0].cf.request
    const hostname = await dnsReverse(request.clientIp)
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
