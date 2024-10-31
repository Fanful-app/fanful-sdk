import { AxiosInstance } from 'axios'

export type FanfulSdkOptions = {
  client_id: string
  secrete_key: string
  mode?: 'test' | 'production'
}

class FanfulSdkBase {
  protected static network: AxiosInstance

  public static initializeNetwork(instance: AxiosInstance) {
    if (!FanfulSdkBase.network) {
      FanfulSdkBase.network = instance
    }
  }

  protected getNetworkInstance(): AxiosInstance {
    return FanfulSdkBase.network
  }
}

export default FanfulSdkBase
