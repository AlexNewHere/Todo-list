import {instance} from './instanceAPI';


type TaskType = {
    description: string
    order: number
    addedDate: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    title: string
    completed: boolean
}

export type ResponseType<D={}> = {
    resultCode: number
    fieldsErrors: Array<string>
    data: D
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<TaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks`,
            {title: title}
        )
    },
    updateTasks(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title}
        )
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
    },
}