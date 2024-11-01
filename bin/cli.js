#!/usr/bin/env node
import FanfulSdk from '../dist/index.js'

console.log(FanfulSdk)

const sdk = new FanfulSdk({})

console.log(sdk.getCountries())
