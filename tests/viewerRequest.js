'use strict'
const utils = require('./utils')
const expect = require('chai').expect
const aws = require('aws-sdk')
const lambda = new aws.Lambda({ region: 'us-east-1' })

describe('#viewerRequest()', async () => {
  before(async () => {
    utils.deployService()
  })

  after(async () => {
    utils.removeService()
  })

  it('should set google flag if client ip is range of google', async () => {
    const event = {
      Records: [
        {
          cf: {
            request: {
              clientIp: '66.249.90.77',
              headers: {
                accept: [
                  {
                    key: 'accept',
                    value: 'image/webp,image/apng,image/*,*/*;q=0.8'
                  }
                ]
              }
            }
          }
        }
      ]
    }
    const result = await lambda
      .invoke({
        FunctionName: 'acfgb-edge-integrationtest-viewerRequest',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event)
      })
      .promise()
    expect(result.StatusCode).to.be.equal(200)
    const body = JSON.parse(result.Payload)
    expect(body['headers']['is-google-bot-request'][0]['key']).to.be.equal('Is-Google-Bot-Request')
    expect(body['headers']['is-google-bot-request'][0]['value']).to.be.equal('1')
  }),
    it('should not set google flag if client ip is not range of google', async () => {
      const event = {
        Records: [
          {
            cf: {
              request: {
                clientIp: 'xx.xx.xx.xx',
                headers: {
                  accept: [
                    {
                      key: 'accept',
                      value: 'image/webp,image/apng,image/*,*/*;q=0.8'
                    }
                  ]
                }
              }
            }
          }
        ]
      }
      const result = await lambda
        .invoke({
          FunctionName: 'acfgb-edge-integrationtest-viewerRequest',
          InvocationType: 'RequestResponse',
          Payload: JSON.stringify(event)
        })
        .promise()
      expect(result.StatusCode).to.be.equal(200)
      const body = JSON.parse(result.Payload)
      expect(body['headers']['is-google-bot-request'][0]['key']).to.be.equal(
        'Is-Google-Bot-Request'
      )
      expect(body['headers']['is-google-bot-request'][0]['value']).to.be.equal('0')
    })
})
