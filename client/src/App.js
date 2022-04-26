import React, { Component } from 'react';
import './App.css';
import NavbarMenu from './components/Navbar/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { history } from './helpers/history';
import { PrivateRoute } from './helpers/auth-helper';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <NavbarMenu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user/:userId' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='/user/edit/:userId' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
