'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const cache = require('../index')

const expect = chai.expect
chai.use(chaiAsPromised)

describe('DECR', () => {
  beforeEach(() => cache.clear())

  context('when the key is not stored in the cache', () => {
    it('rejects the promise', () => {
      return expect(cache.decr('foo')).to.rejectedWith(Error)
    })
  })

  context('when the key matches an item', () => {
    it('rejects the promise if the item is not a number', () => {
      return cache.set('foo', {age: 24})
      .then(() => cache.decr('foo'))
      .catch(err => expect(err).to.be.an('error'))
    })

    it('decrements the item by one', () => {
      return cache.set('foo', 1)
      .then(() => cache.decr('foo'))
      .then(data => expect(data).to.equal(0))
    })
  })
})
