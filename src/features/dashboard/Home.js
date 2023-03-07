// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import { Navigation } from "./Navigation";
import { Col, Row, Nav } from "react-bootstrap";
// import { Speedometer, PersonFillGear } from "react-bootstrap-icons";
import SpeedIcon from '@mui/icons-material/Speed';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Route, Routes } from "react-router-dom";
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserManagementDataGrid } from "./usermanager/UserManagement-datagrid";
import RequireAuth from "../auth/RequireAuth";

import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../auth/authSlice";
import Prueba from "./usermanager/Prueba";
// Define the Login function.
export const Home = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
     const [message, setMessage] = useState('');
    //  useEffect(() => {
    //     if(user === undefined ){                   
    //         window.location.href = '/'
    //     }
    //     // else{
    //     //  (async () => {
    //     //    try {
    //     //      const {data} = await axios.get(   
    //     //                     'http://localhost:8000/home/', {
    //     //                      headers: {
    //     //                         'Content-Type': 'application/json'
    //     //                      }}
    //     //                    );
    //     //      setMessage(data.message);
    //     //   } catch (e) {
    //     //     console.log('not auth')
    //     //   }
    //     //  })()};
    //  }, []);
     return(
        <>
            <Navigation></Navigation>
            <Row style={{marginRight:"0"}}>
                <Col lg={2} className="d-none d-lg-block">
                <Nav  defaultActiveKey="/dashboard" className="flex-column bg-dark">
                    <Nav.Link href="/dashboard" className="text-white"><SpeedIcon color="lightblue"/>{' '}Home</Nav.Link>
                    <Nav.Link href="/dashboard/usermanager" className="text-white"><Diversity3Icon color="lightgreen"/>{' '}User Management</Nav.Link>
                </Nav>
                </Col>
                <Col lg={10} md={12} sm={12} xs={12} className="content-right-wrapper">
                    <Routes>
                        {/* <Route path="/dashboard/usermanager" element={<Prueba/>}/> */}
                    </Routes>                
                </Col>
            </Row>
        </>

     );
    }
        