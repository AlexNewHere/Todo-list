import {instance, ResponseType} from './instanceAPI';

export type DataLoginType = {
    id: number
}

type AuthMeType = {
    id: number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export const authAPI = {
    me () {
        return instance.get<ResponseType<AuthMeType>>('/auth/me')
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseType<DataLoginType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    }
}
