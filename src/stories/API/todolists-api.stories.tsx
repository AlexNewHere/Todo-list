import axios from 'axios'
import React, {useEffect, useState} from 'react'

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
       instance.get('todo-lists')
           .then(res=> {
               setState(res.data)
           })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        instance.post('todo-lists', {
            title: 'Create'
        })
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '2077d5eb-9978-492c-88eb-ee57c4ab3bde'
    useEffect(() => {
        instance.delete(`todo-lists/${todolistId}`)
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'bcedb343-64a7-48e4-bd99-a956f7f9ddc3'

    useEffect(() => {
        instance.put(`todo-lists/${todolistId}`, {
            title: 'change title'
        })
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

