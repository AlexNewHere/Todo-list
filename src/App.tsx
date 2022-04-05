import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'comleted'

function App() {
    const todoListTitle: string = 'What to learn'

    const [task_1, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'TS', isDone: true},
        {id: v1(), title: 'react', isDone: false}
    ])

    const removeTask = (taskID: string) => {
        setTask(task_1.filter(el => el.id !== taskID))
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let taskForRender;
    switch (filter) {
        case 'comleted':
            taskForRender = task_1.filter(el => el.isDone === true)
            break
        case 'active':
            taskForRender = task_1.filter(el => el.isDone === false)
            break
        default: taskForRender=task_1
    }

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                task={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
