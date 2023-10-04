import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_URL } from '@constants/index';
import { AppError } from '@utils/AppError';
import { AuthTokenService } from '@services/AuthTokeService';


type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void
}

type PromiseType = {
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
}

const api = axios.create({
    baseURL: API_URL
}) as APIInstanceProps;

let failedQueu: Array<PromiseType> = []
let isRefreshing = false;

api.registerInterceptTokenManager = signOut => {
    const interceptTokenManager = api.interceptors.response.use(response => response, async requestError => {

        if (requestError?.response?.status === 401) {
            const tokenExpired = requestError.response.data?.message === 'token.expired'
            const tokenInvalid = requestError.response.data?.message === 'token.invalid'

            if (tokenExpired || tokenInvalid) {
                const { refresh_token } = await AuthTokenService.get()

                if (!refresh_token) {
                    signOut()
                    return Promise.reject(requestError)
                }

                const originalRequestConfig = requestError.config;

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueu.push({
                            onSuccess: (token) => {
                                AuthTokenService.update(token)
                                resolve(api(originalRequestConfig))
                            },
                            onFailure: (error) => {
                                reject(error)
                            }
                        })
                    })
                }

                isRefreshing = true

                return new Promise(async (resolve, reject) => {
                    try {
                        const { data } = await api.post('/sessions/refresh-token', { refresh_token })
                        await AuthTokenService.save({
                            refresh_token: data.refresh_token,
                            token: data.token
                        })

                        if (originalRequestConfig.data) {
                            originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
                        }

                        originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` }

                        failedQueu.forEach(request => {
                            request.onSuccess(data.token)
                        })
                        console.log('TOKEN ATUALIZADO')
                        resolve(api(originalRequestConfig))

                    } catch (error: any) {
                        failedQueu.forEach(request => {
                            request.onFailure(error)
                        })

                        signOut()
                        reject(error)
                    } finally {
                        isRefreshing = false;
                        failedQueu = []
                    }
                })
            }
            signOut();
        }





        if (requestError.response && requestError.response.data && requestError.response.data.message) {
            const message = requestError.response.data.message
            const appError = new AppError(message)
            return Promise.reject(appError)
        } else {
            return Promise.reject(requestError)
        }
    });

    return () => {
        api.interceptors.response.eject(interceptTokenManager)
    }
}



export { api }