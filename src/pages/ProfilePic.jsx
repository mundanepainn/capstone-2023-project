import { Box, Paper, Typography, Button, Grid} from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from "./ContextManager";

//CSS objects
const imageStyle = {
    //maxWidth: '100px',
    //maxHeight: '100px',
    width: '220px',
    height: '220px',
    border: 'solid 1px black',
    borderRadius: '10px',
    backgroundColor: "white"
}
const imageContainerStyle = {
    //width: '100px',
    //height: '100px',
    margin: 'auto',
    //border: 'solid 1px black',
    //borderRadius: '10px'
}
const containerStyle = {
    backgroundColor: '#f5f5f5'
}
const btnStyle = {
    border: 'solid 1px black',
    borderRadius: '10px',
    margin: "5px 0px 20px 0px",
    backgroundColor: "white"
    
}

const ProfilePic = () => {
    //const [file, setFile] = useState(DefaultPic);
    const {
        userPic, setProfilePic,
    } = React.useContext(MyContext);
    const navigate = useNavigate();
    //Upload photo from computer function
	function handleChange(e) {
		console.log(e.target.files);
		setProfilePic(URL.createObjectURL(e.target.files[0]));
	}
    return (
        <>
        <Grid container justifyContent="center">
			<Paper elevation={0} sx={containerStyle}>
                
                <Typography style = {{margin: "40px 50px 15px 50px"}}>Upload Your Profile Picture:</Typography>

                <Box sx={imageContainerStyle}>
                {/*Display Profile Photo*/}
                <Box component='img' sx={imageStyle} src={userPic}/>
                </Box>
                {/*Upload Photo Button*/}
                <Button sx={btnStyle} variant="filled" component='label'> Upload Image <input type="file" hidden onChange={handleChange} /></Button>
                <Box>
                    <Button style={{margin:"20px 0px 20px 0px"}} onClick={() => navigate('/signup/gender')}>Back</Button>
                    <Button style={{margin:"20px 0px 20px 0px"}} onClick={() => navigate('/signup/interests')}>Next</Button>
                </Box>
            </Paper>
        </Grid>
        </>
    )
}

export default ProfilePic