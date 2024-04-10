import React from 'react';
import { MyContext } from "./ContextManager";
import { Typography,Button , Paper} from '@mui/material';

const ConfirmActivity = ()=>{
    const {
        options,
        gender,
        setGender,
        age,
        setAge,
        activityName,
        setActivityName,
        activityDescription,
        setActivityDescription,
        privateActivity,
        setPrivateActivity,
      } = React.useContext(MyContext);
    

    return(<>
    {/* Just a simple card to display information, uses context variables*/}
    <div id='confirmation-title'>
   <Typography sx={{position:'fixed',top:0,left:0,right:0,padding:5}} variant='h4'>Review activity details</Typography>
   </div>
   <div id='paper-content'>

   <Paper  elevation={3} sx={{ padding: '20px',margin:5 }}>
        <Typography  variant="h6" sx={{borderBottom:'solid',borderBottomWidth:'100%',marginBottom:4}}>Event Information</Typography>
        <Typography variant="body1" sx={{margin:2}}>Activity Name: {activityName}</Typography>
        <Typography variant="body1 " sx={{margin:2}}>Gender: {gender}</Typography>
        <Typography variant="body1" sx={{margin:2}}>Age range: {age[0]} - {age[1]}</Typography>
        <Typography variant="body1" sx={{margin:2}}>
          Private Activity: {privateActivity.toString()}
        </Typography>
        <Typography variant="body1" sx={{margin:2}} >Activity Description: {activityDescription}</Typography>
    </Paper>
    </div>

   <Button id="confirmation-button" variant="contained" color="primary">
        Confirm details
      </Button>
    
    </>);
};
export default ConfirmActivity;