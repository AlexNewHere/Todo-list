import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {FullInput} from './Components/FullInput';
import {
    AppBar,
    Button,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {
    createTodolistsTC,
    fetchTodolistsTC,
    TasksToDoType
} from './store/todolistsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {
    AppDispatch,
    AppRootStateType,
} from './store/state/store';

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TasksToDoType>>(state => state.todoLists)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
       dispatch(fetchTodolistsTC())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistsTC(title))
    }, [dispatch])

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
