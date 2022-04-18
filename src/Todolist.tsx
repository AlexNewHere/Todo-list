import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App'
import './App.css'

type PropsType = {
    title: string
    task: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, status: boolean) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist: FC<PropsType> = (props: PropsType) => {

    const [error, setError] = useState<boolean>(false)

    const [title, setTitle] = useState<string>('')

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (!!trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
            setTimeout(() => setError(false), 3000)
        }
        setTitle('')
    }

    const getTasksForRender = (task: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        let taskForRender
        switch (filter) {
            case 'comleted':
                taskForRender = task.filter(el => el.isDone)
                break
            case 'active':
                taskForRender = task.filter(el => !el.isDone)
                break
            default:
                taskForRender = task
        }
        return taskForRender
    }

    const taskForRender: Array<TaskType> = getTasksForRender(props.task, props.filter)

    const taskListItems = taskForRender.length ?
        taskForRender.map((el) => {
            const removeTask = () => props.removeTask(el.id)
            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, e.currentTarget.checked)
            const taskClasses = el.isDone ? 'is-done' : ''
            return (
                <li key={el.id}><input type="checkbox" checked={el.isDone} onChange={onChangeStatus}/>
                    <span className={taskClasses}>{el.title}</span>
                    <button onClick={removeTask}>Х</button>
                </li>)
        }) : <p>Нет задач</p>

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError(false)
    }
    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickAddTask()
    }
    const onClickAll = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    const allButtonClass = props.filter === 'all' ? 'active-filter' : ''
    const activeButtonClass = props.filter === 'active' ? 'active-filter' : ''
    const comletedButtonClass = props.filter === 'comleted' ? 'active-filter' : ''
    const inputErrorClass = error ? 'error' : 'input'

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeInput}
                       onKeyPress={onKeyPressInput}
                       className={inputErrorClass}
                />

                <button onClick={onClickAddTask}>+</button>
                {error && <div className="errorText">Title is error!!!</div>}
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button
                    className={allButtonClass}
                    onClick={onClickAll('all')}>All
                </button>

                <button
                    className={activeButtonClass}
                    onClick={onClickAll('active')}>Active
                </button>

                <button
                    className={comletedButtonClass}
                    onClick={onClickAll('comleted')}>Completed
                </button>
            </div>
        </div>
    );
};



