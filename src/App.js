// import logo from './logo.svg';
import './App.css';


import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/UsersList'
import { Home } from './features/dashboard/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard/*" element={<Home/>}/>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
          {/* <Route path="/dashboard/usermanager" element={<UserManagementDataGrid/>}/> */}
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
