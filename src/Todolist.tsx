import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {FullInput} from './Components/FullInput';
import {EditableSpan} from './Components/EditableSapn';
import {Button, Checkbox, IconButton, Paper} from '@mui/material';
import {Delete} from '@mui/icons-material';

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

    return (
        <div>
        <h3>
            <EditableSpan title={props.title} callback={changeTodoTitle}/>
            <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
        </h3>
        <div>

            <FullInput callback={addTaskHandler}/>

        </div>
        <div>
            <Button
                color={props.filter === 'all' ? 'primary' : 'secondary'}
                variant={props.filter === 'all' ? 'contained' : 'outlined'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                color={props.filter === 'active' ? 'error' : 'secondary'}
                variant={props.filter === 'active' ? 'contained' : 'outlined'}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                color={props.filter === 'completed' ? 'success' : 'secondary'}
                variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
        <div>
            {

                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <Paper elevation={2} key={t.id}
                                  sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '7px',
                                      ':hover': {cursor: 'pointer', backgroundColor: 'rgba(205,250,198,0.65)'}}}
                                  style={t.isDone?
                                      {backgroundColor: 'rgba(205,250,198,0.65)'}:
                                      {color: 'black'}}>

                        <Checkbox
                            color="success"
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(title) => editTaskHandler(t.id, title)}/>
                        <IconButton onClick={onClickHandler}><Delete/></IconButton>
                    </Paper>
                })
            }
        </div>

    </div>)
}
