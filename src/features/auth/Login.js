import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DB_header_login_img from '../../images/db_header_login_img.png';
import { Alert, Snackbar } from '@mui/material';
import { useGetUserGroupsMutation } from '../dashboard/usermanager/usersApiSlice';

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const [snackError, setSnackError] = useState(false);

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    const handleSnackShow = () => setSnackError(true);
    const handleSnackHide = () => setSnackError(false);

    useEffect(() => {
      userRef.current.focus();
    
    }, [])

    useEffect(() => {
      setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({username, password}).unwrap();
            dispatch(setCredentials({ ...userData, username }));
            setUsername('');
            setPassword('');
            navigate('/dashboard');
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)

    const handlePwdInput = (e) => setPassword(e.target.value)

    const content2 = (
      <>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2" style={{marginLeft:"0",marginRight:"0"}}>
        <Col className="mx-auto">
          <Card>
            <Card.Img variant="top" src={DB_header_login_img} />
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
                <div className="Auth-form-container">
                  <form className="Auth-form" onSubmit={handleSubmit}>
                   <div className="Auth-form-content">
                     <div className="form-group mt-3">
                       <label>Username</label>
                       <input className="form-control mt-1" 
                         placeholder="Enter Username" 
                         name='username'
                         ref={userRef}  
                         type='text' value={username}
                         required 
                         onChange={e => setUsername(e.target.value)}/>
                     </div>
                     <div className="form-group mt-3">
                       <label>Password</label>
                       <input name='password' 
                         type="password"     
                         className="form-control mt-1"
                         placeholder="Enter password"
                         value={password}
                         required
                         onChange={e => setPassword(e.target.value)}/>
                     </div>
                     <div className="d-grid gap-2 mt-3">
                       <button type="submit" 
                          className="btn btn-primary">Submit</button>
                     </div>
                   </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {errMsg?(<Snackbar open={snackError} autoHideDuration={6000} onClose={handleSnackHide}>
        <Alert onClose={handleSnackHide} severity="error" sx={{ width: '100%' }}>
        {errMsg}
        </Alert>
    </Snackbar>):(<></>)} 
    </>
    )
    
    

  return content2
}

export default Login