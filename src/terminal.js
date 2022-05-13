import './App.css';
import Stock from './component/terminal-file/Stock.js';
import React, { useState } from 'react';
import Cpyovw from './component/terminal-file/Cpy_Ovrw.js';
import EconIndicator from './component/terminal-file/EconIndicator.js';
import News from './component/terminal-file/News.js';
import Chat from './component/terminal-file/Chat.js';
import io from "socket.io-client";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from './component/terminal-file/logoutButton.js';
import Footer from "./component/terminal-file/footer.js";




const socket = io.connect("http://localhost:3001");
function Terminal() {
    const [username, setUsername] = useState("");
    const [room , setRoom] = useState("");
    const [showChat , setShowChat] = useState(false);
    const {user, isAuthenticated, isLoading} = useAuth0();
    const joinRoom =()=>{
        if (username !== "" && room !== ""){
          socket.emit("join_room", room);
          setShowChat(true);
        }
    }
    if (isLoading){
        return <div>Loading!</div>
    }
  return (
    isAuthenticated &&
    (
    <div className="App">
      <div className='title'> Mini Bloomberg™ Terminal
      
      <div className='logout' align="right"><LogoutButton></LogoutButton></div>
      </div>
      <div className="search-box">
      
      <div className="try"> <Stock ></Stock></div>
          <div className="try"><Cpyovw></Cpyovw></div>
          
          <div className="try"><EconIndicator></EconIndicator></div>
          
          <div className="try-1"><News></News></div>
          
         
        
        
          <div className= "livechat">ChatRoom</div>

{!showChat ? (<div className='joinChatContainer'>

  <input type ='text' placeholder='Name...' onChange={(event)=>{
    setUsername(event.target.value);
    }} className="input-1"/>
  <input type ='text' placeholder='Room ID...'onChange={(event)=>{
    setRoom(event.target.value);
    }} className="input-1"/>
  <button onClick={joinRoom} className="button-59">Join a Room</button>
    
</div>) :
( <Chat socket = {socket} username = {username} room ={room}/>)}
       </div> 
       <div className = "footer"> <Footer/></div></div>
   )
  );
}

export default Terminal;
