import React, {useCallback} from 'react';
import {FullInput} from './Components/FullInput';
import {EditableSpan} from './Components/EditableSapn';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store/state/store';
import {TasksToDoType} from './AppWithRedux';
import {ChangeFilterAC, ChangeTitleAC, RemoveTodolistAC} from './store/todolistsReducer';
import {AddTaskAC} from './store/tasksReducer';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todoLists: TasksToDoType
}

export const Todolist: React.FC<PropsType> = React.memo(({todoLists}) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoLists.id])
    const dispatch = useDispatch<Dispatch>()

    if (todoLists.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (todoLists.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    const onAllClickHandler = () => dispatch(ChangeFilterAC(todoLists.id, 'all'));
    const onActiveClickHandler = () => dispatch(ChangeFilterAC(todoLists.id, 'active'));
    const onCompletedClickHandler = () => dispatch(ChangeFilterAC(todoLists.id, 'completed'));

    const removeTodolistHandler = useCallback(() => {
        dispatch(RemoveTodolistAC(todoLists.id));
    }, [])
    const addTaskHandler = useCallback((title: string) => {
        dispatch(AddTaskAC(todoLists.id, title));
    }, [])
    const changeTodoTitle = useCallback((newTitle: string) => {
        dispatch(ChangeTitleAC(todoLists.id, newTitle));
    }, [todoLists.title])

    return (
        <div>
            <h3>
                <EditableSpan title={todoLists.title} callback={changeTodoTitle}/>
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </h3>
            <div>
                <FullInput callback={addTaskHandler}/>
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

