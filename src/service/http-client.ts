import Axios, { AxiosRequestHeaders } from "axios"

class HttpClient {
  static instance: HttpClient | null = null
  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient()
    }

    return HttpClient.instance
  }

  private constructor() { }

  get = async (
    url: string,
    params: object = {},
    headers: AxiosRequestHeaders = {}
  ): Promise<any> => {
    const { data } = await Axios.get(url, { params, headers })
    return data
  }
  
  post = async (
    url: string,
    body: object,
    params: object = {},
    headers: AxiosRequestHeaders = {}
  ): Promise<any> => {
    const { data } = await Axios.post(url, body, { params, headers })
    return data
  }

  put = async (
    url: string,
    body: object,
    params: object = {},
    headers: AxiosRequestHeaders = {}
  ): Promise<any> => {
    const { data } = await Axios.put(url, body, { params, headers })
    return data
  }

  delete = async (
    url: string,
    params: object = {},
    headers: AxiosRequestHeaders = {}
  ): Promise<any> => {
    const { data } = await Axios.delete(url, { params, headers })
    return data
  }

}

export const httpClient = HttpClient.getInstance()
export const BASE_URL = 'https://dog.ceo/api/'