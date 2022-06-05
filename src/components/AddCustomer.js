import React from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField } from "@mui/material";


function AddCustomer({ addCustomer }) {

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        addCustomer(customer);          // kutsutaan addCustomer props oliota funktiota customer statesta
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''      
        })
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})       // ... tuo kaikki propertit senhetkisinen arvoineen. Muuten kaikki vanha pyyhkiytyy pois
    }

    return(
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new customer</DialogTitle>
            <DialogContent>
                <TextField
                    name="firstname"
                    value={customer.firstname}
                    onChange={inputChanged}
                    margin="dense"
                    label="Firstname"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="lastname"
                    value={customer.lastname}
                    onChange={inputChanged}
                    margin="dense"
                    label="Lastname"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={inputChanged}
                    margin="dense"
                    label="Street address"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="postcode"
                    value={customer.postcode}
                    onChange={inputChanged}
                    margin="dense"
                    label="Postcode"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="city"
                    value={customer.city}
                    onChange={inputChanged}
                    margin="dense"
                    label="City"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="email"
                    value={customer.email}
                    onChange={inputChanged}
                    margin="dense"
                    label="Email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="phone"
                    value={customer.phone}
                    onChange={inputChanged}
                    margin="dense"
                    label="Phone"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );

}

export default AddCustomer;