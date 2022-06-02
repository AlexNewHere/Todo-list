import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, Paper} from '@mui/material';
import {EditableSpan} from './Components/EditableSapn';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './store/tasksReducer';


type TaskPropsType = {
    task: TaskType
    todoListsID: string
}

export const Task = React.memo ( ({task, todoListsID}: TaskPropsType) => {

    const dispatch = useDispatch<Dispatch>()

    const editTaskHandler = useCallback(() => {
        dispatch(ChangeTaskTitleAC(todoListsID, task.id, task.title));
    }, [])
    const removeTask = useCallback(() => {
        dispatch(RemoveTaskAC(todoListsID, task.id))
    }, [])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatusAC(todoListsID, task.id, e.currentTarget.checked))
    }, [ task.id, todoListsID ])


    return <Paper elevation={2}
                  sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '7px',
                      ':hover': {cursor: 'pointer', backgroundColor: 'rgba(205,250,198,0.65)'}}}
                  style={task.isDone?
                      {backgroundColor: 'rgba(205,250,198,0.65)'}:
                      {color: 'black'}}>
        <Checkbox
            color="success"
            onChange={changeTaskStatus}
            checked={task.isDone}/>
        <EditableSpan title={task.title} callback={editTaskHandler}/>
        <IconButton onClick={removeTask}><Delete/></IconButton>
    </Paper>
})


