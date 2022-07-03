import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, Paper} from '@mui/material';
import {EditableSpan} from './Components/EditableSapn';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {changeTasksTC, deleteTasksTC} from './store/tasksReducer';
import {TaskStatuses, TaskType} from './api/tasksAPI';
import {AppDispatch} from './store/state/store';

type TaskPropsType = {
    task: TaskType
    todoListsID: string
}

export const Task = React.memo(({task, todoListsID}: TaskPropsType) => {

    const dispatch = useDispatch<AppDispatch>()

    const editTaskHandler = useCallback((newTitle: string) => {
        dispatch(changeTasksTC(todoListsID, task.id, {title: newTitle}));
    }, [todoListsID, task.id, dispatch])

    const removeTask = useCallback(() => {
        dispatch(deleteTasksTC(todoListsID, task.id))
    }, [dispatch, todoListsID, task.id])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const choice = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress
        dispatch(changeTasksTC(todoListsID, task.id, {...task, status: choice}))
    }, [task.id, todoListsID, dispatch])

    return <Paper elevation={2}
                  sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '7px',
                      ':hover': {
                          cursor: 'pointer',
                          backgroundColor: 'rgba(205,250,198,0.65)'
                      }
                  }}
                  style={task.status === TaskStatuses.Completed ?
                      {backgroundColor: 'rgba(205,250,198,0.65)'} :
                      {color: 'black'}}>
        <Checkbox
            color="success"
            onChange={changeTaskStatus}
            checked={task.status === TaskStatuses.Completed}/>
        <EditableSpan title={task.title} callback={editTaskHandler}/>
        <IconButton onClick={removeTask}><Delete/></IconButton>
    </Paper>
})


