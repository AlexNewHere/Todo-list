import {TaskStateType} from '../App';
import {v1} from 'uuid';

export type ActionsType = ReturnType<typeof RemoveTaskAC> |
    ReturnType<typeof AddTaskAC> |
    ReturnType<typeof ChangeTaskStatusAC> |
    ReturnType<typeof ChangeTaskTitleAC> |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof RemoveTodolistAC>

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]:
                    [{id: '4', title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]
                ]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId ?
                        {...el, isDone: action.payload.isDone} : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId ?
                        {...el, title: action.payload.title} : el)
            }
        case 'ADD-TODOLIST':
            return {[action.payload.todolistId]: [], ...state}

        case 'REMOVE-TODOLIST':
            let {[action.payload.todolistId]: [], ...rest} = {...state}
            return rest

        default:
            throw new Error('I don\'t understand this type')
    }
}
export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: { todolistId: todolistId, taskId: taskId}} as const
}
export const AddTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', payload:  {todolistId, taskId, isDone}} as const
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}

export const AddTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', payload: {title, todolistId: v1()}} as const
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {todolistId}} as const
}

