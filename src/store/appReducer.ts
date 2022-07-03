export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = string | null

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as ErrorStatusType
}

export type InitialStateLoadingType = typeof initialState
export type StatusACType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>

export const appReducer = (state: InitialStateLoadingType = initialState, action: StatusACType): InitialStateLoadingType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', payload: {status}} as const
}
export const setAppErrorAC = (error: ErrorStatusType) => {
    return {type: 'APP/SET-ERROR', payload: {error}} as const
}
