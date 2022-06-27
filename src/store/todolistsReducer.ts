import {todolistAPI, TodolistType} from '../api/todolistAPI';
import {AppThunk} from './state/store';

export type TodolistAC = |
    ReturnType<typeof ChangeTitleAC> |
    ReturnType<typeof ChangeFilterAC> |
    ReturnType<typeof setTodolistAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TasksToDoType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TasksToDoType> = []

export const todolistsReducer = (state: Array<TasksToDoType> = initialState, action: TodolistAC): Array<TasksToDoType> => {
    switch (action.type) {
        case 'SET-TODOLIST':
            return action.payload.todos.map(el => ({...el, filter: 'all'}))
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {
                ...el,
                title: action.payload.title
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

export const ChangeTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id: todolistId, title: newTodolistTitle}
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
    const res = await todolistAPI.getTodolist()
    dispatch(setTodolistAC(res.data))
}

export const createTodolistsTC = (title: string): AppThunk => async dispatch => {
    await todolistAPI.createTodolist(title)
    dispatch(fetchTodolistsTC())
}

export const deleteTodolistsTC = (todolistId: string): AppThunk => async dispatch => {
    await todolistAPI.deleteTodolist(todolistId)
    dispatch(fetchTodolistsTC())
}
export const changeTodolistsTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    await todolistAPI.updateTodolist(todolistId, title)
    dispatch(fetchTodolistsTC())
}
