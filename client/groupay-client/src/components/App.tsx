import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GroupPage from './GroupPage';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'

function AppNavigation () {
  const { currentUser } = useAuth();

  const appNotLogged = (
    <>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />}/>
    </>
  );

  const appLogged = (
    <>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Navigate to='/'/>} />
      <Route path='/signup' element={<Navigate to='/' />} />
      <Route path="/group/:groupName" element={<GroupPage />} />
      <Route path="*" element={<h1>404 page not found</h1>} />
    </>
  );

  return (
    <Routes>
      {currentUser ? appLogged : appNotLogged }
    </Routes>
  )
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <AppNavigation />
      </Router>
    </AuthProvider>
  );
}

export default App;
