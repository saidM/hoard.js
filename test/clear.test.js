'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const cache = require('../index')

const expect = chai.expect
chai.use(chaiAsPromised)

describe('CLEAR', () => {
  it('sets the cache to an empty array', () => {
    return cache.clear()
    .then(() => cache.get('foo'))
    .catch(err => expect(err).to.be.an('error')) // ITEM_NOT_FOUND
  })
})
