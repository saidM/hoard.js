'use strict'

let items = []

const get = key => {
  if (typeof items[key] === 'undefined') {
    return Promise.reject(new Error('ITEM_NOT_FOUND'))
  }

  const {data, expiresAt} = items[key]

  // Is the item still valid?
  if (typeof expiresAt === 'undefined') {
    return Promise.resolve(data)
  } else if (Date.now() > expiresAt) {
    return Promise.reject(new Error('ITEM_NOT_FOUND'))
  }

  // Item is present & still valid
  return Promise.resolve(data)
}

const set = (key, object, ttl = null) => {
  const item = {data: object}

  // If there is a ttl, set an expiration date for the item
  if (ttl !== null) {
    item.expiresAt = Date.now() + ttl
  }

  // Store the item
  items[key] = item

  // Return the data
  return Promise.resolve(item.data)
}

const incr = key => {
  return get(key)
  .then(data => {
    if (typeof data !== 'number') {
      return Promise.reject(new Error('ITEM_IS_NOT_A_NUMBER'))
    }

    return set(key, data + 1)
  })
  .catch(err => Promise.reject(err))
}

const decr = key => {
  return get(key)
  .then(data => {
    if (typeof data !== 'number') {
      return Promise.reject(new Error('ITEM_IS_NOT_A_NUMBER'))
    }

    return set(key, data - 1)
  })
  .catch(err => Promise.reject(err))
}

const del = key => {
  return get(key)
  .then(data => {
    delete items[key]
    Promise.resolve(data)
  })
  .catch(err => Promise.reject(err))
}

const clear = () => {
  items = []
  return Promise.resolve()
}

module.exports = {get, set, incr, decr, del, clear}
