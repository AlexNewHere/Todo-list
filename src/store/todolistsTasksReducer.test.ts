import {TasksStateType, TaskStateType} from '../App';
import {AddTodolistAC, todolistsReducer} from './todolistsReducer';
import {tasksReducer} from './tasksReducer';


let startState: TaskStateType
let startTodolistsState: Array<TasksStateType>

beforeEach(()=> {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    startTodolistsState = []
})

test('ids should be equals', () => {

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})
