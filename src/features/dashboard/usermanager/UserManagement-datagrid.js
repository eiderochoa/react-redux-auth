import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
// import { CheckLg, PersonAdd, XLg } from 'react-bootstrap-icons';
import CheckIcon from '@mui/icons-material/Check';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box, Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import {UserForm} from './UserForm';
import { DeleteUserAlert } from './DeleteUserAlert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { GroupDataGrid } from './GroupDataGrid';

import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../../auth/authSlice";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const initialErrors={
    username: "",
    email: "",
    password: "",
    password2: "",
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'} variant={'body2'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export const UserManagementDataGrid = () =>{
    // useState Statement //
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [snackError, setSnackError] = useState(false);
    const [snackErrorText, setSnackErrorText] = useState('');
    const [snackSuccess, setSnackSuccess] = useState(false);
    const [snackSuccessText, setSnackSuccessText] = useState('');
    const [dataToEdit, setDataToEdit]=useState(null); 
    const [formErrors, setFormErrors] = useState(initialErrors);
    const [alert, setAlert] = useState(false);
    const [dataToDelete, setDataToDelete] = useState('');
    const [tab, setTab] = useState(0);

    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'username', headerName: 'Username', width:150},
        {field: 'first_name', headerName: 'First Name', width: 200},
        {field: 'last_name', headerName: 'Last Name', width: 200},
        {field: 'email', headerName: 'Email', width: 250},
        {field: 'is_staff', headerName: 'Is_Staff', width: 70, renderCell: (params)=>{
            return(
                <>
                    {params.row.is_staff?(<CheckIcon color='lightgreen' fontSize="large"/>):(<CloseIcon fontSize="large" color='#FF5733'/>)}
                </>
            );
        }},
        {field: 'is_active', headerName: 'Is_Active', width: 70 , renderCell: (params)=>{
            return(
                <>
                    {params.row.is_active?(<CheckIcon color='lightgreen' fontSize="large"/>):(<CloseIcon fontSize="large" color='#FF5733'/>)}
                </>
            );
        }},
        {field: 'actions', headerName: 'Actions', width: 150, renderCell: (params)=>{
            return(
                <>
                <Tooltip title="Delete">
                    <IconButton onClick={(e)=>{setDataToDelete(params.row);setAlert(true)}}  aria-label="delete" color='error'>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>{' '}
                <Tooltip title="Edit">
                    <IconButton onClick={(e)=>showUpdateForm(params.row)} aria-label="edit" color='primary'>
                        <EditIcon />
                    </IconButton>
                </Tooltip>            
                </>
            );
        }}
    ]

    // Handle Statement //
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSnackShow = () => setSnackError(true);
    const handleSnackHide = () => setSnackError(false);
    const handleSnackSuccessShow = () => setSnackSuccess(true);
    const handleSnackSuccessHide = () => setSnackSuccess(false);
    const handleModalHide = () => setFormErrors(initialErrors);
    const handleAlertClose = () => setAlert(false);
    const handleTabChange = (event, newValue) => setTab(newValue); 
    
    
    // API Functions Statement //
    const getUsers = async () =>{
        const res = await axios.get('http://localhost:8000/api/listusers',
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }});
        if(res.status === 200){
            setUsers(res.data.response);
        }else{
            setSnackErrorText(res.message);
            handleSnackShow();
        }
    }

    const addUser = async (form) =>{
        const res = await axios.post('http://localhost:8000/api/register/', form,
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }});
        if(res.status === 201){
            handleClose();
            setSnackSuccessText('User created succesfull');
            handleSnackSuccessShow();
            getUsers();
        }else if(res.response.status === 400){
            setFormErrors(res.response.data);
        }else{
            setSnackErrorText(res.message);
            handleSnackShow();
        }
    }

    const updUser = async (form) =>{
        const res = await axios.put('http://localhost:8000/api/upduser/'+form.id, form,
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }});
        console.log(res);
        if(res.status === 200){
            handleClose();
            setSnackSuccessText('User updated succesfull');
            handleSnackSuccessShow();
            getUsers();
        }else if(res.response.status === 400){
            setFormErrors(res.response.data);
        }else{
            setSnackErrorText(res.message);
            handleSnackShow();
        }

    };

    const showUpdateForm = (data) =>{
        setDataToEdit(data);
        handleShow();
    }

    const delUser = async (data) =>{
        const res = await axios.get('http://localhost:8000/api/deluser/'+data.id,{headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }});
        if(res.status === 200){
            handleAlertClose();
            setSnackSuccessText('User deleted succesfull');
            handleSnackSuccessShow();
            getUsers();
        }else{
            setSnackErrorText(res.message);
            handleSnackShow();
        }

    }
    
    // useEffect Statement //
    // useEffect(() => {
    //     if(user === undefined){                   
    //         window.location.href = '/'
    //     }else{
    //        getUsers();
            
    //     }
      
    // },[]);
    

    


    return(
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                value={tab}
                onChange={handleTabChange}
                aria-label="wrapped label tabs example"
                >
                <Tab label="Users" {...a11yProps(0)}/>
                <Tab label="Groups" {...a11yProps(1)}/>

                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <Button variant='primary' className='m-1' onClick={handleShow}><PersonAddIcon/>{' '}Add User</Button>
                <h5 className='text-center'>Users List</h5>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid 
                        rows={users}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection                    
                    />
                    </Box>
                    <Modal show={show} size="lg" onHide={handleClose} onExited={handleModalHide}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <UserForm addUser={addUser} updUser={updUser} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} formErrors={formErrors}/>
                        </Modal.Body>                
                    </Modal>
                <DeleteUserAlert show={alert} userData={dataToDelete} delUser={delUser} handleAlertClose={handleAlertClose}/>

            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Button variant='primary' className='m-1'><PeopleAltIcon/>{' '}Add Group</Button>
                <h5 className='text-center'>Groups List</h5>
                <GroupDataGrid/>
            </TabPanel>
            
            <Snackbar open={snackError} autoHideDuration={6000} onClose={handleSnackHide}>
                <Alert onClose={handleSnackHide} severity="error" sx={{ width: '100%' }}>
                {snackErrorText}
                </Alert>
            </Snackbar>
            <Snackbar open={snackSuccess} autoHideDuration={6000} onClose={handleSnackSuccessHide}>
                <Alert onClose={handleSnackSuccessHide} severity="success" sx={{ width: '100%' }}>
                {snackSuccessText}
                </Alert>
            </Snackbar>
        </>
    );
}