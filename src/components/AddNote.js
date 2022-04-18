import { Button, Card, CardActions, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    root: {
        '& .MuiTextField-root': {
            width: '100%'
        },
        flexGrow: 1,
        width: 275,
        height: 250,
        backgroundColor: 'yellow',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 14
    },
    noteAction: {
        justifyContent: 'space-between'
    },
    textarea: {

    }
});

const AddNote = ({ addNewNote }) => {

    //state declaration
    const [notes, setnotes] = useState('');
    const classes = useStyles();

    //note limit 
    const characterLimit = 100;

    //validations
    const valiDateNote = (e) => {
        const noteval = e.target.value.trim().length;
        if (noteval > 0 && noteval <= characterLimit) {
            setnotes(e.target.value)
        }
    }

    //add note to NoteList component
    const addNote = () => {
        if (notes.trim().length > 0) {
            const newNote = {
                todoMessage: notes,
                createdDate: new Date(),
                updatedDate: new Date(),
                isDone: false
            }
            addNewNote(newNote);
            setnotes('');
        } else {
            alert('Please enter notes');
        }

    }

    return (
        <Grid item >
            <form noValidate autoComplete="off">
                <Card className={classes.root} variant="outlined">
                    <CardContent>

                        <TextField className={classes.textarea}
                            id="standard-multiline-static"
                            label="Add Notes"
                            multiline
                            rows={7}
                            value={notes}
                            placeholder="Type here to add notes"
                            onChange={valiDateNote}
                        />

                    </CardContent>
                    <CardActions className={classes.noteAction}>
                        <Button variant='contained' color='primary' onClick={addNote}
                            startIcon={<AddIcon />}>Save</Button>

                        <Typography variant='caption' fontSize='2px'>
                            {characterLimit - notes.length} characters remaining
                        </Typography>
                    </CardActions>
                </Card>
            </form>
        </Grid>
    )
}

export default AddNote
