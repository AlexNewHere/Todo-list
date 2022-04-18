import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'comleted'

function App() {

    const todoListTitle: string = 'What to learn'

    const [task_1, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: true},
        {id: v1(), title: 'react', isDone: false},
        {id: v1(), title: 'NodeJS', isDone: false}
    ])

    const removeTask = (taskID: string) => {
        setTask(task_1.filter(el => el.id !== taskID))
    }

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTask([newTask, ...task_1])
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
       setTask(task_1.map(el => (el.id === taskID)? {...el, isDone: isDone} : el))
    }


    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                task={task_1}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
              />
        </div>
    );
}

export default App;
