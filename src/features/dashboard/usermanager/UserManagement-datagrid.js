import React, { useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box, CircularProgress, Tooltip } from '@mui/material';
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
import { useListUsersQuery, useAddUserMutation, useUpdUserMutation, useDelUserMutation } from './usersApiSlice';


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
    const { data: users, error, isLoading  } = useListUsersQuery();
    const [ addUser, {isLoading: formAddUserLoading}] = useAddUserMutation();
    const [ updUser, {isLoading: formUpdUserLoading}] = useUpdUserMutation();
    const [ delUser, {isLoading: usersIsReloading}] = useDelUserMutation();

    // const [users, setUsers] = useState([]);
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
                    {params.row.is_staff?(<CheckIcon color='success' fontSize="large"/>):(<CloseIcon fontSize="large" color='error'/>)}
                </>
            );
        }},
        {field: 'is_active', headerName: 'Is_Active', width: 70 , renderCell: (params)=>{
            return(
                <>
                    {params.row.is_active?(<CheckIcon color='success' fontSize="large"/>):(<CloseIcon fontSize="large" color='error'/>)}
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
    const handleShow = () => {setDataToEdit(null); setShow(true);}
    const handleShowEdit = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSnackShow = () => setSnackError(true);
    const handleSnackHide = () => setSnackError(false);
    const handleSnackSuccessShow = () => setSnackSuccess(true);
    const handleSnackSuccessHide = () => setSnackSuccess(false);
    const handleModalHide = () => setFormErrors(initialErrors);
    const handleAlertClose = () => setAlert(false);
    const handleTabChange = (event, newValue) => setTab(newValue); 
    
    
    // API Functions Statement //
    // const getUsers = async () =>{
    //     const res = await axios.get('http://localhost:8000/api/listusers',
    //     {headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //     }});
    //     if(res.status === 200){
    //         setUsers(res.data.response);
    //     }else{
    //         setSnackErrorText(res.message);
    //         handleSnackShow();
    //     }
    // }

    // const addUser = async (form) =>{
    //     const res = await axios.post('http://localhost:8000/api/register/', form,
    //     {headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //     }});
    //     if(res.status === 201){
    //         handleClose();
    //         setSnackSuccessText('User created succesfull');
    //         handleSnackSuccessShow();
    //         //getUsers();
    //     }else if(res.response.status === 400){
    //         setFormErrors(res.response.data);
    //     }else{
    //         setSnackErrorText(res.message);
    //         handleSnackShow();
    //     }
    // }

    const createUser = async (form) =>{
        try {
            const res = await addUser(form);
            if(res?.data){
                handleClose();
                setSnackSuccessText(`The user ${res.data.username} created succesfull`);
                handleSnackSuccessShow();
            }else if(res.error.status === 400){
                setFormErrors(res.error.data);
            }            
        } catch (error) {
            setSnackErrorText(error.data);
            handleSnackShow();
            
        }
        
       
    }
    const updateUser = async (form) =>{
        try {
            const res = await updUser(form);
            if(res?.data){
                handleClose();
                setSnackSuccessText(`User ${res.data.username} updated succesfull`);
                handleSnackSuccessShow();
            }else if(res.error.status === 400){
                setFormErrors(res.error.data);
            } 

        } catch (error) {
            setSnackErrorText(error.data);
            handleSnackShow();
        }
    }
    // const updUser = async (form) =>{
       
    //     const res = await axios.put('http://localhost:8000/api/upduser/'+form.id, form,
    //     {headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //     }});
    //     console.log(res);
    //     if(res.status === 200){
    //         handleClose();
    //         setSnackSuccessText('User updated succesfull');
    //         handleSnackSuccessShow();
    //         //getUsers();
    //     }else if(res.response.status === 400){
    //         setFormErrors(res.response.data);
    //     }else{
    //         setSnackErrorText(res.message);
    //         handleSnackShow();
    //     }

    // };

    const showUpdateForm = (data) =>{
        setDataToEdit(data);
        handleShowEdit();
    };

    const deleteUser = async (data) =>{
        try {
            const res = await delUser(data.id);
            if(res?.data){
                handleAlertClose();
                setSnackSuccessText(`User ${data.username} deleted succesfull`);
                handleSnackSuccessShow();
            }
            
        } catch (error) {
            setSnackErrorText(error.data);
            handleSnackShow();
        }

    } 

    // const delUser = async (data) =>{
    //     const res = await axios.get('http://localhost:8000/api/deluser/'+data.id,{headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //     }});
    //     if(res.status === 200){
    //         handleAlertClose();
    //         setSnackSuccessText('User deleted succesfull');
    //         handleSnackSuccessShow();
    //         //getUsers();
    //     }else{
    //         setSnackErrorText(res.message);
    //         handleSnackShow();
    //     }

    // }
    
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
        {isLoading?(<CircularProgress/>):(<><Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                        rows={users.response}
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
                        <UserForm 
                        addUser={createUser} 
                        updUser={updateUser} 
                        dataToEdit={dataToEdit} 
                        setDataToEdit={setDataToEdit} 
                        formErrors={formErrors}
                        formAddUserLoading={formAddUserLoading}
                        formUpdUserLoading={formUpdUserLoading}
                        />
                        </Modal.Body>                
                    </Modal>
                <DeleteUserAlert 
                show={alert} 
                userData={dataToDelete} 
                delUser={deleteUser} 
                handleAlertClose={handleAlertClose}
                usersIsReloading={usersIsReloading}
                />

            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Button variant='primary' className='m-1'><PeopleAltIcon/>{' '}Add Group</Button>
                <h5 className='text-center'>Groups List</h5>
                <GroupDataGrid/>
            </TabPanel>
            
            </>)}
            
            {error?(<Snackbar open={snackError} autoHideDuration={6000} onClose={handleSnackHide}>
                <Alert onClose={handleSnackHide} severity="error" sx={{ width: '100%' }}>
                {error}
                </Alert>
            </Snackbar>):(<></>)}            
            
            <Snackbar open={snackSuccess} autoHideDuration={6000} onClose={handleSnackSuccessHide}>
                <Alert onClose={handleSnackSuccessHide} severity="success" sx={{ width: '100%' }}>
                {snackSuccessText}
                </Alert>
            </Snackbar>
        </>
    );
}