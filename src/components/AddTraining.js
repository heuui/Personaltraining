import React, { useState } from "react";
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function AddTraining({ addTraining, params }) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        activity: '', 
        duration: '',
        customer: params.value
    })
    const [customer, setCustomer] = useState({
        name: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            name: params.data.firstname + " " + params.data.lastname
        })
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        addTraining(training);
        setTraining({
            date: '',
            activity: '',
            duration: '',
            customer: ''
        })
    }

    const inputChanged = (event, data) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return(
        <>
        <div>
        <IconButton onClick={handleClickOpen}>
            <AddCircleIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Training ({customer.name})</DialogTitle>
            <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Date"
                    value={training.date}
                    inputFormat="dd/MM/yyyy HH:mm"
                    mask="__.__.____ __:__"
                    onChange={(newValue) => {
                    setTraining({...training, date: newValue});
                }}
                renderInput={(params) => 
                <TextField variant='standard' {...params} fullWidth /> }
                />
            </LocalizationProvider>
                <TextField
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    margin="dense"
                    label="Activity"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    margin="dense"
                    label="Duration in minutes"
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
        </>
    )
}

export default AddTraining;
