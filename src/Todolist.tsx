import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {FullInput} from './Components/FullInput';
import {EditableSpan} from './Components/EditableSapn';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    editTodoList: (todolistId: string, newTitle: string) => void
    editTask: (todolistId: string, taskId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'completed');

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId);
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title);
    }
    const changeTodoTitle = (newTitle: string) => {
        props.editTodoList(props.todolistId, newTitle);
    }

    const editTaskHandler = (id: string, title: string) => {
        props.editTask(props.todolistId, id, title);
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callback={changeTodoTitle}/>
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <div>

            <FullInput callback={addTaskHandler}/>

        </div>
        <div className="styleButton">
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(title) => editTaskHandler(t.id, title)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

    </div>
}
