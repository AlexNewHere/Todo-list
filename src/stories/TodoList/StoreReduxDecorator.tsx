import {tasksReducer} from '../../store/tasksReducer';
import {todolistsReducer} from '../../store/todolistsReducer';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import { v1 } from 'uuid';
import {AppRootStateType} from '../../store/state/store';
import {Provider} from 'react-redux';
import React from 'react';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: ()=> React.ReactNode) => <Provider store={storyBookStore}>{storyFn()}</Provider>