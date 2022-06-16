import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from '../../Components/EditableSapn';

export default {
    title: 'EditableSpan',
    component: EditableSpan,
    args: {title: 'hoho'},
    argTypes: {
        callback: {
            description: 'callback'
        }
    },

} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    callback: action('Editable value changed')
};

