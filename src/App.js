import './App.css';
import React, { useState } from 'react';
import Terminal from './terminal.js';
import io from "socket.io-client";
import LoginPage from './loginPage.js';
import {useAuth0} from "@auth0/auth0-react";






const socket = io.connect("http://localhost:3001");
function App() {
  const {user, isAuthenticated, isLoading} = useAuth0();
  return (
    isAuthenticated ? (<div><Terminal/></div>): <LoginPage/>
  );
}

export default App;
