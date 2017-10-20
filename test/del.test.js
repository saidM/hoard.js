'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const cache = require('../index')

const expect = chai.expect
chai.use(chaiAsPromised)

describe('DEL', () => {
  beforeEach(() => cache.clear())

  it('returns an error if the key is not stored in the cache', () => {
    return expect(cache.del('foo')).to.be.rejectedWith(Error)
  })

  it('removes the item from the cache', () => {
    return cache.set('foo', 'bar')
    .then(() => cache.del('foo'))
    .then(() => expect(cache.get('foo')).to.be.rejectedWith(Error))
  })
})
