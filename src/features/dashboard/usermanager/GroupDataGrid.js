import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Tooltip, Box, CircularProgress, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useListGroupsQuery, useGetPermissionQuery } from './usersApiSlice';
import { PermissionListByGroup } from './PermissionListByGroup';
import { GroupForm } from './GroupForm';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ButtonBootstrab from 'react-bootstrap/Button';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export const GroupDataGrid = () =>{
    const {data: groups, isLoading, error, isError} = useListGroupsQuery();
    const [idPermissionList, setIdPermissionList] = useState();
    const [showPermissionList, setShowPermissionList] = useState(false);
    const [groupName, setGroupName] = useState();

    const [snackError, setSnackError] = useState(false);
    const [snackErrorText, setSnackErrorText] = useState('');
    const [snackSuccess, setSnackSuccess] = useState(false);
    const [snackSuccessText, setSnackSuccessText] = useState('');

    const [showGroupForm, setShowGroupForm] = useState(false);

    useEffect(() => {
        setSnackError(isError);
        if(error?.status !== undefined){
          setSnackErrorText(error.status);
        }
        
      }, [isError])

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width:150},
        {field: 'permissions', headerName: 'Permissions', width: 200, renderCell: (params)=>{
            return(
                <>
                <Button variant='contained' onClick={(e)=>{ShowPermissionListModal(params.row.permissions,params.row.name)}}>Show Peremissions</Button>                
              
                </>
            );

        }},        
        {field: 'actions', headerName: 'Actions', width: 150, renderCell: (params)=>{
            return(
                <>
                <Tooltip title="Delete">
                    <IconButton   aria-label="delete" color='error'>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>{' '}
                <Tooltip title="Edit">
                    <IconButton  aria-label="edit" color='primary'>
                        <EditIcon />
                    </IconButton>
                </Tooltip>            
                </>
            );
        }}
    ]




    // const getGroups = async () => {
    //     const res = await axios.get('http://localhost:8000/api/groups/',
    //     {headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //     }});
    //     if(res.status === 200){
    //         console.log(res.data);
    //         setPermission(res.data);
    //     }
    // }

    const GetParmission = async (id) =>{
        try{
            const res = await useGetPermissionQuery(id);
            console.log(res.data);
            return res.data;

        }catch(error){

        }
        
    }

    const ShowPermissionListModal=(listIdPermissions, gname)=>{
        setIdPermissionList(listIdPermissions);
        setGroupName(gname);
        setShowPermissionList(true);      
    }
    const handleClose = () => setShowPermissionList(false);
    const handleSnackHide = () => setSnackError(false);
    const handleGroupFormShow = () => setShowGroupForm(true);
    const handleGroupFormHide = () => setShowGroupForm(false);

    return(
        <>

        <ButtonBootstrab variant='primary' className='m-1' onClick={handleGroupFormShow}><PeopleAltIcon/>{' '}Add Group</ButtonBootstrab>
        <h5 className='text-center'>Groups List</h5>
        {isLoading?<CircularProgress/>:(
            <Box sx={{ height: 400, width: '100%' }}>
            {isError?(<></>):(<DataGrid 
                rows={groups}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection                    
                />)}
            
        </Box>
        )}
        {showPermissionList?(<PermissionListByGroup 
        key={groupName} 
        showPermissionList={showPermissionList} 
        setShowPermissionList={setShowPermissionList} 
        idPermissionList={idPermissionList} 
        groupName={groupName}
            handleClose={handleClose}
        />):(<></>)}
        <GroupForm groupFormShow={showGroupForm} handleGroupFormHide={handleGroupFormHide}/>
        {isError?(
            <Snackbar open={snackError} autoHideDuration={6000} onClose={handleSnackHide}>
                <Alert onClose={handleSnackHide} severity="error" sx={{ width: '100%' }}>
                {snackErrorText}
                </Alert>
            </Snackbar>)
        :(<></>)}
        
        </>
    );
}