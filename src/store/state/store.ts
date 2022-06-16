import {combineReducers, legacy_createStore as createStore} from 'redux'
import {tasksReducer} from '../tasksReducer';
import {todolistsReducer} from '../todolistsReducer';
import {devToolsEnhancer} from '@redux-devtools/extension';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export const store = createStore(rootReducer, devToolsEnhancer())

export type AppRootStateType = ReturnType<typeof rootReducer>

