import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {FullInput} from '../../Components/FullInput';
import {action} from '@storybook/addon-actions';

export default {
    title: 'FullInput',
    component: FullInput,
    argTypes: {
        callback: {
            description: 'callback'
        }
    },

} as ComponentMeta<typeof FullInput>;

const Template: ComponentStory<typeof FullInput> = (args) => <FullInput {...args} />;

export const FullInputStory = Template.bind({});
FullInputStory.args = {
    callback: action('Button should clicked')
};

