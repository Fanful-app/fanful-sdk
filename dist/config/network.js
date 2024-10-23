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
Object.defineProperty(exports, '__esModule', { value: true })
exports.network = void 0
// Set config defaults when creating the instance
exports.network = axios.create({
  baseURL: `${envconfig.API_URL}/api/v1`
})
// Add a request interceptor
exports.network.interceptors.request.use(
  (config) =>
    __awaiter(void 0, void 0, void 0, function* () {
      // get the JWT token out of it
      config.headers.setAuthorization(
        (session === null || session === void 0 ? void 0 : session.access_token) || ''
      )
      config.headers.set('x-fanful-client-id', envconfig.CLIENT_ID)
      return config
    }),
  (error) => {
    var _a, _b
    reportError(
      (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0
        ? void 0
        : _a.data
    )
    return Promise.reject(
      (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0
        ? void 0
        : _b.data
    )
  }
)
// Add a response interceptor
exports.network.interceptors.response.use(
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
