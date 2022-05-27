import {FilterValuesType, TasksStateType} from '../App';
import {v1} from 'uuid';

type TodolistAC = ReturnType<typeof RemoveTodolistAC>  |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof ChangeTitleAC> |
    ReturnType<typeof ChangeFilterAC>


export const todolistsReducer = (state: Array<TasksStateType>, action: TodolistAC): Array<TasksStateType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id);
        case 'ADD-TODOLIST':

            return [{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        default:
            throw new Error('I dont understand this type')
    }
};

export const RemoveTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}
export const AddTodolistAC = (newTodolistTitle: string) => {
    return { type: 'ADD-TODOLIST', payload: {title: newTodolistTitle, todolistId: v1()}} as const
}
export const ChangeTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title: newTodolistTitle}} as const
}
export const ChangeFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: {id: todolistId, filter: newFilter}} as const
}
