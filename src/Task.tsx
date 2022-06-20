import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, Paper} from '@mui/material';
import {EditableSpan} from './Components/EditableSapn';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './store/tasksReducer';
import {TaskStatuses, TaskType} from './api/tasksAPI';


type TaskPropsType = {
    task: TaskType
    todoListsID: string
}

export const Task = React.memo ( ({task, todoListsID}: TaskPropsType) => {

    const dispatch = useDispatch<Dispatch>()

    const editTaskHandler = useCallback((newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todoListsID, task.id, newTitle));
    }, [todoListsID, task.id])
    const removeTask = useCallback(() => {
        dispatch(RemoveTaskAC(todoListsID, task.id))
    }, [])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const choice = e.currentTarget.checked? TaskStatuses.Completed : TaskStatuses.InProgress
        dispatch(ChangeTaskStatusAC(todoListsID, task.id, choice))
    }, [ task.id, todoListsID])

    return <Paper elevation={2}
                  sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '7px',
                      ':hover': {cursor: 'pointer', backgroundColor: 'rgba(205,250,198,0.65)'}}}
                  style={task.status===TaskStatuses.Completed?
                      {backgroundColor: 'rgba(205,250,198,0.65)'}:
                      {color: 'black'}}>
        <Checkbox
            color="success"
            onChange={changeTaskStatus}
            checked={task.status===TaskStatuses.Completed}/>
        <EditableSpan title={task.title} callback={editTaskHandler}/>
        <IconButton onClick={removeTask}><Delete/></IconButton>
    </Paper>
})


