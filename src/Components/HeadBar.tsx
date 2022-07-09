import {
    AppBar,
    Button,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@mui/material';
import {NavLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../store/state/store';
import {RequestStatusType} from '../store/appReducer';
import {ErrorSnackbar} from '../Components/ErrorSnackbar';
import {logoutTC} from '../store/authReducer';

export function HeadBar() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch<AppDispatch>()

    const logOutHandle = () => {
        dispatch(logoutTC())
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <NavLink to={'/'} style={{color: '#fff'}}><MenuIcon/></NavLink>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {
                        isLoggedIn ?
                            <Button color={'inherit'}
                                    onClick={logOutHandle}
                            >Log out</Button> :
                            <NavLink to={'/login'} style={{textDecoration: 'none'}}>
                                <Button color="inherit"
                                style={{color: '#fff'}}
                                >Log in</Button>
                            </NavLink>
                    }
                </Toolbar>
            </AppBar>
            <ErrorSnackbar/>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
        </>
    )
}