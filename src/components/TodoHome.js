import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import AddNote from './AddNote'
import Note from './Note'
import Search from './Search'

//function to convert date to format 
function convertDate(dateObj) {
    let year = dateObj.getFullYear();

    let month = dateObj.getMonth();
    month = ('0' + month).slice(-2);
    // To make sure the month always has 2-character-formate. For example, 1 => 01, 2 => 02

    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    // To make sure the date always has 2-character-formate

    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    // To make sure the hour always has 2-character-formate

    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    // To make sure the minute always has 2-character-formate

    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
    // To make sure the second always has 2-character-formate

    return `${year}/${month}/${date} ${hour}:${minute}:${second}`
}

const TodoHome = () => {
    const [noteList, setnotesList] = useState([]);
    const [searchText, setsearchText] = useState('');
    const [filterText, setfilterText] = useState('');

    // update existing not
    const updateNote = (note) => {
        setsearchText('');
        noteList
            .filter((oldNote) => oldNote.id === note.id)
            .map((oldNote) => {
                oldNote.todoMessage = note.todoMessage;
                oldNote.updatedDate = note.updatedDate;
                return oldNote;
            })
        setnotesList(noteList);
    }

    //update note as done
    const updateNoteDone = (note) => {
        setsearchText('');
        noteList
            .filter((oldNote) => oldNote.id === note.id)
            .map((oldNote) => oldNote.isDone = true)
        setnotesList(noteList);
    }

    // add notes to list
    const addNewNote = (note) => {
        setsearchText('');
        const newNote = {
            ...note,
            id: noteList.length,
            createdDate: convertDate(note.createdDate)
        }
        setnotesList((prev) => {
            return [...prev, newNote];
        })
    }

    //delete notes from list
    const deleteNote = (id) => {
        setnotesList(noteList.filter((note) => {
            return note.id !== id;
        }))
    }

    return (
        <>
            <Search searchText={searchText} setsearchText={setsearchText} setfilterText={setfilterText} />
            <br />
            <Grid container spacing={4}>
                {
                    noteList
                        .filter((notes) => notes.todoMessage.toLowerCase().includes(searchText.toLowerCase()))
                        .filter((oldNote) => {
                            if (filterText === 'done') {
                                return oldNote.isDone === true
                            }
                            return true;
                        })
                        .sort((a, b) => {
                            if (filterText === 'cdate') {
                                return b.createdDate - a.createdDate;
                            } else {
                                return b.updatedDate - a.updatedDate;
                            }

                        })
                        .map((todo) =>
                            <Note
                                todo={todo}
                                key={todo.id}
                                deleteNote={deleteNote}
                                updateNote={updateNote}
                                updateNoteDone={updateNoteDone} />
                        )
                }
                <AddNote addNewNote={addNewNote} />
            </Grid>
        </>
    )
}

export default TodoHome
