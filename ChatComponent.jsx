import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  //const socket = io('http://localhost:9000'); // Assuming your server is running on localhost:9000

  // // useEffect(() => {
  // //   // Listen for incoming messages
  // //   socket.on('message', (data) => {
  // //     setMessages([...messages, data]);
  // //   });

  //   // Clean up socket connection when component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [messages]);

  // const sendMessage = () => {
  //   socket.emit('message', inputMessage);
  //   setInputMessage('');
  // };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChatComponent;
