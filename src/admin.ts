import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'

export default class Admin {
  private static network: AxiosInstance

  constructor(network: AxiosInstance) {
    Admin.network = network
  }

  /**
   * @method get
   * @returns {Promise<any>} Returns a list of clients
   */
  public clients = async (): Promise<any> => {
    const { data } = await Admin.network.get<any>(URLS.getClients)

    return data.payload
  }

  /**
   * @method delete
   * @returns {Promise<any>} deletes a specific client
   */
  public deleteClient = async (): Promise<any> => {
    const { data } = await Admin.network.delete<any>(URLS.deleteClient)

    return data.payload
  }

  /**
   * @method post
   * @returns {Promise<any>} creates a client
   */
  public create = async (): Promise<any> => {
    const { data } = await Admin.network.post<any>(URLS.createClient)

    return data.payload
  }

  /**
   * @method put
   * @param {string} id
   * @returns {Promise<any>} white label a client app
   */
  public whiteLabelClientApp = async ({ id }: { id: string }): Promise<any> => {
    const { data } = await Admin.network.post<any>(URLS.whiteLabelClientApp(id))

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<any>} get dashboard metrics for admin
   */
  public metrics = async (): Promise<any> => {
    const { data } = await Admin.network.get<any>(URLS.getMetrics)

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<any>} get dashboard country metrics for admin
   */
  public countryMetrics = async (): Promise<any> => {
    const { data } = await Admin.network.get<any>(URLS.getCountryMetrics)

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<any>} get dashboard subscription metrics
   */
  public subscriptionMetrics = async (): Promise<any> => {
    const { data } = await Admin.network.get<any>(URLS.getSubscriptionMetrics)

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<any>} get reported users
   */
  public reportedUsers = async (): Promise<any> => {
    const { data } = await Admin.network.get<any>(URLS.getReportedUsers)

    return data.payload
  }

  /**
   * @method put
   * @returns {Promise<any>} resolves a reported user
   */
  public resolveReportedUser = async (): Promise<any> => {
    const { data } = await Admin.network.put<any>(URLS.resolveReportedUser)

    return data.payload
  }

  /**
   * @method delete
   * @returns {Promise<any>} delete a reported user
   */
  public suspendReportedUser = async (): Promise<any> => {
    const { data } = await Admin.network.delete<any>(URLS.suspendReportedUser)

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<any>} returns reported contents
   */
  public reportedContents = async (): Promise<any> => {
    const { data } = await Admin.network.get<any>(URLS.getReportedContents)

    return data.payload
  }

  /**
   * @method put
   * @returns {Promise<any>} keeps a reported content
   */
  public keepReportedContent = async (): Promise<any> => {
    const { data } = await Admin.network.put<any>(URLS.keepReportedContent)

    return data.payload
  }

  /**
   * @method delete
   * @returns {Promise<any>} deletes a reported content
   */
  public deleteReportedContent = async (): Promise<any> => {
    const { data } = await Admin.network.delete<any>(URLS.deleteReportedContent)

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<any>} returns loyalize stores
   */
  public loyalizeStores = async (): Promise<any> => {
    const { data } = await Admin.network.get<any>(URLS.getLoyalizeStores)

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<any>} returns ranked entries
   */
  public rankedEntries = async (): Promise<any> => {
    const { data } = await Admin.network.get<any>(URLS.getRankedEntries)

    return data.payload
  }

  /**
   * @method put
   * @returns {Promise<any>} updates a subscription config
   */
  public updateSubscriptionConfig = async (): Promise<any> => {
    const { data } = await Admin.network.put<any>(URLS.updateSubscriptionConfig)

    return data.payload
  }
}
