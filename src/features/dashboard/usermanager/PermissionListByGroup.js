
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { PermissionItem } from './PermissionItem';
import { Alert } from '@mui/material';

export const PermissionListByGroup = ({showPermissionList, setShowPermissionList, idPermissionList, groupName,handleClose}) => {
    

    
  return (
    <>
       <Modal show={showPermissionList} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{groupName} Group Permissions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {idPermissionList.length === 0? (<Alert severity="warning">The group has not permission. </Alert>):(idPermissionList.map((el)=>{
                return <PermissionItem key={groupName+'-'+el} groupname={groupName} idPermission={el}/>;
            }))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}
