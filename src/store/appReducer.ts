import {authAPI, DataLoginType} from '../api/authAPI';
import {AppThunk} from '../store/state/store';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {setIsLoggedInAC} from '../store/authReducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = string | null

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as ErrorStatusType,
    isInitialized: false
}

export type InitialStateLoadingType = typeof initialState
export type StatusACType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>

export const appReducer = (state: InitialStateLoadingType = initialState, action: StatusACType): InitialStateLoadingType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZE':
            return {...state, isInitialized: action.payload.isInitialized}
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
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {type: 'APP/SET-INITIALIZE', payload: {isInitialized}} as const
}

export const initializeAppTC = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setIsInitializedAC(true))
        } else {
            handleServerAppError<DataLoginType>(res.data, dispatch)
            dispatch(setIsInitializedAC(true))
        }
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}