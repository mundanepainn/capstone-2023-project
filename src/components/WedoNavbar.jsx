import React from "react";
import { BottomNavigation, Button, Popper, List, ListItem, IconButton } from "@mui/material";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

// WeDo's bottom navigation bar

const wedonavtext = {
    color:'white',
    padding: '2px 10px',
    margin: '5px',
    borderRadius: '5px',
    border:'none',
    '&:active': {
        borderRadius: '0', // Make the icon rectangular when active
        boxShadow: 'none', // Remove box shadow when active
      },
    "&:hover":{
        backgroundColor: '#4e84ee',
        color: 'black',
    }
}

// hosting and attending popper
const wedonavpopper = {
    zIndex: 1,
    backgroundColor: '#4e84ee',
    color:'white',
    padding: '-7px',
    borderRadius: '5px',
    width: '125%',
    
    "&:hover":{
        backgroundColor: 'white',
        color: 'black'
    }
}

function WedoNavbar({chatfunc = null}) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const split = Boolean(anchorEl);
    const id = split ? 'simple-popper' : undefined;
    if (chatfunc == null) {
        chatfunc = () => navigate("/chat")
    }
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };
    
    return (
        <>
        {/* hosting and attending popper when third icon is clicked */}
        <Popper id={id} open={split} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={()=> setAnchorEl(null)}>
        <List>
        <ListItem>
        <Button sx={wedonavpopper} onClick={() => navigate("/hosting") }>Hosting</Button>
        </ListItem>
        <ListItem>
        <Button sx={wedonavpopper} onClick={() => navigate("/attending") /* Replace with Explore page*/}>Attending</Button>
        </ListItem>
        </List>
        </ClickAwayListener>
        </Popper>
        
        {/* bottom navbar with icons */}
        <BottomNavigation  className="wedonav" sx={{position:'fixed',bottom:'0',left:'0',right:'0',backgroundColor:'white',height:80}}>
            <IconButton sx={wedonavtext} onClick={() => navigate("/explore") /* Replace with Explore page*/}>
                <SearchIcon color= "action" className="wedonavtext"></SearchIcon>
            </IconButton>
            <IconButton  sx={wedonavtext} onClick={chatfunc /* Replace with Messages page*/}>
                <ChatIcon color= "action" className="wedonavtext"></ChatIcon>
            </IconButton>
            <IconButton  sx={wedonavtext} onClick={handleClick /* Replace with two popup buttons*/}>
                <EventIcon color= "action" className="wedonavtext"></EventIcon>
            </IconButton>
            <IconButton  sx={wedonavtext} onClick={() => navigate("/profile") /* Replace with "get user with id" profile page*/}>
                <AccountBoxIcon color= "action" className="wedonavtext">Profile</AccountBoxIcon>
            </IconButton>
        </BottomNavigation>
        </>
    );
}
export default WedoNavbar;