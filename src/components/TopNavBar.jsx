import React from "react";
import { AppBar, Toolbar, TextField, Icon, Avatar } from "@mui/material";
import {Badge} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from "@mui/icons-material/Search";


const TopNavBar = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, backgroundColor: 'white', "& > *": { margin: '8 8' } }} >  {/*/ last argument adds margins to all elements*/}
      <Toolbar  sx={{ justifyContent: "space-between", alignItems: "center" }}> {/* styling mainly to center elements and add spaces between them*/}

      <Avatar/>
        <div  style={{ display: "flex", alignItems: "center" }}> 
         
         <div style={{  display: "flex", flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
        
        <TextField
        id="outlined-search-1" 
        label="Find activity"
        variant="outlined"
        fullWidth 
        padding 
        height = '50%'
        color="secondary"   
      />{/*/ color argument value from mui documentation */}
       <SearchIcon color="action"/>


      </div>

        </div>
        <Badge badgeContent={4} color="success"> {/*/ color argument value from mui documentation*/}
  <MailIcon color="action" />
        </Badge>
        
       
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
