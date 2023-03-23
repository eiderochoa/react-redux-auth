// Import the react JS packages
import { Navigation } from "./Navigation";
import { Col, Row, Nav } from "react-bootstrap";
import SpeedIcon from '@mui/icons-material/Speed';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Route, Routes } from "react-router-dom";
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserManagementDataGrid } from "./usermanager/UserManagement-datagrid";
import RequireAuth from "../auth/RequireAuth";
import { Link } from 'react-router-dom';
// Define the Login function.
export const Home = () => {
    
     return(
        <>
            <Navigation></Navigation>
            <Row style={{marginRight:"0"}}>
                <Col lg={2} className="d-none d-lg-block">
                <Nav  defaultActiveKey="/dashboard" className="flex-column bg-dark">
                    <Link to="/dashboard" className="nav-link text-white"><SpeedIcon color="lightblue"/>{' '}Home</Link>
                    <Link to="/dashboard/usermanager" className="nav-link text-white"><Diversity3Icon color="lightgreen"/>{' '}User Management</Link>
                </Nav>
                </Col>
                <Col lg={10} md={12} sm={12} xs={12} className="content-right-wrapper">
                    <Routes>
                        <Route element={<RequireAuth/>}>
                            <Route path="/usermanager" element={<UserManagementDataGrid/>}/>
                        </Route>
                        
                    </Routes>                
                </Col>
            </Row>
        </>

     );
    }
        