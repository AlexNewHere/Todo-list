import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../api/todolistAPI';
import {AppThunk} from './state/store';

export type TodolistAC = ReturnType<typeof RemoveTodolistAC>  |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof ChangeTitleAC> |
    ReturnType<typeof ChangeFilterAC> |
    ReturnType<typeof setTodolistAC>

export let todolistID1 = v1();
export let todolistID2 = v1();

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TasksToDoType = TodolistType & {
       filter: FilterValuesType
}

const initialState: Array<TasksToDoType> = []

export const todolistsReducer = (state: Array<TasksToDoType>=initialState, action: TodolistAC): Array<TasksToDoType> => {
    switch (action.type) {
        case 'SET-TODOLIST':
            return action.payload.todos.map(el => ({
                ...el,
                filter: 'all'
            }))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId);
        case 'ADD-TODOLIST':
            return [{id: action.payload.todolistId,
                title: action.payload.title, filter: 'all',
                addedDate: action.payload.addedDate,
                order: action.payload.order}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        default:
            return state
    }
};

export const RemoveTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: {todolistId}} as const
}
export const AddTodolistAC = (newTodolistTitle: string) => {
    return { type: 'ADD-TODOLIST', payload: {todolistId: v1(), title: newTodolistTitle, addedDate: '', order: 0}} as const
}
export const ChangeTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title: newTodolistTitle}} as const
}
export const ChangeFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: {id: todolistId, filter: newFilter}} as const
}
export const setTodolistAC = (todos: Array<TodolistType>) => {
    return { type: 'SET-TODOLIST', payload: {todos}} as const
}

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
        const res = await todolistAPI.getTodolist()
            dispatch(setTodolistAC(res.data))
}