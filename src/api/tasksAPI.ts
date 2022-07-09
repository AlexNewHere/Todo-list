import {instance, ResponseType} from './instanceAPI';

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string | null
    order: number
    addedDate: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    title: string
}

type GetTasksType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

export type UpdateTasksType = {
    title?: string
    description?: string | null
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks`,
            {title: title}
        )
    },
    updateTasks(todolistId: string, taskId: string, model: UpdateTasksType) {
        return instance.put<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
    },
}