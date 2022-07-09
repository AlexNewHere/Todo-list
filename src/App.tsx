import React, {useEffect} from 'react';
import {HeadBar} from './Components/HeadBar';
import {Navigate, Route, Routes} from 'react-router-dom';
import AppWithRedux from './AppWithRedux';
import {Login} from './Components/Login';
import Container from '@mui/material/Container';
import {CircularProgress} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from './store/state/store';
import {initializeAppTC} from './store/appReducer';

const App = () => {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <Container fixed>
            <HeadBar/>
            <Routes>
                <Route path={'/'} element={<AppWithRedux/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/404'} element={<div><h1>404: PAGE NOT FOUND</h1></div>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </Container>
    );
};

export default App;