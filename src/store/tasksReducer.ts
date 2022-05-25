import {TaskStateType} from '../App';
import {v1} from 'uuid';

export type ActionsType = ReturnType<typeof removeTaskAC>  |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof AddTodolistAC>

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]:
                state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: '4', title: action.title, isDone: false}, ...state[action.todolistId]
        ]
            }
            case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(el=> el.id===action.taskId ? {...el, isDone: action.isDone} : el)
                    }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(el=> el.id===action.taskId ? {...el, title: action.title} : el)
            }
        case 'ADD-TODOLIST':
                return {...state, [action.todolistId]: []}

        default:
            throw new Error("I don't understand this type")
    }
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return  { type: 'REMOVE-TASK', todolistId: todolistId, taskId:taskId } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return { type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return { type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}

export const AddTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}

