import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TvkLogo from '../../images/tvk-logo.png';
import React, { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { UserMenu } from './UserMenu';
import { Link } from 'react-router-dom';

export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
    // console.log(localStorage.getItem('access_token'));
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
     return ( 
      <>
      <Navbar bg="dark" expand={'lg'} className="mb-3" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#">
            <img alt='' src={TvkLogo} width="30" height="30" className="d-inline-block align-top"/>{' '}
             Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar`}
              aria-labelledby={`offcanvasNavbarLabel`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3 d-block d-lg-none">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  {/* <Nav.Link href="/dashboard/usermanager">User Management</Nav.Link> */}
                  <Link className='nav-link' to="/dashboard/usermanager">User Manager</Link>
                </Nav>
                <UserMenu/>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        </>

      // <div>
      //   <Navbar bg="dark" variant="dark">
      //     <Navbar.Brand href="/">JWT Authentification</Navbar.Brand>            
      //     <Nav className="me-auto"> 
      //     {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
      //     </Nav>
      //     <Nav>
      //     {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
      //               <Nav.Link href="/login">Login</Nav.Link>}
      //     </Nav>
      //   </Navbar>
      //  </div>
     );
}