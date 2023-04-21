// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useUserProfileQuery } from './usermanager/usersApiSlice';
import { CircularProgress } from '@mui/material';
import { logOut } from '../auth/authSlice';
import { useDispatch } from 'react-redux';

export const UserMenu = () => {
    const {data: userProfile, isLoading } = useUserProfileQuery();
    const dispatch = useDispatch();
    // const [username, setUsername] = useState('');

    // useEffect(() => {
    //     // console.log(`Bearer ${localStorage.getItem('access_token')}`);
    //     if(localStorage.getItem('username') === null){
    //         (async  () => {
    //             try {
    //                 const res = await axios.get('http://localhost:8000/api/profile',
    //                 {headers:{
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //                 }});
                    
    //                 if(res.status === 200){
    //                     setUsername(res.data.response.username);                        
    //                     localStorage.setItem('username',  res.data.response.username);
    //                     localStorage.setItem('userid', res.data.response.id);
                        
    //                 }else{
    //                     console.log('error');
    //                 }
                    
    //             } catch (error) {
    //                 console.log(error);
                    
    //             }
    //         })()
    //     }else{
    //         setUsername(localStorage.getItem('username'));
    //     }
      
    
     
    // }, []);

    return(
        <>
        {isLoading?(<CircularProgress/>):(
        <Nav className="justify-content-end flex-grow-1 pe-3">
        <NavDropdown title={userProfile.response.username} id="ddUser">
            <NavDropdown.Item onClick={()=>dispatch(logOut())}>Logout</NavDropdown.Item>
        </NavDropdown>
        </Nav>)}
        </>
    )
    

}