import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GroupPage from './GroupPage';
import { useAuth } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';

function AppNavigation () {
  const { currentUser } = useAuth();

  const appNotLogged = (
    <>
      <Route exact path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />}/>
    </>
  );

  const appLogged = (
    <>
      <Route exact path='/' element={<Dashboard />} />
      <Route path='/login' element={<Dashboard />} />
      <Route path='/signup' element={<Dashboard />} />
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
    <Router>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </Router>
  );
}

export default App;
