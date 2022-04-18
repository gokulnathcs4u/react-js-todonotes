import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));


const Search = ({ setsearchText, searchText, setfilterText }) => {

    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>

            <InputBase
                className={classes.input}
                placeholder="Search Todo Notes"
                value={searchText}
                onChange={(e) => { setsearchText(e.target.value) }}
                inputProps={{ 'aria-label': 'search todo notes' }}
            />
            <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>

            <Divider flexItem orientation='vertical' />

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Filter By:</InputLabel>
                <Select
                    label="Filter By"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => setfilterText(e.target.value)}
                >
                    <MenuItem value={'cdate'}>Created Date</MenuItem>
                    <MenuItem value={'udate'}>Updated Date</MenuItem>
                    <MenuItem value={'done'}>Done</MenuItem>
                </Select>
            </FormControl>
        </Paper>
    );
}

export default Search
