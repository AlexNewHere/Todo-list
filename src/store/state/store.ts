import {combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from '../tasksReducer';
import {todolistsReducer} from '../todolistsReducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})
export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store