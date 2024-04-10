import React, {useState} from "react";
import { Badge, ToggleButton, ToggleButtonGroup, FormControlLabel, 
FormControl, Slider, AppBar, Toolbar, TextField, Avatar, InputBase, 
IconButton, Paper, Divider,Button, ButtonGroup, 
Dialog, DialogTitle, DialogContent,DialogActions, 
Accordion, AccordionSummary, AccordionDetails,
Switch, Box, Chip } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from '@mui/icons-material/Tune';
import styled from "styled-components";
import weDoLogo from '../assets/logo.svg';
import { MyContext } from "../pages/ContextManager";
import { useNavigate } from "react-router-dom";





const TopNavBar = (props) => {
const [open,setOpen] = useState(false);
const [text, setText] = useState("")
const [age, setAge] = useState([18, 100])
const [ageRestrict, setAgeRestrict] = useState(false);
const [sortValue, setSortValue] = React.useState('web');
const [categories, setCategories] = useState([]);
const CustomFormControlLabel = styled(FormControlLabel)({
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 30,
  // margin: '8px',
  // Add more custom styles here
});
const options = ["Sports", "Outdoor", "Socialising", "Learning", "Travel", "Entertainment", "Gaming", "Movies", "Technology", "Art", "Competitive",
"Nature", "Mind & Body Wellness", "History & Culture", "Language", "Science", "Food", "Self Improvement",
"Adventure" ]
const handleOpen = ()=>{
  setOpen(true);
};
const handleClose = ()=>{
  setOpen(false);
};
const enterPress = (event) => {
  if (event.key === "Enter") {
    props.func(text);
  }
}
const handleChange = (event, newRange) => {
  setAge(newRange);
};
const handleChange2 = (event, newSortValue) => {
  setSortValue(newSortValue);
};
const addInterest = (interest) => {
  if (categories.includes(interest) == false) {
  setCategories((current) => [...current, interest])
  }
  else {
      deleteInterest(interest)
  }
}
const deleteInterest = (interest) => {
  setCategories((current) => 
      current.filter((option) =>
          option != interest
      )
  )
}
const selectedChipStyle = {
  backgroundColor: '#9977ea'
}
const chipStyle = {
  backgroundColor: '#eaeaff',
  margin: "3px"
}

const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ justifyContent: "space-between", top: 0, left: 0, right: 0, backgroundColor: 'white',  "& > *": { margin: '0 0' } }} >  {/*/ last argument adds margins to all elements*/}
      {/* <Toolbar  sx={{ justifyContent: "space-between", alignItems: "center" }}> styling mainly to center elements and add spaces between them */}

      {/* <Avatar/> */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height:'100%'}}> 
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}> 
         <img onClick={() => navigate("/")} src={weDoLogo} className="logo react" alt="React logo" style={{cursor:"pointer", width: "12%", height:"12%", alignItems: 'center', float:"left", marginLeft: "0.5vh"}}/>
       <div style={{ display: 'flex', float:'right', alignItems:'center'}}>

        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', marginRight: '5%'}}
        >
          {/* <InputBase */}
            {/* // sx={{ ml: 1, flex: 1 }} */}
          {/* /> */}
          <InputBase 
            onKeyDown={enterPress} 
            onChange={(e)=>{setText(e.target.value)}} 
            sx={{padding: 0.8, alignItems:'center'}} 
            placeholder="Search Activities">
          </InputBase>

          <IconButton type="button" sx={{ p: '10px' }} onClick={()=>{props.func(text);}}>
            <SearchIcon />
          </IconButton>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />


          <IconButton type="button" onClick={handleOpen}>
            <TuneIcon />
          </IconButton>
        </Paper>
        <Dialog
              open={open}
              onClose={handleClose}
              scroll="paper"
              >
              <DialogTitle>Sort & Filter</DialogTitle>

              <DialogContent dividers={true} >
              <ToggleButtonGroup
                color="primary"
                value={sortValue}
                exclusive
                onChange={handleChange2}
                aria-label="Platform"
                >
                <ToggleButton value="name">Name</ToggleButton>
                <ToggleButton value="date">Date</ToggleButton>
                <ToggleButton value="location">Location</ToggleButton>
                </ToggleButtonGroup>
                <Box>
                {options.map((option) => (
                    <>
                    {categories.includes(option)? <Chip sx={selectedChipStyle} label={option} onClick={() => addInterest(option)}/> : <Chip sx={chipStyle} label={option} onClick={() => addInterest(option)}/>}
                    </>
                ))}
                </Box>
                <Accordion sx={{border:'none',boxShadow:'none'}} expanded={ageRestrict}>
              <AccordionSummary>
              <CustomFormControlLabel style={{marginLeft: '8px'}}
                id="age-restrict"
                label="Age restriction"
                control={
              <Switch
                    
                    checked={ageRestrict}
                    onChange={() => setAgeRestrict(!ageRestrict)}
                  />}/>
              </AccordionSummary>
              <AccordionDetails>
              <CustomFormControlLabel style={{width:'100%'}}
                id="age-range"
                label="Age Range"
                control={
                  <Slider
                    disableSwap
                    min={18}
                    max={100}
                    value={age}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                  />
                }
              />

              </AccordionDetails>
              </Accordion>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {setOpen(false); props.func2({sortValue: sortValue, age: age, categories: categories}); }}>Sort</Button>
                <Button onClick={handleClose}>Return</Button>
              </DialogActions>
            </Dialog>
       </div>

        </div>
        </div>
        
       
      {/* </Toolbar> */}
    </AppBar>
  );
};

export default TopNavBar;
