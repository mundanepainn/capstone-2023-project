import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Box, SwipeableDrawer, Button, List, ListItem, Divider, Avatar, Typography, AppBar, TextField, IconButton } from '@mui/material';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import { InputBase } from '@mui/material-next';
import { split } from 'postcss/lib/list';
import io from 'socket.io-client';
import { MyContext } from "./ContextManager";



const drawerStyle = {
  width: '500px'
}
const chatBarStyle = {
  zIndex: 0,
  position: 'fixed',
  bottom: '80px',
  top: 'auto',
  height: '60px',
  backgroundColor: 'white',
  boxShadow: 'none',
  borderTop: '1px solid #e6e9ed',
  borderBottom: '1px solid #e6e9ed',
  justifyContent: ''
}

const textFieldStyle = {
  border: '1px solid #cecece',
  borderRadius: '20px',
  padding: '0px 10px',
  fontFamily: 'Hind',
  height: '100%',
  top: '20%'
}

const sendIconStyle = {
  color: 'black',
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
  "&:hover": {
    backgroundColor: 'gray',
    color: 'white'
  }
}


const Chat = () => {
  const base_url = import.meta.env.VITE_BACKEND;
  const [draw, setDraw] = useState(true);
  const [id, setId] = useState("John Doe");
  const [user, setUser] = useState([]);
  const [chatLog, setChatLog] = useState(null);
  const [messages, setMessages] = useState(null);
  const [testMessages, setTestMessages] = useState([])
  const [currentChatID, setCurrentChatID] = useState(0);
  const [chatRoomsList, setChatRoomsList] = useState([]);
  const [lastMessageTime, setLastMessageTime] = useState(100000000);
  const [dictPic, setDictPic] = useState({})
  const [participantDictPic, setparticipantDictPic] = useState({})
  const [dictName, setDictName] = useState({})
  const [inputMessage, setInputMessage] = useState('');
  const {
    socket, setSocket,
    newMessage, setNewMessage,
    messageDisplay, setMessageDisplay
  } = React.useContext(MyContext);

  const userID = localStorage.getItem('userID');
  //if (socket != '') {
  //socket.on('message', (data) => {
  try {
    console.log('Received message', data)
    console.log(currentChatID)
    if (data.chatRoomName == currentChatID) {
      setNewMessage(data.newMessageString)
      setMessageDisplay([...messageDisplay, data.newMessageString])
    }

  } catch (error) {
    console.log(error)
  }

  // })
  //}


  // useEffect(() => {
  //   return () => {
  //     if (socket != '') {
  //       socket.disconnect();
  //     }
  //   };
  // }, []);
  /*   useEffect(() => {
      console.log(newMessage, "test")
      socket.on('message', (data) => {
        console.log('Received message', data)      
        setNewMessage(data)
        setMessageDisplay([...messageDisplay, data])
      })
      
      // Clean up socket connection when component unmounts
      return () => {  
        socket.disconnect();
      };
    }, [socket]); */

  //user for now is id: 1111

  /*   async function findSenderPic(id) {
      const res = await fetch(`base_url/testAPI/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const senderData = await res.json();
      return senderData["Item"]["profilePhoto"];
      // You can now use senderData["Item"] to access the sender's data
    } */


  useEffect(() => {
    console.log("how many times1");
    //setSocket(io("http://127.0.0.1:5001/wedo-1a85a/us-central1/Myapi"));
    async function findUser(id) {
      const res = await fetch(base_url + `/testAPI/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const userData = await res.json();

      // console.log(userData)
      // console.log("testUserData", userData["Item"]["chatRooms"])
      setUser(userData["Item"])
      setChatRoomsList(userData["Item"]["chatRooms"]) //get a list of chatrooms that user is in
    }
    findUser(userID)   //this is the user's ID
    /*
    return () => {
      socket.disconnect();
    }*/
  }, [])

  useEffect(() => {
    if (chatRoomsList.length > 0) {
      console.log("how many times2", chatRoomsList)
      async function fetchActivityPhoto(id) {
        const res = await fetch(base_url + `/activitiesAPI/activities/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const senderData = await res.json();
        return senderData["Item"]["photoURL"];
        // You can now use senderData["Item"] to access the sender's data
      }
      try {
        const newList = chatRoomsList.filter((chatRoom) => chatRoom.length > 30)
        const fetchPromises = newList.map((chatRoom) => {
          return fetchActivityPhoto(chatRoom.substring(0, chatRoom.indexOf(",")));
        })
        Promise.all(fetchPromises).then((results) => {
          const chatPhotoJason = {};
          newList.forEach((chatRoom, index) => {
            chatPhotoJason[chatRoom.substring(0, chatRoom.indexOf(","))] = results[index];
          });
          setDictPic(chatPhotoJason)
        })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }


  }, [chatRoomsList])


  useEffect(() => {
    console.log("how many times3")
    async function findSenderPicAndName(id) {
      const res = await fetch(base_url + `/testAPI/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const senderData = await res.json();
      return { pic: senderData["Item"]["profilePhoto"], name: senderData["Item"]["name"] };
    }

    // console.log("rerender", currentChatID)
    // console.log("testChatRoomsList", chatRoomsList)
    const chatID = currentChatID
    async function fetchChatLog(chatID) {
      const response = await fetch(base_url + `/chatLogsAPI/chatLog/${chatID}`, {     //get ChatLog details
        method: "GET",                                    //e.g. chatSender, chatContent, timeStamp, participants
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jason = await response.json();
      const chatLine = jason["Item"]
      /* console.log("JASON!!!!!!!", jason)
      console.log("chatLine", chatLine) */

      //after getting the chatLog details, generate a dictionary of user profile pictures
      try {
        const fetchPromises = chatLine["participants"].map((sender) => {
          return findSenderPicAndName(sender);
        })
        Promise.all(fetchPromises).then((results) => {
          const userPhotoJason = {};
          const userNameJason = {};
          chatLine["participants"].forEach((sender, index) => {
            userPhotoJason[sender] = results[index]["pic"];
            userNameJason[sender] = results[index]["name"].split(",").join(" ")
          });
          setparticipantDictPic(userPhotoJason)
          setDictName(userNameJason)
        })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }


      if (chatLine) {

        // console.log("chatlist", chatLine)
        let messagesList = []                                                 //generate list of messages
        for (let i = 0; i < chatLine["chatContent"].length; i++) {
          messagesList.push({ senderId: chatLine["chatSender"][i], message: chatLine["chatContent"][i], datetime: chatLine["timeStamp"][i] })
        }
        setMessageDisplay(messagesList)                                 //set the messages to be displayed, messageList
      } else {
        setMessageDisplay(null)
      }

      // setChatLog(jason[0])
      return jason
    }
    const chatLine = fetchChatLog(chatID);


  }, [currentChatID])

  /*    useEffect(() => {
       try {
         console.log("1", chatLog["chatContent"][0], chatLog["chatSender"][0], chatLog["timeStamp"][0])
         console.log("2", chatLog["chatContent"][1], chatLog["chatSender"][1], chatLog["timeStamp"][1])
         console.log("3", chatLog["chatContent"][2], chatLog["chatSender"][2], chatLog["timeStamp"][2])
         console.log("4", chatLog["chatContent"][3], chatLog["chatSender"][3], chatLog["timeStamp"][3])
          let messagesList = []
             console.log("CHAT", chatLog)
             for (let i=0; i<chatLog["chatContent"].length; i++) {
               messagesList.push({senderId:chatLog["chatSender"][i], message:chatLog["chatContent"][i], datetime:chatLog["timeStamp"][i]})
             }
             setMessageDisplay(messagesList)
       } catch (error) {
         console.log(error)
       }
   } ,[chatLog])
  */



  /* chatLog.forEach((chatLine) => { messagesList.push(
    {senderId:chatLine["chatSender"], message:chatLine["chatContent"], datetime:chatLine["timeStamp"]}
  )}) */


  let chatRooms = [] /* = [
    {id: "1234", name: "test"},
    {id: "1235", name: "Kerry"},
    {id: "2341", name: "Irisviel"},
    {id: "4132", name: "Waver"}
  ] */
  if (chatRoomsList) {
    // console.log("MORETEST", chatRoomsList)
    chatRoomsList.forEach((chatRoom) => { chatRooms.push({ id: chatRoom.split(",")[0], name: chatRoom.split(",")[1] }) })
    chatRoomsList.sort((a, b) => a.substring(a.indexOf(",")).localeCompare(b.substring(b.indexOf(","))))
  }

  // const dayjsFormat = "D/M/YYYY HH:mm:ss"
  /* let messages = [
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
  ] */



  const changeDisplay = (chatID, chatName) => {
    // setId(chatID)
    const aString = chatID + "," + chatName
    // fetchChatLog()
    // console.log("USERID", chatName)
    setCurrentChatID(aString)
    setDraw(false)
  }

  async function sendMessage() {
    const response = await fetch(base_url + `/chatLogsAPI/chatLog/${currentChatID}`, {     //get ChatLog details
      method: "GET",                                    //to check if user is still a participant
      headers: {
        "Content-Type": "application/json",
      },
    })

    const theRes = await response.json()

    if (!theRes["Item"]["participants"].includes(userID)) {
      alert("You are no longer a part of this chat")
      return
    }
    let messageString = document.getElementById('textInput').value;

    // console.log(currentChatID)
    if (messageString.length > 101) {
      alert("Your message must be 100 characters or less. Please go use a chatting app for long messages")
      return
    }
    const timeNow = new Date()
    // console.log("test", timeNow - lastMessageTime, messageDisplay)
    if (timeNow - lastMessageTime < 1500) {
      alert("Plese do not spam your messages. Please go use a chatting app for spamming")
    }
    setLastMessageTime(timeNow)
    if (messageString.length > 0) {
      let newMessageString = { senderId: userID, receiverId: id, message: messageString, datetime: String(timeNow) }; //replace with User ID
      /*  if(messageDisplay == null) {
         // console.log("CHANGED", newMessageString)
         setMessageDisplay([newMessageString])
       } else {
         setMessageDisplay((previousMessages) => [...previousMessages, newMessageString]);
         
       } */
      // console.log("TEST MESSAGE PARAMETERS", currentChatID, userID, messageString, timeNow)
      document.getElementById('textInput').value = '';
      const sendJason = { newMessageString: newMessageString, chatRoomName: currentChatID }
      //socket.emit('message', sendJason)
      setInputMessage('')
    }

    await fetch(base_url + "/chatLogsAPI/chatLine", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: currentChatID,
        chatSender: userID, //replace with User ID,
        chatContent: messageString,
        timeStamp: timeNow + ""
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    })

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

  return messageDisplay ? (
    <>
      <TopNavBar />
      <SwipeableDrawer
        anchor="left"
        open={draw}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={drawerStyle}>

        <Box>
          <Typography>Chats</Typography>
          <List>

            {chatRooms.map((chat, index) => (
              <div key={index}>

                <ListItem sx={chatListItemStyle} onClick={() => changeDisplay(chat.id, chat.name)}>
                  <Avatar>{<img src={dictPic[chat.id]} width="100%" height="100%"></img> /* Image Source needed for each mutual*/}</Avatar>
                  <Typography>{chat.name /* Username */}</Typography>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>

      </SwipeableDrawer>
      <Box sx={messageBoxStyle}>
        <List>
          {/* {console.log("What is this", messageDisplay)} */}
          {messageDisplay && messageDisplay.map((message) => (
            <>
              {message.senderId == userID ?
                <ListItem sx={{ flexDirection: 'row-reverse' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Box sx={userMessageStyle} style={{ borderRadius: "17px", padding: "15px", maxWidth: "60vw", wordWrap: "break-word" }}>
                      <Typography>{message.message}</Typography>
                    </Box>
                    <Typography>{message.datetime.indexOf("GMT") != -1 ?
                      message.datetime.substring(message.datetime.indexOf(":") - 2, message.datetime.lastIndexOf(":")) :
                      message.datetime
                    }</Typography>
                  </div>
                </ListItem>

                :
                <ListItem>
                  <Avatar>{<img src={participantDictPic[message.senderId]} width="100%" height="100%"></img> /* Image Source needed for each mutual*/}</Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography>{dictName[message.senderId]}</Typography>
                    <Box sx={mutualMessageStyle} style={{ borderRadius: "17px", padding: "15px", marginLeft: "5px", maxWidth: "60vw", wordWrap: "break-word" }}>
                      <Typography>{message.message}</Typography>
                    </Box>
                    <Typography>{message.datetime.indexOf("GMT") != -1 ?
                      message.datetime.substring(message.datetime.indexOf(":") - 2, message.datetime.lastIndexOf(":")) :
                      message.datetime
                    }</Typography>
                  </div>
                </ListItem>
              }
            </>
          )
          )}
        </List>
      </Box>
      <AppBar sx={chatBarStyle}>
        <Box>
          <Button onClick={toggleDrawer(true)} sx={{ top: "20%", marginRight: "5px" }}>Chats</Button>
          <InputBase sx={textFieldStyle} id='textInput' onKeyDown={enterSend} />
          <IconButton style={{ top: "20%", marginLeft: "5px" }} onClick={() => sendMessage()}>
            <SendIcon sx={sendIconStyle} />
          </IconButton>
        </Box>
      </AppBar>
      <WedoNavbar chatfunc={toggleDrawer(true)} />
    </>
  ) : (
    <>
      <TopNavBar />
      <Typography>Say Something!</Typography>
      <SwipeableDrawer
        anchor="left"
        open={draw}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={drawerStyle}>

        <Box>
          <Typography sx={{ top: '20%' }}>Chats</Typography>
          <List>

            {chatRooms.map((chat, index) => (
              <div key={index}>

                <ListItem sx={chatListItemStyle} onClick={() => changeDisplay(chat.id, chat.name)}>
                  <Avatar>{<img src={dictPic[chat.id]} width="100%" height="100%" ></img> /* Image Source needed for each mutual*/}</Avatar>
                  <Typography>{chat.name /* Username */}</Typography>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>

      </SwipeableDrawer>
      <AppBar sx={chatBarStyle}>
        <Box>
          <Button onClick={toggleDrawer(true)} sx={{ top: '20%', marginRight: '5px' }}>Chats</Button>
          <InputBase sx={textFieldStyle} id='textInput' onKeyDown={enterSend} />
          <IconButton style={{ top: '20%', marginLeft: '5px' }} onClick={() => sendMessage()}>
            <SendIcon sx={sendIconStyle} />
          </IconButton>
        </Box>
      </AppBar>
      <WedoNavbar chatfunc={toggleDrawer(true)} />
    </>)
}

export default Chat;