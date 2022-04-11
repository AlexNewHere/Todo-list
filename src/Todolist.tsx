import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App'

type PropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist: FC<PropsType> = (props: PropsType) => {

    const [title, setTitle] = useState<string>('')

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (!!trimmedTitle) {
            props.addTask(trimmedTitle)
        }

        setTitle('')
    }

    const taskListItems = props.task.map((el) => {
        const removeTask = () => props.removeTask(el.id)
        return (
            <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={removeTask}>Х</button>
            </li>)
    })

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickAddTask()
    }

    const onClickAll = (filter : FilterValuesType) => {
        return ()=>props.changeFilter(filter)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeInput}
                       onKeyPress={onKeyPressInput}
                />

                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button onClick={onClickAll('all')}>All</button>
                <button onClick={onClickAll('active')}>Active</button>
                <button onClick={onClickAll('comleted')}>Completed</button>
            </div>
        </div>
    );
};



