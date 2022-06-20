import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../../api/todolistAPI';

export default {
    title: 'API'
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "34a6ba5d-948d-420a-986a-4ade213dda25"
    }

})


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
           .then(res=> {
               setState(res.data[0])
           })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('New post')
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cc6048ed-6d79-4313-9a01-300c09df3285'
        todolistAPI.updateTodolist(todolistId, 'change title')
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'bcedb343-64a7-48e4-bd99-a956f7f9ddc3'
        todolistAPI.deleteTodolist(todolistId)
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

