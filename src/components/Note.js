import { Card, CardActions, CardContent, Divider, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    doneChange: {
        backgroundColor: 'green',
        color: 'white',
    },
    upcoming: {
        backgroundColor: 'yellow',
        color: 'black',
    },
    root: {
        '& .MuiTextField-root': {
            width: '100%'
        },
        flexGrow: 1,
        width: 275,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 14,
        overflowWrap: 'break-word'
    },
    noteAction: {
        justifyContent: 'space-between'
    }
});


const Note = ({ todo, deleteNote, updateNote, updateNoteDone }) => {

    const [todoDone, settodoDone] = useState(false);
    const [isEdit, setisEdit] = useState(false);

    //state declaration
    const [notes, setnotes] = useState('');

    //note limit 
    const characterLimit = 100;

    const todoMessage = todo.todoMessage;
    const createdDate = todo.createdDate;
    const classes = useStyles();

    //validations
    const valiDateNote = (e) => {
        const noteval = e.target.value.trim().length;
        if (noteval > 0 && noteval <= characterLimit) {
            setnotes(e.target.value)
        }
    }

    const updateNoteHandler = () => {
        const updateNoteVal = {
            todoMessage: notes,
            updatedDate: new Date(),
            id: todo.id
        }
        updateNote(updateNoteVal)
        setisEdit(false);
    }

    const doneHandler = () => {
        updateNoteDone(todo)
        settodoDone(true);
    }

    return (
        <Grid item>
            <Card className={`${todo.isDone === true ? classes.doneChange : classes.upcoming} ${classes.root} `} variant="outlined">
                <CardContent>
                    {isEdit ?
                        <TextField className={classes.textarea}
                            id="standard-multiline-static"
                            label="Edit Notes"
                            multiline
                            rows={7}
                            defaultValue={todoMessage}
                            placeholder="Type here to add notes"
                            onChange={valiDateNote}
                        /> :
                        <div>
                            <Typography variant="caption" component="p" gutterBottom>
                                {createdDate}
                            </Typography>
                            <Divider />
                            <br />
                            <Typography className={classes.title} gutterBottom>
                                {todoMessage}
                            </Typography>
                        </div>
                    }
                </CardContent>
                <CardActions className={classes.noteAction}>
                    {todoDone === false &&
                        <IconButton color='inherit'>
                            {isEdit ?
                                <SaveIcon onClick={updateNoteHandler} /> :
                                <EditIcon onClick={() => setisEdit(true)} />}
                        </IconButton>}
                    <IconButton color='inherit'>
                        {isEdit === false ?
                            !todoDone ? <DoneIcon onClick={doneHandler} />
                                : <CheckCircleIcon />
                            : <CancelIcon onClick={() => setisEdit(false)} />}
                    </IconButton>
                    <IconButton onClick={() => deleteNote(todo.id)} color='inherit'>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid >
    )
}

export default Note
