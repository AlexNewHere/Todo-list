import {v1} from 'uuid';
import {AddTodolistAC} from './todolistsReducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/tasksAPI';

export type ActionsType = ReturnType<typeof RemoveTaskAC> |
    ReturnType<typeof AddTaskAC> |
    ReturnType<typeof ChangeTaskStatusAC> |
    ReturnType<typeof ChangeTaskTitleAC> |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof RemoveTodolistAC>

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
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
                    [{
                        id: v1(), title: action.payload.title,
                        status: TaskStatuses.New,
                        todoListId: action.payload.todolistId,
                        startDate: '',
                        deadline: '',
                        order: 0,
                        addedDate: '',
                        description: '',
                        priority: TaskPriorities.Low
                    }, ...state[action.payload.todolistId]
                    ]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId ?
                        {...el, status: action.payload.status} : el)
            }
        case 'CHANGE-TASK-TITLE':

            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId ?
                        {...el, title: action.payload.title} : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}

        case 'REMOVE-TODOLIST':
            let {[action.payload.todolistId]: [], ...rest} = {...state}
            return rest

        default:
            return state
    }
}
export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId: todolistId, taskId: taskId}} as const
}
export const AddTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, status}} as const
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}

// export const AddTodolistAC = (title: string) => {
//     return {type: 'ADD-TODOLIST', payload: {todolistId: v1(), title}} as const
// }

export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {todolistId}} as const
}

