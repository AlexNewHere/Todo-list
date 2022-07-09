import React, {useCallback, useEffect} from 'react';
import {FullInput} from './Components/FullInput';
import {EditableSpan} from './Components/EditableSapn';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from './store/state/store';
import {
    ChangeFilterAC,
    changeTodolistsTC,
    deleteTodolistsTC,
    TasksToDoType
} from './store/todolistsReducer';
import {createTasksTC, fetchTasksTC} from './store/tasksReducer';
import {Task} from './Task';
import {TaskStatuses, TaskType} from './api/tasksAPI';

type PropsType = {
    todoLists: TasksToDoType
}

export const Todolist: React.FC<PropsType> = React.memo(({todoLists}) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoLists.id])
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(fetchTasksTC(todoLists.id))
    }, [todoLists,dispatch])

    if (todoLists.filter === 'active') {
        tasks = tasks.filter(t => t.status===TaskStatuses.New);
    }
    if (todoLists.filter === 'completed') {
        tasks = tasks.filter(t => t.status===TaskStatuses.Completed);
    }

    const onAllClickHandler = useCallback(() => dispatch(ChangeFilterAC(todoLists.id, 'all')), [dispatch, todoLists.id]);
    const onActiveClickHandler = useCallback(() => dispatch(ChangeFilterAC(todoLists.id, 'active')), [dispatch, todoLists.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(ChangeFilterAC(todoLists.id, 'completed')), [dispatch, todoLists.id]);

    const removeTodolistHandler = useCallback(() => {
        dispatch(deleteTodolistsTC(todoLists.id));
    }, [todoLists.id, dispatch])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(createTasksTC(todoLists.id, title));
    }, [todoLists.id, dispatch])

    const changeTodoTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistsTC(todoLists.id, newTitle));
    }, [todoLists.id, dispatch])

    return (
        <div>
            <h3>
                <EditableSpan title={todoLists.title} callback={changeTodoTitle}/>
                <IconButton onClick={removeTodolistHandler} disabled={todoLists.entityStatus==='loading'}><Delete/></IconButton>
            </h3>
            <div>
                <FullInput callback={addTaskHandler} disabled={todoLists.entityStatus==='loading'}/>
            </div>
            <div>
                <Button
                    color={todoLists.filter === 'all' ? 'primary' : 'secondary'}
                    variant={todoLists.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={todoLists.filter === 'active' ? 'error' : 'secondary'}
                    variant={todoLists.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={todoLists.filter === 'completed' ? 'success' : 'secondary'}
                    variant={todoLists.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
            <div>
                {tasks.map(task =>
                    <Task
                        key={task.id}
                        task={task}
                        todoListsID={todoLists.id}
                    />)
                }
            </div>
        </div>)
})

