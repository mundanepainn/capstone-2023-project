import { ImageList, ImageListItem,ImageListItemBar ,IconButton, Typography,Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import TopNavBar from "../components/TopNavBar";
import WedoNavbar from "../components/WedoNavbar";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DisplayActivities = ()=>{
const navigate = useNavigate();
const [imageList, setImageList] = useState([]); // will hold the s3 bucket items links to the activity images.

  useEffect(() => {
    async function fetchData() {
      try {
        // Api request that triggers lambda function through api gateway and fetch the s3 bucket items links to the activity images.
        const response = await axios.get("https://1hirm1bqp9.execute-api.ap-southeast-2.amazonaws.com/activities");
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
<Typography variant="h5" sx={{paddingTop:"20px", margin:"30px"}}>I'm down to ...</Typography>
<ImageList variant="masonry" cols={2} gap={8}>

{imageList.map((image,index)=>(

<ImageListItem sx={{display:"flex",flexDirection:'column'}} key={image}>
    <img
    style={{width:"30vh", height:"40vh"}}
    src={`${image}`}
    alt={imageNames[index]}
    />
    <ImageListItemBar
            title={imageNames[index]}
            position="bottom"
            actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${imageNames[index]}`}
                >
                  <CheckIcon />
                </IconButton>
              }
            
          />
</ImageListItem>

))}



</ImageList>
<div>
<Button sx={{margin:"20px"}} onClick={() => navigate("/hosting/displayCategories")}>Back</Button>
<Button sx={{margin:"20px"}} onClick={() => navigate("/hosting/date")}>Next</Button>
</div>
<WedoNavbar/>

</>);

};

export default DisplayActivities;