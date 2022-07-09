import {setAppStatusAC} from './appReducer';
import {AppActionType, AppThunk} from './state/store';
import {authAPI, DataLoginType, LoginParamsType} from '../api/authAPI';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError<DataLoginType>(res.data, dispatch)
        }
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(false))
        } else {
            handleServerAppError<{}>(res.data, dispatch)
        }
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}




export type ActionsAuthType = ReturnType<typeof setIsLoggedInAC>