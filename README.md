<p align="center"><h1 align="center">
  fanful-sdk-test
</h1>

<p align="center">
  A public SDK for Fanful clients
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/fanful-sdk-test"><img src="https://badgen.net/npm/v/fanful-sdk-test" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/fanful-sdk-test"><img src="https://badgen.net/npm/license/fanful-sdk-test" alt="license"/></a>
  <a href="https://www.npmjs.org/package/fanful-sdk-test"><img src="https://badgen.net/npm/dt/fanful-sdk-test" alt="downloads"/></a>
  <a href="https://github.com/josemak25/fanful-sdk-test/actions?workflow=CI"><img src="https://github.com/josemak25/fanful-sdk-test/workflows/CI/badge.svg" alt="build"/></a>
  <a href="https://codecov.io/gh/josemak25/fanful-sdk-test"><img src="https://badgen.net/codecov/c/github/josemak25/fanful-sdk-test" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/josemak25/fanful-sdk-test"><img src="https://snyk.io/test/github/josemak25/fanful-sdk-test/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

# About

A public SDK for Fanful clients

# Install

```bash
yarn add fanful-sdk
```

# Usage

```js
import Fanful from 'fanful-sdk'

const sdk = new Fanful({
  version: 2,
  mode: 'test',
  // LocalStorage -> Web Environment | AsyncStorage -> React Native Environment
  storage: LocalStorage | AsyncStorage, // This can also be left out, the sdk will use the default storage, which is in-memory
  secrete_key: '8WlClMqx2ZP5qFkI7/qkNQqpB65wp1FLfU',
  client_id: 'eyJpYXQiOjE3NDQ4MTUwNjguNzAxOTM5LCJ1cmwiOiJod'
})
```

# Example

<!-- TODO -->

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**fanful-sdk** © [josemak25](https://github.com/josemak25), Released under the [Apache-2.0](./LICENSE) License.
