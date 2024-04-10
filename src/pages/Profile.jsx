import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import DefaultPic from '../assets/DefaultProfilePic.svg';
import { Typography, Box, Rating, Chip} from "@mui/material";
import { MyContext } from "./ContextManager";


const BoxStyle = {
    textAlign: 'left',
    color : 'Black',
    marginBottom: '50px',
    marginTop:"3vh"
}

const InfoStyle = {
    typography: {
        textAlign: 'center',
    },
    img: {
        height: '30vh',
    },
    paddingBottom: '25px',
}

const RatingStyle = {
    typography: {
    },
    rating: {

    },
    padding: "10px",
    paddingBottom: '25px',

}

const InterestStyling = {
    typography: {
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start',
    overflow: 'hidden',
    padding: "10px",
    paddingBottom: '25px',
}


const Profile = ()=>{
    const [file, setFile] = useState(DefaultPic);
    const [user, setUser] = useState([])
    const [name, setName] = useState("John Doe");
    const [rating, setRating] = useState(5);
    const [chipData, setChipData] = useState([
        { key: 0, label: 'Badminton' },
        { key: 1, label: 'Bouldering' },
        { key: 2, label: 'Extreme Ironing' },
        { key: 3, label: 'Making Bread' },
        { key: 4, label: 'Bread' },
    ]);
    const [review, setReview] = useState([
        { key: 0, rName: 'Jimmy Dough', rProfilePic: DefaultPic, rRating: 5, rComment: 'Very good at baking bread' },
    ]);


    
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        async function findUser(id) {
            const res = await fetch(`https://us-central1-wedo-1a85a.cloudfunctions.net/api/testapi/users/${id}`, {
              methods: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
    
            const response = await res.json()
            setUser(response["Item"])
            localStorage.setItem('name', response["Item"].name)
            console.log("name", response["Item"].name)
            
            console.log(response["Item"])
            let aList = []
            for (let i=0; i<response["Item"].interests.length; i++) {
                aList.push({key:i, label:response["Item"].interests[i]})
            }
            setChipData(aList)
          }
    
          findUser(userID)
    }, [])
    while (user == []) {
        location.reload
    }
    
    return(

        <>
            <TopNavBar/>
            <Box sx={BoxStyle}>

                <Box sx={InfoStyle}>
                    {/* Default Profile Pic if no selfie */}
                    <img src={user.profilePhoto} className="Default Profile Pic" width="60%" height="60%" alt="Profile Pic"/>
                    {/* Name From Backend */}
                    <Typography variant="h3">{user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Birthday: {user.dob}</Typography>
                    <Typography>Gender: {user.gender}</Typography>
                </Box>

                <Typography variant="h5">User Ratings:</Typography>
                <Box sx={RatingStyle}>
                    <Rating
                        name="User-Rating"
                        value={rating} //Link rating here
                        readOnly
                    />
                </Box>

                <Typography variant="h5">Interests:</Typography>
                <Box sx={InterestStyling}>
                    {chipData.map(data => {
                        return (
                            <Box key={data.key} style={{margin: "4px"}}>
                                <Chip label={data.label} color="primary" variant="outlined"/>
                            </Box>
                        )
                    })}
                </Box>

                <Typography variant="h5">Reviews:</Typography>
                {/* List of Reviews */}
                <Box>
                    {review.map(r => {
                        return (
                            <Box key={r.key} style={{display: "flex", padding: "10px"}}>
                                <img src={r.rProfilePic} className="Reviewer Profile Pic" alt="Review Pic" style={{width: "25%", height: "25%"}}/>
                                <div>
                                <Typography>{r.rName}</Typography>
                                <Rating style={{marginLeft: 0}}
                                    name="Reviewer-Rating"
                                    value={r.rRating} 
                                    readOnly
                                />
                                <Typography>hello bread</Typography>
                            
                                </div>
                            </Box>
                        )
                    })}

                </Box>
            </Box>
            <WedoNavbar />
        </>
          
    );
}

export default Profile;