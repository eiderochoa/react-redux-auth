import React from 'react'
import { useGetPermissionQuery } from './usersApiSlice';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
export const PermissionItem = ({idPermission,groupname}) => {
    const {data: permission, isLoading, isError, error} = useGetPermissionQuery(idPermission);

    const handleSnackHide = () => isError=false;
  return (
    <>
        {isLoading?(<CircularProgress/>):(<p>{permission.name}</p>)}
        {isError?(
          <Snackbar open={isError} autoHideDuration={6000} onClose={handleSnackHide}>
                <Alert onClose={handleSnackHide} severity="error" sx={{ width: '100%' }}>
                {error}
                </Alert>
            </Snackbar>
        ):(<></>)}
    </>
    
  )
  
}

