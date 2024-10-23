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
const network_1 = require('@app/helper/network')
class FanfulSdk {
  constructor(options) {
    /**
     * @method getPosts
     * @param {PaginateParams & PostFilterInterface} params - post filter param object
     * @returns {Promise<PaginateResult<PostInterface>>} Returns the posts based off the filter params passed
     */
    this.getPosts = (params) =>
      __awaiter(this, void 0, void 0, function* () {
        const { data } = yield FanfulSdk.network.get('/posts', { params })
        return data.payload
      })
    /**
     * @method getPost
     * @param {string} post_id - post id to search for
     * @returns {Promise<PostInterface>} Returns the post that matches the id passed
     */
    this.getPost = (post_id) =>
      __awaiter(this, void 0, void 0, function* () {
        const { data } = yield FanfulSdk.network.get(`/posts/${post_id}`)
        return data.payload
      })
    /**
     * @method getCountries
     * @returns {Promise<Country[]>} Returns the list of countries
     */
    this.getCountries = () =>
      __awaiter(this, void 0, void 0, function* () {
        const { data } = yield FanfulSdk.network.get('/country')
        return data.payload
      })
    FanfulSdk.network = (0, network_1.createNetwork)(options)
  }
}
exports.default = FanfulSdk
