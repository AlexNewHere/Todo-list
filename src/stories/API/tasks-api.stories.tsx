import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {taskAPI} from '../../api/tasksAPI';

export default {
    title: 'API-tasks'
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "34a6ba5d-948d-420a-986a-4ade213dda25"
    }

})


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ='9adf40fe-e734-4532-9149-1017d6660c2f'
        taskAPI.getTasks(todolistId)
           .then(res=> {
               setState(res.data)
           })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ='9adf40fe-e734-4532-9149-1017d6660c2f'
        taskAPI.createTasks(todolistId, 'Buy ice creme')
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTasksName = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ='9adf40fe-e734-4532-9149-1017d6660c2f'
        const taskId = 'd2446ea4-ffc6-411c-8c54-00ffdb2c021d'
        taskAPI.updateTasks(todolistId, taskId, 'Buy more ice creme')
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId ='9adf40fe-e734-4532-9149-1017d6660c2f'
        const taskId = 'd2446ea4-ffc6-411c-8c54-00ffdb2c021d'
        taskAPI.deleteTasks(todolistId, taskId)
            .then(res=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

