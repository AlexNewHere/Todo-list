import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string;
    callback: (newTitle: string) => void
};

export const EditableSpan = React.memo(({title, callback}: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [newTitle, setTitle] = useState<string>(title)

    const onDoubleClickHandler = () => {
        setEditMode(!editMode);
        callback(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    console.log('render')
    return (
        editMode
            ? <TextField
                size={'small'}
                value={newTitle}
                onChange={onChangeHandler}
                autoFocus
                onBlur={onDoubleClickHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}> {title} </span>
    );
})

