#!/usr/bin/env node
import FanfulSdk from '../dist'

const sdk = new FanfulSdk({})

console.log(sdk.getCountries())
