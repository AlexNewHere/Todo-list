import React, {ChangeEvent, useEffect, useState} from 'react'
import {taskAPI} from '../../api/tasksAPI';

export default {
    title: 'API-tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9adf40fe-e734-4532-9149-1017d6660c2f'
        taskAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [task, setTask] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value)
    }
    const onClickHandler = () => {
            const todolistId = '9adf40fe-e734-4532-9149-1017d6660c2f'
            taskAPI.createTasks(todolistId, task)
                .then(res => {
                    setState(res.data)
                    setTask('')
                })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={'name task'} onChange={onChangeHandler}/>
        <button onClick={onClickHandler}>add</button>
    </>
}
export const UpdateTasksName = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        const todolistId = '9adf40fe-e734-4532-9149-1017d6660c2f'
        const taskId = 'fe82842a-baed-483c-aa56-1554c574572c'

        const model = {
          title: 'HoHOHo'
        }
        taskAPI.updateTasks(todolistId, taskId, model)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '9adf40fe-e734-4532-9149-1017d6660c2f'
        const taskId = 'd2446ea4-ffc6-411c-8c54-00ffdb2c021d'
        taskAPI.deleteTasks(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

