import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


function App() {

    const task_1: Array<TaskType> = [
        {id: 0, title: 'HTML', isDone: true},
        {id: 1, title: 'TS', isDone: true},
        {id: 2, title: 'react', isDone: false}
    ]
    const task_2: Array<TaskType> = [
        {id: 0, title: 'Rock', isDone: true},
        {id: 1, title: 'DubStep', isDone: true},
        {id: 2, title: 'Chillout', isDone: false},
        {id: 3, title: 'Pop', isDone: true}
    ]
    return (
        <div className="App">
            <Todolist
                title="What to learn 1?"
                task={task_1} />
            <Todolist
                title="Songs"
                task={task_2}/>
            <Todolist
                title="Books"
                task={task_1}/>
        </div>
    );
}

export default App;
