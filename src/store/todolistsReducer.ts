import {todolistAPI, TodolistType} from '../api/todolistAPI';
import {AppThunk} from './state/store';
import {RequestStatusType, setAppStatusAC} from '../store/appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';

export type TodolistAC = |
    ReturnType<typeof ChangeTodolistEntityStatusAC> |
    ReturnType<typeof ChangeFilterAC> |
    ReturnType<typeof setTodolistAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TasksToDoType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TasksToDoType> = []

export const todolistsReducer = (state: Array<TasksToDoType> = initialState, action: TodolistAC): Array<TasksToDoType> => {
    switch (action.type) {
        case 'SET-TODOLIST':
            return action.payload.todos.map(el => ({...el, filter: 'all', entityStatus: 'succeeded'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(el => el.id === action.payload.id ? {
                ...el,
                entityStatus: action.payload.entityStatus
            } : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.payload.id ? {
                ...el,
                filter: action.payload.filter
            } : el)
        default:
            return state
    }
};

export const ChangeTodolistEntityStatusAC = (todolistId: string, todoListStatus: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        payload: {id: todolistId, entityStatus: todoListStatus}
    } as const
}
export const ChangeFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id: todolistId, filter: newFilter}
    } as const
}
export const setTodolistAC = (todos: Array<TodolistType>) => {
    return {type: 'SET-TODOLIST', payload: {todos}} as const
}

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistAPI.getTodolist()
        dispatch(setTodolistAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}

export const createTodolistsTC = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(fetchTodolistsTC())
        } else {
            handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
        }
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}

export const deleteTodolistsTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(ChangeTodolistEntityStatusAC(todolistId, 'loading'))
    await todolistAPI.deleteTodolist(todolistId)
    dispatch(fetchTodolistsTC())
}
export const changeTodolistsTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistAPI.updateTodolist(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(fetchTodolistsTC())
        } else {
            handleServerAppError<{}>(res.data, dispatch)
        }
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}
