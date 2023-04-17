import { Box, Button, FormControl, InputLabel, Select, TextField } from '@mui/material';
import React from 'react';
import { Modal } from 'react-bootstrap';

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
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
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
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                    </Select>
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
