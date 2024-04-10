import { ImageList, ImageListItem,ImageListItemBar ,IconButton, Typography,Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import TopNavBar from "../components/TopNavBar";
import WedoNavbar from "../components/WedoNavbar";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./ContextManager";

const DisplayCategories = () => {
const navigate = useNavigate();
const [imageList, setImageList] = useState([]);
const {
  options,
  activityCategory, 
  setActivityCategory 
} = React.useContext(MyContext);

  useEffect(() => {
      async function fetchData() {
        try {
          // Api request that triggers lambda function through api gateway and fetch the s3 bucket items links to the category images.
          const response = await axios.get("https://3abwqs7lfb.execute-api.ap-southeast-2.amazonaws.com/default/getImageCategories");
          console.log(response.data);
          setImageList(response.data.objects);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    
      fetchData();
    }, []);

const imageNames = imageList.map((image)=>{

    let imageName = image.slice(image.lastIndexOf('/') + 1,image.lastIndexOf('.') );
    imageName = imageName.replaceAll("-"," ");
    return imageName;
    
    } )

return(<>
<TopNavBar/>
<Typography variant="h5" sx={{paddingTop:"20px", margin:"30px", top:0}}>What do you feel like doing today?</Typography>
<ImageList variant="masonry" cols={2} gap={8}>

{imageList.map((image,index)=>(
<ImageListItem sx={{display:"flex",flexDirection:'column',}} key={image}>
    <IconButton >
    <img 
    style={{width:'170px', height:"170px", alignItems:'center'}}
    src={`${image}`}
    alt={imageNames[index]}
    onClick={() => setActivityCategory(imageNames[index])}
    /></IconButton>
    <ImageListItemBar
            title={imageNames[index]}
            position="bottom"
            /* actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${imageNames[index]}`}
                >
                  <CheckIcon />
                </IconButton>
              }
             */
          />
</ImageListItem>
))}



</ImageList>
<div>
<Button sx={{margin:"20px"}} onClick={() => navigate("/")}>Back</Button>
<Button sx={{margin:"20px"}} onClick={() => navigate("/hosting/displayActivities")}>Next</Button>
<WedoNavbar/>
</div>
</>);

};

export default DisplayCategories;