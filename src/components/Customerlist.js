import { AgGridReact } from 'ag-grid-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Snackbar } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist() {

    const gridRef = useRef();
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');


    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, []); 

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers', { method: 'GET' }) 
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer added.');
                setOpen(true);
                fetchCustomers();
            } else {
                alert('Something went wrong!')
            }
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, {
          method: 'PUT',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
          if (response.ok) {
            setMsg('Customer edited succesfully');
            setOpen(true);
            fetchCustomers();
          } else {
            alert('Something went wrong when editing customer');
          }
        })
        .catch(err => console.error(err))
      }

      const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})            
            .then(response => {                        // respone- olio sisältää kaiken datan delete toimintoon.
            if (response.ok) {
                setMsg('Customer deleted');
                setOpen(true);
                fetchCustomers();                       // lähettää delete-pyynnön back-endiin
            } else {
                alert('Something went wrong.')
            }
        })
      }
    }

    const addTraining = training => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) {
                setMsg("New training added.");
                setOpen(true);
                fetchCustomers();
            } else {
                alert("Something went wrong with adding a training!")
            }
            })
            .catch(err => console.error(err))
        
    }
    

    const columns = [
        {field: 'firstname', sortable: true, filter: true, floatingFilter: true},
        {field: 'lastname', sortable: true, filter: true, floatingFilter: true},
        {field: 'streetaddress', sortable: true, filter: true, floatingFilter: true},
        {field: 'postcode', sortable: true, filter: true, floatingFilter: true},
        {field: 'city', sortable: true, filter: true, floatingFilter: true},
        {field: 'email', sortable: true, filter: true, floatingFilter: true},
        {field: 'phone', sortable: true, filter: true, floatingFilter: true},
        { 
            headerName: '',
            width: 90,
            field: 'links.0.href',
            cellRenderer: params => <AddTraining addTraining={addTraining} params={params} />
        },
        {
            headerName: '',
            width: 100,
            field: 'links.0.href',                   // links.0.href == linkki customer id:seen muokkausta varten. 
            cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
          },
        {    
            headerName: '', 
            width: 100,
            field: 'links.0.href',                  //links.0.href == linkki customer id, poistoon.    
            cellRenderer: params =>                 // määrittää funktion return arvon, mitä celliin renderöidään
            <IconButton onClick={() => deleteCustomer(params.value)}>    
                <DeleteForeverIcon />                       
            </IconButton>                            // params-olio lähetetään funktiolle
        }
    ]

    return(
        <>
            <AddCustomer addCustomer={addCustomer} />
            <span id="animationAction"></span>
            <div className="ag-theme-material" style={{height: 600, width: '100'}}>
                <AgGridReact 
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}       // taulun sivutus
                    paginationPageSize={15}
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
                onClose={() => setOpen(false)}        // callback funktio, joka asettaa openin falseks = viesti katoaa
            />
            <IconButton onClick={onBtnExport}>
                <UploadFileIcon />Export Customer data
            </IconButton>

        </>
    )

}

export default Customerlist;