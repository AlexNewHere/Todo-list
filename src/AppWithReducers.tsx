import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {FullInput} from './Components/FullInput';
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTitleAC,
    RemoveTodolistAC, TodolistAC,
    todolistsReducer
} from './store/todolistsReducer';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './store/tasksReducer';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TasksStateType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    const editTodoList = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(ChangeTitleAC(todolistId, newTitle))
    }

    const addTodoList = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const removeTodolist = (todolistId: string) => {
        dispatchToTodolists(RemoveTodolistAC(todolistId))
    }

    function removeTask(todolistId: string, taskID: string) {
        dispatchToTasks(RemoveTaskAC(todolistId, taskID))
    }

    function addTask(todolistId: string, title: string) {
        dispatchToTasks(AddTaskAC(todolistId, title))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatchToTasks(ChangeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchToTodolists(ChangeFilterAC(todolistId, value))
    }

    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(ChangeTaskTitleAC(todolistId, taskId, newTitle))
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
                            <Grid item>
                                <Paper elevation={3} style={{padding: '15px'}}>
                                    <Todolist
                                        key={el.id}
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

export default AppWithReducers;
