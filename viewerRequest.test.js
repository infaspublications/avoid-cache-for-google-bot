'use strict'
const expect = require('chai').expect
const { handler } = require('./viewerRequest')

describe('#viewerRequest()', () => {
    it('should set google flag if client ip is range of google', () => {
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
      handler(event, {}, (error, request) => {
        expect(request).to.deep.equal({
          headers: {
            accept: [
              {
                key: 'accept',
                value: 'image/webp,image/apng,image/*,*/*;q=0.8'
              }
            ],
            'is-google-bot-request': [
              {
                key: 'Is-Google-Bot-Request',
                value: '0'
              }
            ]
          }
        })
      })
    }),

    it('should not set google flag if client ip is not range of google', () => {
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
        handler(event, {}, (error, request) => {
          expect(request).to.deep.equal({
            headers: {
              accept: [
                {
                  key: 'accept',
                  value: 'image/webp,image/apng,image/*,*/*;q=0.8'
                }
              ],
              'is-google-bot-request': [
                {
                  key: 'Is-Google-Bot-Request',
                  value: '0'
                }
              ]
            }
          })
        })
      })
})