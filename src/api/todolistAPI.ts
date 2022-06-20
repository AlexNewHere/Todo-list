import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "34a6ba5d-948d-420a-986a-4ade213dda25"
    }
})


type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>(
            `todo-lists`
        )
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(
            `todo-lists`,
            { title: title }
        )
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(
            `todo-lists/${todolistId}`,
            { title: title }
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(
            `todo-lists/${todolistId}`
        )
    },
}