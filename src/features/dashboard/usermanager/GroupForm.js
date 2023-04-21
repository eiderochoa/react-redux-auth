import { Box, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useGetPermissionsQuery } from './usersApiSlice';
import { getFirstNonSpannedColumnToRender } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils';

const initialForm = {
  'id': null,
  'name': "",
  'permissions': []
}

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

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

export const GroupForm = ({groupFormShow, handleGroupFormHide, createGroup, updateGroup, dataToEdit, setDataToEdit}) => {
  const [form, setForm] = useState(initialForm);
  const {data: permissions, isLoading} = useGetPermissionsQuery();
  const [personName, setPersonName] = React.useState([]);
  


  useEffect(()=>{
    if(dataToEdit){
      const ar = [];
        dataToEdit.permissions.map((i)=>{
          permissions.map((el)=>{
            if(el.id === i){
              ar.push(el.codename);
            }
          })
        })
      setPersonName(ar);
      setForm(dataToEdit);
        
    }else{
        setForm(initialForm);
        
    }
  },[dataToEdit]);

  
  

  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;    
    
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setForm({...form,permissions:utilGetPermissionsId(value)});
  }

  const utilGetPermissionsId = (srtArray) =>{
    const ar = [];
    srtArray.map((el)=>{
      permissions.map((i)=>{
        if(el === i.codename){
          ar.push(i.id);
        }
      })
    })
    return ar;
  }
  const handleChangeText =(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(form.id === null){
      createGroup(form);
    }else{
      updateGroup(form);
    }
    handleReset();
  }
  const handleReset = (e)=>{
    initialForm.permissions=[];
    setPersonName([]);
    setForm(initialForm);
    setDataToEdit(null);
  }
  const handleFormHideReset = () =>{
    handleReset();
    handleGroupFormHide();
  }
  return (
    <>
      <Modal show={groupFormShow} size="lg" onHide={handleFormHideReset}>
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
                name='name'
                onChange={handleChangeText}
                value={form.name}
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                  {isLoading?(<CircularProgress/>):(
                    <>
                    <InputLabel id="demo-multiple-checkbox-label">Permissions</InputLabel>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Permissions" />}
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
          <Button variant="outline-danger" onClick={handleFormHideReset}>
            Close
          </Button>{' '}
          <Button variant="success" onClick={handleSubmit}>
            <SaveIcon/>{' '}Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
