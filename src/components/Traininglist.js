import { AgGridReact } from 'ag-grid-react';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs';


function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');


    const getCName = (params) => {
        return params.data.customer.firstname + " " + params.data.customer.lastname;
    };

    useEffect(() => {
        fetchTrainings();
    }, []); 

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + id , { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                setMsg("Training deleted.");
                setOpen(true);
                fetchTrainings();
            } else {
                alert("Something went wrong!")
            }
        })
        }
    }

    const columns = [
        {field: 'date', sortable: true, filter: true, floatingFilter: true, valueFormatter: params => dayjs(params.value).format("DD-MM-YY HH:mm") },
        {field: 'duration', sortable: true, filter: true, floatingFilter: true},
        {field: 'activity', sortable: true, filter: true, floatingFilter: true},
        {
            headerName: 'Customer',
            valueGetter: getCName,
            width: 180
        },
        {
        headerName: '',
        width: 90,
        field: 'links.0.href',
        cellRenderer: params => 
        <IconButton onClick={() => deleteTraining(params.data.id)}>
          <DeleteForeverIcon />
        </IconButton>
        }
    ]

    return(
        <>
        <span id="animationAction"></span>
        <div className="ag-theme-material" style={{height: 600, width: '100%'}}>
        <AgGridReact 
            rowData={trainings}
            columnDefs={columns}
            pagination={true}       // taulun sivutus
            paginationPageSize={10}
            suppressCellFocus={true}
            rowSelection="single"
            floatingFilter
            animateRows={true}
        />
        </div>
        <Snackbar
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}      // callback funktio, joka asettaa openin falseks = viesti katoaa
        />
        </>
    )

}

export default Traininglist;