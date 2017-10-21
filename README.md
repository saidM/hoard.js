# hoard.js
[![Build Status](https://travis-ci.org/saidM/hoard.js.svg?branch=master)](https://travis-ci.org/saidM/hoard.js) [![Coverage Status](https://coveralls.io/repos/github/saidM/hoard.js/badge.svg)](https://coveralls.io/github/saidM/hoard.js) [![NPM Downloads](https://img.shields.io/npm/dt/hoard.js.svg)](https://www.npmjs.com/package/hoard.js) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/saidM/hoard.js) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/saidM/hoard.js)

Blazing fast in-memory caching library for Node.js.

# Installation

    $ npm install hoard.js
    
# Usage

The first step if to require the module:

```javascript
const cache = require('hoard.js')
```

## cache.set(key, value, ttl = null)

Stores an item in the cache. You can specify the time to live (in seconds).

```javascript
// won't expire
cache.set('foo', 'bar')
.then(data => console.log(data)) // 'bar'

// will expire in 60 seconds
cache.set('me', 'Hi this is me', 60)
.then(data => console.log(data)) // 'Hi this is me'
```

## cache.get(key)

Retrieves an item from the cache. It resolves the promise if the item was found or rejects the promise if the item is not present in the cache or has expired.

```javascript
cache.get('foo')
.then(data => console.log(data)) // bar

cache.get('unknown')
.catch(err => console.error(err)) // ITEM_NOT_FOUND
```

## cache.incr(key)

Increments the value of the given key. Will reject the promise if the value is not of `number` type.

```javascript
cache.set('age', 24)
.then(() => cache.incr('age'))
.then(data => console.log(data)) // 25

cache.set('foo', 'bar')
.then(() => cache.incr('foo'))
.catch(err => console.error(err)) // ITEM_IS_NOT_A_NUMBER
```

## cache.decr(key)

Decrements the value of the given key. Will reject the promise if the value is not of `number` type.

```javascript
cache.set('age', 24)
.then(() => cache.decr('age'))
.then(data => console.log(data)) // 23

cache.set('foo', 'bar')
.then(() => cache.decr('foo'))
.catch(err => console.error(err)) // ITEM_IS_NOT_A_NUMBER
```

## cache.del(key)

Deletes an item from the cache. If the item was successfully deleted, the promise resolves with the item value, otherwise it rejects the promise.

```javascript
cache.del('foo')
.then(data => console.log(data)) // 'bar'
```

## cache.clear()

Deletes all items from the cache.

```javascript
cache.clear()
.then(() => console.log('Cache is now empty'))
```

# Licence

MIT
