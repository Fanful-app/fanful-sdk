import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'
import {
  ClientConfiguration,
  ClientInterface,
  CreateClientInterface,
  HandleInterface,
  SetUpConfigInterface,
  StoreInterface,
  SubscriptionInterface
} from '../typings/client'
import {
  BasicResponseInterface,
  PaginateParams,
  PaginateResult,
  PaginateStoreResult
} from '@typings/global'
import {
  CountryMetricsInterface,
  MetricsInterface,
  SubscribersMetricsInterface
} from '@typings/metrics'
import { ReportInterface, UserInterface } from '@typings/user'
import { createFormDataFromPayload, omit } from './helper/utils'
import { ParticipantList, RaffleInterface, RaffleParamInterface } from '@typings/reward'
import { CreateShop } from '@typings/shop'

export default class Admin {
  private static network: AxiosInstance

  constructor(network: AxiosInstance) {
    Admin.network = network
  }

  /**
   * @method get
   * @returns {Promise<ClientInterface>} Returns a list of clients
   */
  public clients = async (payload: PaginateParams): Promise<PaginateResult<ClientInterface>> => {
    const { data } = await Admin.network.get<
      BasicResponseInterface<PaginateResult<ClientInterface>>
    >(URLS.getClients(payload))

    return data.payload
  }

  /**
   * @method delete
   * @param {Pick<ClientInterface, "client_id">} payload
   * @returns {Promise<ClientInterface>} deletes a specific client
   */
  public deleteClient = async (
    payload: Pick<ClientInterface, 'client_id'>
  ): Promise<ClientInterface> => {
    const { data } = await Admin.network.delete<BasicResponseInterface<ClientInterface>>(
      URLS.deleteClient(payload)
    )

    return data.payload
  }

  /**
   * @method post
   * @param {CreateClientInterface} payload
   * @returns {Promise<ClientInterface>} creates a client
   */
  public create = async (payload: CreateClientInterface): Promise<ClientInterface> => {
    const { data } = await Admin.network.post<BasicResponseInterface<ClientInterface>>(
      URLS.createClient,
      payload
    )

    return data.payload
  }

