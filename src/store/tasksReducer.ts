import {setTodolistAC} from './todolistsReducer';
import {taskAPI, TaskStatuses, TaskType, UpdateTasksType} from '../api/tasksAPI';
import {AppThunk} from './state/store';
import {setAppStatusAC} from '../store/appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';

export type ActionsType = |
    ReturnType<typeof ChangeTaskStatusAC> |
    ReturnType<typeof setTodolistAC> |
    ReturnType<typeof setTasksAC>

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            const stateCopy = {...state}
            action.payload.todos.forEach((el) => {
                stateCopy[el.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.taskId ?
                        {...el, status: action.payload.status} : el)
            }
        default:
            return state
    }
}

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, status}} as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', payload: {tasks, todolistId}} as const
}

export const fetchTasksTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await taskAPI.getTasks(todolistId)
        let tasks = res.data.items
        dispatch(setTasksAC(tasks, todolistId))
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}
export const createTasksTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await taskAPI.createTasks(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(fetchTasksTC(todolistId))
        } else {
            handleServerAppError<TaskType>(res.data, dispatch)
        }
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}

export const deleteTasksTC = (todolistId: string, id: string): AppThunk => async dispatch => {
    await taskAPI.deleteTasks(todolistId, id)
    dispatch(fetchTasksTC(todolistId))
}

export const changeTasksTC = (todolistId: string, id: string, model: UpdateTasksType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await taskAPI.updateTasks(todolistId, id, model)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(fetchTasksTC(todolistId))
        } else {
            handleServerAppError<TaskType>(res.data, dispatch)
        }
    } catch (error) {
        let msg = (error as Error)
        handleServerNetworkError(msg, dispatch)
    }
}


