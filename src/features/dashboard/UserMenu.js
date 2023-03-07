import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';


export const UserMenu = () => {

    const [username, setUsername] = useState('');

    useEffect(() => {
        // console.log(`Bearer ${localStorage.getItem('access_token')}`);
        if(localStorage.getItem('username') === null){
            (async  () => {
                try {
                    const res = await axios.get('http://localhost:8000/api/profile',
                    {headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }});
                    
                    if(res.status === 200){
                        setUsername(res.data.response.username);                        
                        localStorage.setItem('username',  res.data.response.username);
                        localStorage.setItem('userid', res.data.response.id);
                        
                    }else{
                        console.log('error');
                    }
                    
                } catch (error) {
                    console.log(error);
                    
                }
            })()
        }else{
            setUsername(localStorage.getItem('username'));
        }
      
    
     
    }, []);

    return(
        <Nav className="justify-content-end flex-grow-1 pe-3">
            <NavDropdown title={username} id="ddUser">
                <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
    

}