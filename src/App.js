import './index.css';
import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomeLayout from './layouts/home/HomeLayout';
import HomePage from './pages/home/HomePage';
import Login from './components/Login';
import UserManagement from './pages/admin/UserManagement';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeLayout />}>
            <Route index element={<HomePage />}/>
            <Route path='/login' element={<Login/>}/>
          </Route>
          <Route path='/admin' element={<HomeLayout />}>
            <Route index element={<UserManagement />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
