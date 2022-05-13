import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket, username, room}){
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [once, setOnce] = useState(false);

    const sendMessage = async () =>{
        if (currentMessage !==""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours()+":"
                +new Date(Date.now()).getMinutes(),
            }
            console.log(messageData);
            await socket.emit("send_message", messageData);
            setMessageList((list)=>[...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        let isCancel = false;
        
        socket.on("receive_message", (data)=>{
            if (!isCancel){
            setMessageList((list)=>[...list, data]);
            console.log("receivec once:", once);
            console.log(isCancel);
            setOnce(true);}

        });
        return () => {isCancel = true;};
    }, [socket]);


    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>LiveChat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
            {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input type="text" 
                value={currentMessage}
                placeholder='Hey...' 
                onChange={(event)=> {
                    setCurrentMessage(event.target.value);
                    }}
                    
                onKeyPress = {(event)=>
                    {event.key ==="Enter"&& sendMessage();
                }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>

    )
}

export default Chat