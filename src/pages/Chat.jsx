import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Box, SwipeableDrawer, Button, List, ListItem, Divider, Avatar, Typography, AppBar, TextField, IconButton } from '@mui/material';
import { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import dayjs from "dayjs";

const drawerStyle = {
  width: '500px'
}
const chatBarStyle = {
  zIndex:0,
  position: 'fixed',
  bottom: '80px',
  top: 'auto',
  height: '60px',
  backgroundColor: 'white',
  boxShadow: 'none',
  borderStyle: 'solid',
  borderColor: 'black',
  justifyContent: ''
}

const sendIconStyle = {
  color: 'black'
}

const messageBoxStyle = {
  backgroundColor: '#eaeaea',
  position: 'absolute',
  top: '60px',
  bottom: '140px',
  left: '0%',
  right: '0%',
  display: 'flex',
  marginTop: "35px",
  flexDirection: 'column-reverse',
  overflow: 'auto'
}

const mutualMessageStyle = {
  backgroundColor: "black",
  color: 'white',
  padding: '5px',
  flexDirection: 'row'
}

const userMessageStyle = {
  backgroundColor: "white",
  color: 'black',
  padding: '5px',
  flexDirection: 'row-reverse'
}

const chatListItemStyle = {
  "&:hover":{
    backgroundColor: 'gray',
    color: 'white'
  }
}


const Chat = () => {
  const [draw, setDraw] = useState(true);
  const [id, setId] = useState("1234");
  //user for now is id: 1111
  let users = [
    {id: "1234", name: "Shirley"},
    {id: "1235", name: "Kerry"},
    {id: "2341", name: "Irisviel"},
    {id: "4132", name: "Waver"}
  ]

  const dayjsFormat = "D/M/YYYY HH:mm:ss"
  let messages = [
    {senderId: '1234', receiverId: '1111', message: "shirley to user 1", datetime: dayjs("13/12/2022 15:45:56", dayjsFormat)},
    {senderId: '1111', receiverId: '1234', message: "user to shirley 1", datetime: dayjs("13/12/2022 15:50:10", dayjsFormat)}, 
    {senderId: '1234', receiverId: '1111', message: "shirley to user 2", datetime: dayjs("13/12/2022 16:00:30", dayjsFormat)},
    {senderId: '1111', receiverId: '1234', message: "user to shirley 2", datetime: dayjs("13/12/2022 16:05:56", dayjsFormat)},
    {senderId: '1234', receiverId: '1111', message: "shirley to user 3", datetime: dayjs("13/12/2022 15:45:56", dayjsFormat)},
    {senderId: '1111', receiverId: '1234', message: "user to shirley 3", datetime: dayjs("13/12/2022 15:50:10", dayjsFormat)}, 
    {senderId: '1234', receiverId: '1111', message: "shirley to user 4", datetime: dayjs("13/12/2022 16:00:30", dayjsFormat)},
    {senderId: '1111', receiverId: '1234', message: "user to shirley 4 this message tests overflowe fctvgyuhsad asy8dbyfiei sdub", datetime: dayjs("13/12/2022 16:05:56", dayjsFormat)},
    {senderId: '1234', receiverId: '1111', message: "shirley to user 5", datetime: dayjs("13/12/2022 15:45:56", dayjsFormat)},
    {senderId: '1111', receiverId: '1234', message: "user to shirley 5", datetime: dayjs("13/12/2022 15:50:10", dayjsFormat)}, 
    {senderId: '1234', receiverId: '1111', message: "shirley to user 6", datetime: dayjs("13/12/2022 16:00:30", dayjsFormat)},
    {senderId: '1111', receiverId: '1234', message: "user to shirley 6", datetime: dayjs("13/12/2022 16:05:56", dayjsFormat)},
    {senderId: '2341', receiverId: '1111', message: "irisviel to user 1", datetime: dayjs("13/12/2022 16:00:30", dayjsFormat)},
    {senderId: '1111', receiverId: '2341', message: "user to irisviel 1", datetime: dayjs("13/12/2022 16:05:56", dayjsFormat)}
  ]

  const [messageDisplay, setMessageDisplay] = useState(messages);

  const changeDisplay = (userid) => {
    setId(userid)
    setDraw(false)
  }

  const sendMessage = () => {
    let messageString = document.getElementById('textInput').value;
    if (messageString.length > 0) {
    let newMessage = {senderId: '1111', receiverId: id, message: messageString, datetime: dayjs()};
    setMessageDisplay((prevMessages) => [...prevMessages, newMessage]);
    document.getElementById('textInput').value = '';
    }
    //console.log(messages);

  }

  const enterSend = (event) => {
    if (event.key === "Enter") {
      console.log('enterSend');
      sendMessage();
    }
  }

  const toggleDrawer = (bool) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDraw(bool);
  };

  return (
    <>
    <TopNavBar/>
      <SwipeableDrawer
        anchor="left"
        open={draw}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={drawerStyle}>
  
        <Box>
          <Typography>Chats</Typography>
          <List>
            
            {users.map((user,index)=>(
              <div key={index}>
    
              <ListItem sx={chatListItemStyle} onClick={() => changeDisplay(user.id)}>
              <Avatar>{index /* Image Source needed for each mutual*/}</Avatar>
              <Typography>{user.name /* Username */}</Typography>
              </ListItem>
              <Divider />
              </div>
            ))}
          </List>
        </Box>

      </SwipeableDrawer>
      <Box sx={messageBoxStyle}>
        <List>
          {console.log(messageDisplay)}
          {messageDisplay.map((message) => (
            <>
            {message.senderId == id || message.receiverId == id ? <>
              {message.senderId == "1111" ? 
              <ListItem sx={{flexDirection: 'row-reverse'}}>
              <Box sx={userMessageStyle} style={{borderRadius:"17px", padding:"15px"}}>
                <Typography>{message.message}</Typography>
              </Box> 
              </ListItem> : 
              <ListItem>
              <Box sx={mutualMessageStyle} style={{borderRadius:"17px", padding:"15px"}}>
                <Typography>{message.message}</Typography>
              </Box>
              </ListItem>
              } </> : null}
            </>
          )
          )}
        </List>
      </Box>
      <AppBar sx={chatBarStyle}>
        <Box>
        <Button onClick={toggleDrawer(true)} style={{top:"14%", marginRight:"5px"}}>Chats</Button>
          <TextField id='textInput' onKeyDown={enterSend} size='Small'/>
          <IconButton style={{top:"14%", marginLeft:"5px"}} onClick={sendMessage}>
          <SendIcon sx={sendIconStyle}/>
          </IconButton>
        </Box>
      </AppBar>
      <WedoNavbar/>
    </>
  )
}

export default Chat;