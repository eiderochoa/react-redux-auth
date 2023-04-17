import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { Modal } from 'react-bootstrap';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { useGetPermissionsQuery } from './usersApiSlice';

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

export const GroupForm = ({groupFormShow, handleGroupFormHide}) => {
  const {data: permissions, isLoading} = useGetPermissionsQuery();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <>
      <Modal show={groupFormShow} size="lg" onHide={handleGroupFormHide}>
        <Modal.Header closeButton>
          <Modal.Title>New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                id="outlined-groupname-input"
                label="Group Name"
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                  {isLoading?(<CircularProgress/>):(
                    <>
                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    >
                      {permissions.map((permission)=>(
                        <MenuItem key={permission.id} value={permission.codename}>
                          <Checkbox checked={personName.indexOf(permission.codename)> -1}/>
                          <ListItemText primary={permission.codename}/>
                        </MenuItem>
                      ))}

                    {/* {names.map((name) => (
                        <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                        </MenuItem>
                    ))} */}
                    </Select>
                    </>
                  )}
                    
                </FormControl>
                
            </div>      
    </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleGroupFormHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGroupFormHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
