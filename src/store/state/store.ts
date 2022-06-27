import {combineReducers, legacy_createStore as createStore, compose, applyMiddleware} from 'redux'
import {ActionsType, tasksReducer} from '../tasksReducer';
import {TodolistAC, todolistsReducer} from '../todolistsReducer';
import {devToolsEnhancer} from '@redux-devtools/extension';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const composedEnhancers = compose(applyMiddleware(thunk), devToolsEnhancer())

export const store = createStore(rootReducer, undefined, composedEnhancers)

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = TodolistAC | ActionsType

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionType
    >

export type AppDispatch = ThunkDispatch<AppRootStateType, undefined, AppActionType>