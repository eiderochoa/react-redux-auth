import { Box, FormControlLabel, Switch, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BotonMUI from '@mui/material/Button';
import SendIcon  from '@mui/icons-material/Send';

const initialForm={
    id: null,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    is_staff: false,
    is_active: true,
} 

export const UserForm = ({addUser, updUser,dataToEdit, setDataToEdit, formErrors}) =>{
    const [form, setForm] = useState(initialForm);

    useEffect(()=>{
        if(dataToEdit){
            setForm(dataToEdit);
        }else{
            setForm(initialForm);
        }
    },[dataToEdit]);

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleIsStaffSwitch = (e) =>{
        if(e.target.checked){
            setForm({...form,is_staff:true});
        }else{
            setForm({...form,is_staff:false});
        }
    }
    const handleIsActiveSwitch = (e) =>{
        if(e.target.checked){
            setForm({...form,is_active:true});
        }else{
            setForm({...form,is_active:false});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.id === null){
            addUser(form);
        }else{
            updUser(form);
        }
        handleReset();
    }
    const handleReset = (e)=>{
        setForm(initialForm);
        setDataToEdit(null);
    };



    return(
        <>
            <Box className='mx-auto'
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <div>
                    {formErrors.username === ''?(<TextField
                        id="outlined-username-input"
                        label="Username"
                        name='username'
                        type="text"
                        autoComplete='current-username'
                        onChange={handleChange}
                        value={form.username}
                        required
                        />):(<TextField
                        error
                        helperText={formErrors.username}
                        id="outlined-username-input"
                        label="Username"
                        name='username'
                        type="text"
                        autoComplete='current-username'
                        onChange={handleChange}
                        value={form.username}
                        required
                        />)}
                    
                    <TextField
                        id="outlined-firstname-input"
                        label="First Name"
                        name='first_name'
                        type="text"
                        onChange={handleChange}
                        value={form.first_name}
                        />
                    <TextField
                        id="outlined-lastname-input"
                        label="Last Name"
                        name='last_name'
                        type="text"
                        onChange={handleChange}
                        value={form.last_name}
                        />
                    </div>
                    <div>
                    {formErrors.email === ''?(<TextField
                        id="outlined-email-input"
                        label="Email"
                        name='email'
                        type="email"
                        onChange={handleChange}
                        value={form.email}
                        required
                        />):(<TextField
                        error
                        helperText={formErrors.email}
                        id="outlined-email-input"
                        label="Email"
                        name='email'
                        type="email"
                        onChange={handleChange}
                        value={form.email}
                        required
                        />)}
                    
                    {form.id === null?(
                        <>                    
                            {formErrors.password === ''?(<TextField
                            id="outlined-password-input"
                            label="Password"
                            name='password'
                            type="password"
                            autoComplete='current-password'
                            onChange={handleChange}
                            required
                            />):(<TextField
                            error
                            helperText={formErrors.password}
                            id="outlined-password-input"
                            label="Password"
                            name='password'
                            type="password"
                            autoComplete='current-password'
                            onChange={handleChange}
                            required
                            />)}
                            {formErrors.password2 === ''?(<TextField
                            id="outlined-password2-input"
                            label="Confirm Password"
                            name='password2'
                            type="password"
                            autoComplete='current-password'
                            onChange={handleChange}
                            required
                            />):(<TextField
                            error
                            helperText={formErrors.password2}
                            id="outlined-password2-input"
                            label="Confirm Password"
                            name='password2'
                            type="password"
                            autoComplete='current-password'
                            onChange={handleChange}
                            required
                            />)}
                            
                        </>
                    ):(
                        <>                    
                            <TextField
                            id="outlined-password-input"
                            label="Password"
                            name='password'
                            type="password"
                            autoComplete='current-password'
                            onChange={handleChange}
                            disabled
                            />
                            <TextField
                            id="outlined-password2-input"
                            label="Confirm Password"
                            name='password2'
                            type="password"
                            autoComplete='current-password'
                            onChange={handleChange}
                            disabled
                            />
                        </>
                    )}
                    
                    </div>
                    <div>
                    <FormControlLabel control={<Switch checked={form.is_staff} onChange={handleIsStaffSwitch}/>} label="Is Staff" />
                    <FormControlLabel control={<Switch checked={form.is_active} onChange={handleIsActiveSwitch}/>} label="Is Active" />                    
                    </div>
                    <hr/>
                    <div className='col-2 mx-auto'>
                        <BotonMUI type='submit' variant="contained" endIcon={<SendIcon />}>
                        Send
                        </BotonMUI>
                    </div>
                </Box>
        </>
    );
}