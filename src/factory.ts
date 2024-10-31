import { FanfulSdkOptions } from '@typings/global'
import { createNetwork } from './helper/network'
import FanfulSdkBase from './base'
import Req from './req'

class FanfulSdkFactory {
  public static initialize(options: FanfulSdkOptions) {
    const networkInstance = createNetwork(options)
    FanfulSdkBase.initializeNetwork(networkInstance)

    return {
      auth: new Req()
    }
  }
}
export default FanfulSdkFactory
