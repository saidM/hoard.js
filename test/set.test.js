'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const cache = require('../index')

const expect = chai.expect
chai.use(chaiAsPromised)

describe('SET', () => {
  beforeEach(() => cache.clear())

  context('with no ttl', () => {
    it('stores the item forever', () => {
      return cache.set('foo', 'bar')
      .then(() => cache.get('foo'))
      .then(data => expect(data).to.equal('bar'))
    })
  })

  context('with a ttl', () => {
    it('stores the item only for the given time', () => {
      return cache.set('foo', 'bar', 0)
      .then(() => cache.get('foo'))
      .catch(err => expect(err).to.be.an('error'))
    })
  })
})
