import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Box, Checkbox, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import {useListGroupsQuery, useGetUsersGroupsQuery, useSetUserGroupsMutation} from './usersApiSlice';
import SaveIcon from '@mui/icons-material/Save';


const initialForm = {
  'userId': null,
  'groups': []
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export const SetUserGroupsModal = ({show,handleClose,handleModalHide, userId, userName}) => {
    const [groupNames, setGroupNames] = React.useState([]);
    const {data: groups, isLoading:fullGroupsLoading} = useListGroupsQuery();
    const {data: userGroups, isLoading:userGroupsLoadig} = useGetUsersGroupsQuery(userId);
    const [setUserGroups] = useSetUserGroupsMutation();
    const [btnSaveActive, setBtnSaveActive] = useState(true);


    useEffect(() => {
      if(userGroups){
        console.log(userGroups);
        const ar = [];
        userGroups.map((group)=>{
            ar.push(group.name);
        });
        setGroupNames(ar);
      }
      
      
    }, [userGroups])
    

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setGroupNames(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
        setBtnSaveActive(false);
      };

    const handleSubmit = (e) =>{
      e.preventDefault();
      initialForm.userId = userId;
      initialForm.groups = groupNames;
      setUserGroups(initialForm);
      handleClose();
    }

  return (
    <>
        <Modal show={show} size="md" onHide={handleClose} onExited={handleModalHide}>
            <Modal.Header closeButton>
                <Modal.Title>Set the user: {userName} to Groups </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {userGroupsLoadig?(<CircularProgress/>):(
              <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            >
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="label-groups">Groups</InputLabel>
                    <Select
                    labelId="label-groups"
                    id="groups-checkbox"
                    multiple
                    value={groupNames}
                    onChange={handleChange}
                    input={<OutlinedInput label="Groups" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    >
                    {fullGroupsLoading?(<CircularProgress/>):(
                        groups.map((group) => (
                        <MenuItem key={group.name} value={group.name}>
                        <Checkbox checked={groupNames.indexOf(group.name) > -1} />
                        <ListItemText primary={group.name} />
                        </MenuItem>
                    ))
                    )}
                    
                    </Select>
                </FormControl>
                </Box>
            )}
            
                      
            </Modal.Body> 
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleClose}>
                Close
              </Button>{' '}
              <Button variant="success"  disabled={btnSaveActive} onClick={handleSubmit}>
                <SaveIcon/>{' '}Save Changes
              </Button>
            </Modal.Footer>               
        </Modal>
    </>
  )
}
