import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string;
    callback: (newTitle: string) => void
};

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [newTitle, setTitle] = useState<string>(props.title)

    const onDoubleClickHandler = () => {
        setEditMode(!editMode);
        props.callback(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                size={'small'}
                value={newTitle}
                onChange={onChangeHandler}
                autoFocus
                onBlur={onDoubleClickHandler} />
            : <span onDoubleClick={onDoubleClickHandler}> {props.title} </span>
    );
};

