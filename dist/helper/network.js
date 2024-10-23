'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.createNetwork = void 0
const axios_1 = __importDefault(require('axios'))
const envconfig = {
  test: 'https://phoenix-fanful-2d74e42e73ee.herokuapp.com',
  production: 'https://fanful-backend-33d52a64526c.herokuapp.com'
}
const createNetwork = (params) => {
  // Set config defaults when creating the instance
  const network = axios_1.default.create({ baseURL: `${envconfig[params.mode]}/api/v1` })
  // Add a request interceptor
  network.interceptors.request.use(
    (config) =>
      __awaiter(void 0, void 0, void 0, function* () {
        config.headers.set('x-fanful-client-id', params.secrete_key)
        config.headers.set('x-fanful-secrete-key', params.secrete_key)
        return config
      }),
    (error) => {
      var _a, _b
      reportError(
        (_a = error === null || error === void 0 ? void 0 : error.response) === null ||
          _a === void 0
          ? void 0
          : _a.data
      )
      return Promise.reject(
        (_b = error === null || error === void 0 ? void 0 : error.response) === null ||
          _b === void 0
          ? void 0
          : _b.data
      )
    }
  )
  // Add a response interceptor
  network.interceptors.response.use(
    (response) =>
      __awaiter(void 0, void 0, void 0, function* () {
        return response
      }),
    (error) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = error.response
        reportError(response === null || response === void 0 ? void 0 : response.data)
        return Promise.reject(response === null || response === void 0 ? void 0 : response.data)
      })
  )
  return network
}
exports.createNetwork = createNetwork
