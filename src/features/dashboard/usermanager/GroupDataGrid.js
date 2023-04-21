import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Tooltip, Box, CircularProgress, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useListGroupsQuery, useGetPermissionQuery, useAddGroupMutation, useUpdGroupMutation, useDelGroupMutation } from './usersApiSlice';
import { PermissionListByGroup } from './PermissionListByGroup';
import { GroupForm } from './GroupForm';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ButtonBootstrab from 'react-bootstrap/Button';
import { DeleteGroupAlert } from './DeleteGroupAlert';

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
    const [addGroup] = useAddGroupMutation();
    const [updGroup] = useUpdGroupMutation();
    const [dataToEdit, setDataToEdit]=useState(null);
    const [alert, setAlert] = useState(false);
    const [dataToDelete, setDataToDelete] = useState('');
    const [delGroup, {isLoading: groupsIsReloading}] = useDelGroupMutation();

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
                    <IconButton onClick={(e)=>{setDataToDelete(params.row);setAlert(true);}}  aria-label="delete" color='error'>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>{' '}
                <Tooltip title="Edit">
                    <IconButton onClick={(e)=>showEditForm(params.row)}   aria-label="edit" color='primary'>
                        <EditIcon />
                    </IconButton>
                </Tooltip>            
                </>
            );
        }}
    ]


    const GetParmission = async (id) =>{
        try{
            const res = await useGetPermissionQuery(id);
            console.log(res.data);
            return res.data;

        }catch(error){

        }
        
    }
    const createGroup = async (form) =>{
        try {
            const res = await addGroup(form);
            if(res?.data){
                handleGroupFormHide();
                setSnackSuccessText(`The group ${form.name} was created successfull.`);
                handleSnackSuccessShow();
            }
        } catch (error) {
            setSnackErrorText(error.data);
            handleSnackShow();            
        }
    }

    const updateGroup = async (form) =>{
        try {
            const res = await updGroup(form);
            if(res?.data){
                handleGroupFormHide();
                setSnackSuccessText(`The group ${form.name} was updated successfull.`);
                handleSnackSuccessShow();
            }
        } catch (error) {
            setSnackErrorText(error.data);
            handleSnackShow();
        }
    }

    const deleteGroup = async (data) =>{
        try {
            const res = await delGroup(data);
            handleAlertClose();
            setSnackSuccessText(`Group ${data.name} deleted succesfull`);
            handleSnackSuccessShow();
        } catch (error) {
            setSnackErrorText(error.data);
            handleSnackShow();
        }
        
    }

    const showEditForm = (data) =>{
        setDataToEdit(data);
        handleGroupFormShow();
    }

    const ShowPermissionListModal=(listIdPermissions, gname)=>{
        setIdPermissionList(listIdPermissions);
        setGroupName(gname);
        setShowPermissionList(true);      
    }
    const handleClose = () => setShowPermissionList(false);
    const handleSnackShow = () => setSnackError(true);
    const handleSnackHide = () => setSnackError(false);
    const handleGroupFormShow = () => setShowGroupForm(true);
    const handleGroupFormHide = () => setShowGroupForm(false);
    const handleSnackSuccessHide = () => setSnackSuccess(false);
    const handleSnackSuccessShow = () => setSnackSuccess(true);
    const handleAlertClose = () => setAlert(false);

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
        <GroupForm 
        groupFormShow={showGroupForm} 
        handleGroupFormHide={handleGroupFormHide} 
        createGroup={createGroup}
        updateGroup={updateGroup}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        />
        {isError?(
            <Snackbar open={snackError} autoHideDuration={6000} onClose={handleSnackHide}>
                <Alert onClose={handleSnackHide} severity="error" sx={{ width: '100%' }}>
                {snackErrorText}
                </Alert>
            </Snackbar>)
        :(<></>)}
        <Snackbar open={snackSuccess} autoHideDuration={6000} onClose={handleSnackSuccessHide}>
                <Alert onClose={handleSnackSuccessHide} severity="success" sx={{ width: '100%' }}>
                {snackSuccessText}
                </Alert>
        </Snackbar>
        <DeleteGroupAlert 
        show={alert} 
        groupData={dataToDelete}
        deleteGroup={deleteGroup}
        handleAlertClose={handleAlertClose}
        groupsIsReloading={groupsIsReloading}
        />
        </>
    );
}