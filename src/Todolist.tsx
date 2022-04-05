import React from 'react';
import {FilterValuesType} from './App'

type PropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskID: string)=>void
    changeFilter: (filter: FilterValuesType)=> void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const taskListItems = props.task.map((el) => {
        const removeTask = ()=>props.removeTask(el.id)
        return (
                <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={removeTask}>Хaw</button>
                </li>)
        }
    )
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('comleted')}>Completed</button>
            </div>
        </div>
    );
};



