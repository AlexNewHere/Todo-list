import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Task} from '../../Task';
import {ReduxStoreProviderDecorator} from './StoreReduxDecorator';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/state/store';
import {TaskType} from '../../api/tasksAPI';

export default {
    title: 'Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],

} as ComponentMeta<typeof Task>;

const TaskWithRedux= () => {
    const task= useSelector<AppRootStateType, TaskType> (state=> state.tasks['todolistId1'].filter((t=>t.id==='1'))[0])
    return <Task task={task} todoListsID={'todolistId1'}/>
}

const Template: ComponentStory<typeof TaskWithRedux> = () => <TaskWithRedux/>;

export const TaskOnStory = Template.bind({});
TaskOnStory.args = {

};



