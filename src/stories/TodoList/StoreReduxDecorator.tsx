import React from 'react';
//
// import {tasksReducer} from '../../store/tasksReducer';
// import {todolistsReducer} from '../../store/todolistsReducer';
// import {combineReducers, legacy_createStore as createStore} from 'redux';
// import {v1} from 'uuid';
// import {AppRootStateType} from '../../store/state/store';
// import {Provider} from 'react-redux';
// import {TaskPriorities, TaskStatuses} from '../../api/tasksAPI';
//
// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todoLists: todolistsReducer
// })
//
// const initialGlobalState: AppRootStateType = {
//     todoLists: [
//         {
//             id: 'todolistId1',
//             title: 'What to learn',
//             filter: 'all',
//             addedDate: '',
//             order: 0
//         },
//
//     ],
//     tasks: {
//         ['todolistId1']: [
//             {
//                 id: '1',
//                 title: 'HTML&CSS',
//                 status: TaskStatuses.New,
//                 todoListId: 'todolistId1',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 addedDate: '',
//                 description: '',
//                 priority: TaskPriorities.Low
//             },
//
//         ],
//         ['todolistId2']: [
//             {
//                 id: v1(),
//                 title: 'Milk',
//                 status: TaskStatuses.New,
//                 todoListId: 'todolistId2',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 addedDate: '',
//                 description: '',
//                 priority: TaskPriorities.Low
//
//             },
//
//         ]
//     }
// }
//
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
//
// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider
//     store={storyBookStore}>{storyFn()}</Provider>