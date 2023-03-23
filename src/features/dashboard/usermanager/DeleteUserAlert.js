import { Button, CircularProgress, Dialog } from '@mui/material';
import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Col, Row } from 'react-bootstrap';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export const DeleteUserAlert = ({show,userData,delUser,handleAlertClose,usersIsReloading}) =>{
    return(
        <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAlertClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you shure you whant to delete <span style={{color:"red",fontSize: "1.5rem"}}>{userData.username}</span> user?
          </DialogContentText>
          <Row sm={12} lg={12}>
            <Col sm={2} lg={2} className='mx-auto'>
            {usersIsReloading?<CircularProgress color='secondary'/>:<></>}
          </Col>
          </Row>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Disagree</Button>
          <Button onClick={()=>delUser(userData)}>Agree</Button>
        </DialogActions>
      </Dialog>
    );
}