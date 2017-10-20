'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const cache = require('../index')

const expect = chai.expect
chai.use(chaiAsPromised)

describe('GET', () => {
  beforeEach(() => cache.clear())

  it('returns an error if the key is not stored in the cache', () => {
    return expect(cache.get('foo')).to.be.rejectedWith(Error)
  })

  it(`returns the object if it's stored in the cache`, () => {
    return cache.set('foo', 'bar')
    .then(() => cache.get('foo'))
    .then(data => expect(data).to.equal('bar'))
  })
})
