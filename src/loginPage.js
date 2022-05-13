import './App.css';
import React, { useState } from 'react';
import io from "socket.io-client";
import LoginButton from './component/login-page-file/loginButton.js';
import {useAuth0} from "@auth0/auth0-react";



const socket = io.connect("http://localhost:3001");
function Page() {
  const {user, isAuthenticated, isLoading} = useAuth0();
  return (
    <div>
    <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
</div>
<form class='login-page'>
<h3>Welcome to <br/>Mini <br/>Bloomberg™ Terminal!</h3>
    
    <h3><LoginButton></LoginButton></h3>
    
      </form>
      
    </div>



  );
}

export default Page;