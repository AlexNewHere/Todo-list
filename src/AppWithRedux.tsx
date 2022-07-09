import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {FullInput} from './Components/FullInput';
import {
    Grid,
    Paper,
} from '@mui/material';
import Container from '@mui/material/Container';
import {
    createTodolistsTC,
    fetchTodolistsTC,
    TasksToDoType
} from './store/todolistsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from './store/state/store';
import {Navigate} from 'react-router-dom';

function AppWithRedux() {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const todoLists = useSelector<AppRootStateType, Array<TasksToDoType>>(state => state.todoLists)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistsTC(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className="App">
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <FullInput callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el) => {
                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: '15px'}}>
                                    <Todolist
                                        todoLists={el}
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
