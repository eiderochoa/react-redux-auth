import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, IconButton, Tooltip, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useListGroupsQuery } from './usersApiSlice';

export const GroupDataGrid = () =>{
    const [data, setData] = useState([]);
    const {data: groups, isLoading} = useListGroupsQuery();

    // useEffect(() => {
    //   getGroups();
    // }, [])
    

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width:150},
        {field: 'permissions', headerName: 'Permissions', width: 200, renderCell: (params)=>{
            return(
                <>
                {/* {params.row.permissions.lenght === 0?(<Alert key={`alert-${params.row.id}`} severity="warning">The group has not permissions!</Alert>):(params.row.permissions.map((el)=>{
                    const permission = getParmission(el);
                    return(
                    <p key={`p-${permission.id}`}>{permission.name}</p>
                    );
                }))} */}
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




    const getGroups = async () => {
        const res = await axios.get('http://localhost:8000/api/groups/',
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }});
        if(res.status === 200){
            console.log(res.data);
            setData(res.data);
        }
    }

    const getParmission = async (id) =>{
        const res = await axios.get('http://localhost:8000/api/permissions/'+id,
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }});
        if(res.status === 200){
            setData(res.data);
        }
    }


    return(
        <>
        {isLoading?<CircularProgress/>:(
            <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid 
                rows={groups}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection                    
                />
        </Box>
        )}
        
        </>
    );
}