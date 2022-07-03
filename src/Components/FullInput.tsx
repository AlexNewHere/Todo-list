import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';
import {Add} from '@mui/icons-material';

type FullInputType = {
    callback: (title: string) => void
    disabled?: boolean
}

export const FullInput = React.memo((props: FullInputType) => {


        let [title, setTitle] = useState<string>('')
        let [error, setError] = useState<string | null>(null)

        const addTask = () => {
            if (title.trim() !== '') {
                props.callback(title.trim());
                setTitle('');
            } else {
                setError('Title is required');
            }
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null);
            }
            if (e.key === 'Enter') {
                addTask();
            }
        }

        return (
            <div>
                <TextField
                    style={{paddingBottom: '10px'}}
                    size={'small'}
                    id="outlined-basic"
                    label={!error ? 'Enter text' : `${error}`}
                    variant="outlined"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error={!!error}
                />
                <Button variant={'contained'} style={{minWidth: '25px', height: '35px'}}
                        onClick={addTask}
                        disabled={props.disabled}>
                    <Add/>
                </Button>
            </div>
        );
    }
)

