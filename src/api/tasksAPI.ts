import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '34a6ba5d-948d-420a-986a-4ade213dda25'
    }
})

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