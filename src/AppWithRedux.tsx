import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {FullInput} from './Components/FullInput';
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTitleAC,
    RemoveTodolistAC,
} from './store/todolistsReducer';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './store/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/state/store';
import {Dispatch} from 'redux';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TasksStateType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

 const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
 const todoLists = useSelector<AppRootStateType, Array<TasksStateType>>(state => state.todoLists)
const dispatch = useDispatch<Dispatch>()
    const editTodoList = (todolistId: string, newTitle: string) => {
        dispatch(ChangeTitleAC(todolistId, newTitle))
    }

    const addTodoList = (title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }

    function removeTask(todolistId: string, taskID: string) {
        dispatch(RemoveTaskAC(todolistId, taskID))
    }

    function addTask(todolistId: string, title: string) {
        dispatch(AddTaskAC(todolistId, title))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatch(ChangeFilterAC(todolistId, value))
    }

    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, newTitle))
    }

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>

                <Grid container style={{padding: '15px'}}>
                    <FullInput callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el) => {

                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === 'active') {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === 'completed') {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: '15px'}}>
                                    <Todolist

                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        editTodoList={editTodoList}
                                        editTask={editTask}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
