import {v1} from 'uuid';
import {FilterValuesType, TasksStateType} from '../AppWithRedux';

type TodolistAC = ReturnType<typeof RemoveTodolistAC>  |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof ChangeTitleAC> |
    ReturnType<typeof ChangeFilterAC>


export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState: Array<TasksStateType> = []


export const todolistsReducer = (state: Array<TasksStateType>=initialState, action: TodolistAC): Array<TasksStateType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId);
        case 'ADD-TODOLIST':
            return [{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
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
    return { type: 'ADD-TODOLIST', payload: {todolistId: v1(), title: newTodolistTitle}} as const
}
export const ChangeTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title: newTodolistTitle}} as const
}
export const ChangeFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: {id: todolistId, filter: newFilter}} as const
}