  /**
   * @method put
   * @param {SetUpConfigInterface} payload
   * @returns {Promise<any>} white label a client app
   */
  public whiteLabelClientApp = async (payload: SetUpConfigInterface): Promise<ClientInterface> => {
    const { id, ...restParams } = payload

    const formData = createFormDataFromPayload(restParams)
    const { data } = await Admin.network.post<BasicResponseInterface<ClientInterface>>(
      URLS.whiteLabelClientApp(id as string),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<MetricsInterface>} get dashboard metrics for admin
   */
  public metrics = async (): Promise<MetricsInterface> => {
    const { data } = await Admin.network.get<BasicResponseInterface<MetricsInterface>>(
      URLS.getMetrics
    )

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<CountryMetricsInterface>} get dashboard country metrics for admin
   */
  public countryMetrics = async (): Promise<CountryMetricsInterface> => {
    const { data } = await Admin.network.get<BasicResponseInterface<CountryMetricsInterface>>(
      URLS.getCountryMetrics
    )

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<SubscribersMetricsInterface>} get dashboard subscription metrics
   */
  public subscriptionMetrics = async (): Promise<SubscribersMetricsInterface> => {
    const { data } = await Admin.network.get<BasicResponseInterface<SubscribersMetricsInterface>>(
      URLS.getSubscriptionMetrics
    )

    return data.payload
  }

  /**
   * @method get
   * @param {PaginateResult<ReportInterface>}
   * @returns {Promise<PaginateResult<ReportInterface>>} get reported users
   */
  public reportedUsers = async (
    payload: PaginateParams
  ): Promise<PaginateResult<ReportInterface>> => {
    const { data } = await Admin.network.get<
      BasicResponseInterface<PaginateResult<ReportInterface>>
    >(URLS.getReportedUsers(payload))

    return data.payload
  }

  /**
   * @method put
   * @param {{ user_id: string } & Pick<ClientInterface, 'id'>} payload
   * @returns {Promise<ClientInterface>} resolves a reported user
   */
  public resolveReportedUser = async (
    payload: { user_id: string } & Pick<ClientInterface, 'id'>
  ): Promise<ClientInterface> => {
    const { data } = await Admin.network.put<BasicResponseInterface<ClientInterface>>(
      URLS.resolveReportedUser(payload)
    )

    return data.payload
  }

  /**
   * @method delete
   * @param {{ user_id: string } & Pick<ClientInterface, "id">}
   * @returns {Promise<ClientInterface>} delete a reported user
   */
  public suspendReportedUser = async (
    payload: { user_id: string } & Pick<ClientInterface, 'id'>
  ): Promise<ClientInterface> => {
    const { data } = await Admin.network.delete<BasicResponseInterface<ClientInterface>>(
      URLS.suspendReportedUser(payload)
    )

    return data.payload
  }

  /**
   * @method get
   * @returns {Promise<PaginateResult<ReportInterface>>} returns reported contents
   */
  public reportedContents = async (
    payload: PaginateParams
  ): Promise<PaginateResult<ReportInterface>> => {
    const { data } = await Admin.network.get<
      BasicResponseInterface<PaginateResult<ReportInterface>>
    >(URLS.getReportedContents(payload))

    return data.payload
  }

  /**
   * @method put
   * @param {{ content_id: string } & Pick<ClientInterface, "id">} payload
   * @returns {Promise<ClientInterface>} keeps a reported content
   */
  public keepReportedContent = async (
    payload: { content_id: string } & Pick<ClientInterface, 'id'>
  ): Promise<ClientInterface> => {
    const { data } = await Admin.network.put<BasicResponseInterface<ClientInterface>>(
      URLS.keepReportedContent(payload)
    )

    return data.payload
  }

  /**
   * @method delete
   * @param {{ content_id: string } & Pick<ClientInterface, "id">} payload
   * @returns {Promise<ClientInterface>} deletes a reported content
   */
  public deleteReportedContent = async (
    payload: { content_id: string } & Pick<ClientInterface, 'id'>
  ): Promise<ClientInterface> => {
    const { data } = await Admin.network.delete<BasicResponseInterface<ClientInterface>>(
      URLS.deleteReportedContent(payload)
    )

    return data.payload
  }

  /**
   * @method get
   * @param {payload: { page?: number; size?: number }, client_id: string}
   * @returns {Promise<PaginateStoreResult<StoreInterface>>} returns loyalize stores
   */
  public loyalizeStores = async (
    payload: {
      page?: number
      size?: number
    },
    client_id: string
  ): Promise<PaginateStoreResult<StoreInterface>> => {
    const { data } = await Admin.network.get<
      BasicResponseInterface<PaginateStoreResult<StoreInterface>>
    >(URLS.getLoyalizeStores(payload, client_id))

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
   * @param {payload: Pick<ClientInterface, 'client_id'> & SubscriptionInterface} payload
   * @returns {Promise<any>} updates a subscription config
   */
  public updateSubscriptionConfig = async (
    payload: Pick<ClientInterface, 'client_id'> & SubscriptionInterface
  ): Promise<BasicResponseInterface<SubscriptionInterface>> => {
    const { client_id, ...restParams } = payload

    if (!client_id) {
      throw new Error('Client ID is required.')
    }

    const formData = createFormDataFromPayload(restParams)

    const { data } = await Admin.network.put<any>(
      URLS.updateSubscriptionConfig(client_id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return data.payload
  }

  // _________clients routes__________

  /**
   * @method get
   * @param {string} id
   * @returns {Promise<ClientInterface>} gets client info
   */
  public client = async (id: string): Promise<ClientInterface> => {
    const { data } = await Admin.network.get<BasicResponseInterface<ClientInterface>>(
      URLS.getClient(id)
    )

    return data.payload
  }

  /**
   * @method get
   * @param {}
   * @returns {Promise<PaginateResult<ParticipantList>>} gets Raffle Participants
   */
  public raffleParticipants = async (
    payload: PaginateParams,
    raffle_id: string,
    client_id: string
  ): Promise<PaginateResult<ParticipantList>> => {
    const { data } = await Admin.network.get<
      BasicResponseInterface<PaginateResult<ParticipantList>>
    >(URLS.getRaffleParticipants(payload, raffle_id, client_id))

    return data.payload
  }

  /**
   * @method get
   * @param {string} client_id
   * @returns {Promise<boolean>} exports client users
   */
  public exportClientUsers = async (client_id: string): Promise<boolean> => {
    const response = await Admin.network.get<any>(URLS.exportClientUsers(client_id), {
      responseType: 'blob'
    })

    const blob = response.data

    const urlObject = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = urlObject
    a.download = 'users.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(urlObject)

    return true
  }

  /**
   * @method get
   * @param {payload: PaginateParams, client_id: string}
   * @returns {Promise<PaginateResult<UserInterface>>} returns client users
   */
  public clientUsers = async (
    payload: PaginateParams,
    client_id: string
  ): Promise<PaginateResult<UserInterface>> => {
    const { data } = await Admin.network.get<BasicResponseInterface<PaginateResult<UserInterface>>>(
      URLS.getClientUsers(payload, client_id)
    )

    return data.payload
  }

  /**
   * @method put
   * @param {SetUpConfigInterface} payload
   * @returns {Promise<ClientInterface>} updates a client
   */
  public updateClient = async (payload: SetUpConfigInterface): Promise<ClientInterface> => {
    const { id, ...restParams } = payload

    const formData = createFormDataFromPayload(restParams)
    const { data } = await Admin.network.put<BasicResponseInterface<ClientInterface>>(
      URLS.updateClient(id as string),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return data.payload
  }

  /**
   * @method post
   * @returns {Promise<any>} crates a raffle
   */
  public createRaffle = async (
    payload: Pick<ClientInterface, 'client_id'> & RaffleInterface
  ): Promise<any> => {
    const { client_id, ...restParams } = payload

    // const params = omit(restParams, ["id", "participants"]);

    const formData = createFormDataFromPayload(restParams)
    const { data } = await Admin.network.post<BasicResponseInterface<RaffleInterface>>(
      URLS.createRaffle(client_id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return data.payload
  }

  /**
   * @method put
   * @param {RaffleInterface} payload
   * @returns {Promise<RaffleInterface>} updates a raffle
   */
  public updateRaffle = async (payload: RaffleInterface): Promise<RaffleInterface> => {
    const { id, ...restParams } = payload

    // const payload = omit(restParams, ["participants"]);

    const formData = createFormDataFromPayload(restParams)
    const { data } = await Admin.network.put<BasicResponseInterface<RaffleInterface>>(
      URLS.updateRaffle(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return data.payload
  }

  /**
   * @method delete
   * @param {RaffleParamInterface} payload
   * @returns {Promise<RaffleInterface>} deletes a raffle
   */
  public deleteRaffle = async (payload: RaffleParamInterface): Promise<RaffleInterface> => {
    const { data } = await Admin.network.delete<BasicResponseInterface<RaffleInterface>>(
      URLS.deleteRaffle(payload)
    )

    return data.payload
  }

  /**
   * @method delete
   * @returns {Promise<CreateShop>} deletes a shop
   */
  public removeShop = async (payload: { id: string; shop_id: string }): Promise<CreateShop> => {
    const { data } = await Admin.network.delete<BasicResponseInterface<CreateShop>>(
      URLS.removeShop(payload)
    )

    return data.payload
  }

  /**
   * @method post
   * @returns {Promise<any>} creates/adds a shop
   */
  public addShop = async (
    payload: (Pick<ClientInterface, 'client_id'> & StoreInterface) | CreateShop
  ): Promise<any> => {
    const { client_id, ...restParams } = payload
    // const data = omit(restParams, [
    //   'id',
    //   'seo',
    //   'home',
    //   'language',
    //   'storeType',
    //   'countries',
    //   'is_selected'
    // ])

    const formData = createFormDataFromPayload(restParams)
    const { data } = await Admin.network.post<BasicResponseInterface<CreateShop>>(
      URLS.addShop(client_id as string),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return data.payload
  }

  /**
   * @method put
   * @param {CreateShop} payload
   * @returns {Promise<CreateShop>} updates a shop
   */
  public updateShop = async (payload: CreateShop): Promise<CreateShop> => {
    const { id, ...restParams } = payload
    // const payload = omit(restParams, [
    //   "seo",
    //   "home",
    //   "language",
    //   "storeType",
    //   "countries",
    //   "commission",
    //   "is_selected",
    // ]);

    const formData = createFormDataFromPayload(restParams)
    const { data } = await Admin.network.put<BasicResponseInterface<CreateShop>>(
      URLS.updateShop(payload),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return data.payload
  }

  /**
   * @method put
   * @returns {Promise<ClientInterface>} updates fan-point
   */
  public updateFanPoints = async ({
    client_id,
    fan_points
  }: Pick<ClientInterface, 'client_id' | 'fan_points'>): Promise<ClientInterface> => {
    const { data } = await Admin.network.put<BasicResponseInterface<ClientInterface>>(
      URLS.updateFanPoints(client_id),
      { fan_points }
    )

    return data.payload
  }

  /**
   * @method put
   * @param {ClientConfiguration['credentials'] & Pick<ClientInterface, 'client_id'>} payload
   * @returns {Promise<ClientInterface>} updates credentials
   */
  public updateCredenntials = async (
    payload: ClientConfiguration['credentials'] & Pick<ClientInterface, 'client_id'>
  ): Promise<ClientInterface> => {
    const { client_id, ...credentials } = payload
    const { data } = await Admin.network.put<BasicResponseInterface<ClientInterface>>(
      URLS.updateCredenntials(client_id),
      { credentials }
    )

    return data.payload
  }

  /**
   * @method put
   * @param {HandleInterface & Pick<ClientInterface, 'id'>} payload
   * @returns {Promise<ClientInterface>} updates pending socials
   */
  public updatePendingSocial = async (
    payload: HandleInterface & Pick<ClientInterface, 'id'>
  ): Promise<ClientInterface> => {
    const { id, ...restParams } = payload
    const { data } = await Admin.network.put<BasicResponseInterface<ClientInterface>>(
      URLS.updatePendingSocial(id),
      restParams
    )

    return data.payload
  }
}
