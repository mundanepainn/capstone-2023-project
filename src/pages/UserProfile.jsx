import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import DefaultPic from '../assets/DefaultProfilePic.svg';
import { Typography, Box, Rating, Chip, Button, Snackbar, TextField } from "@mui/material";
import { useParams } from 'react-router-dom';


const BoxStyle = {
    textAlign: 'left',
    color: 'Black',
    marginBottom: '50px',
    marginTop: "3vh"
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


const UserProfile = () => {
    const base_url = import.meta.env.VITE_BACKEND;
    const { uid } = useParams();
    console.log("UID IS", uid)
    const [file, setFile] = useState(DefaultPic);
    const [key, setKey] = useState(0)
    const [user, setUser] = useState([])
    const [name, setName] = useState("John Doe");
    const [rating, setRating] = useState(null);
    const [avRating, setAvRating] = useState(null);
    const [chipData, setChipData] = useState([
        { key: 0, label: 'Badminton' },
        { key: 1, label: 'Bouldering' },
        { key: 2, label: 'Extreme Ironing' },
        { key: 3, label: 'Making Bread' },
        { key: 4, label: 'Bread' },
    ]);
    const [reviews, setReviews] = useState([
        { key: 0, reviewer: 'Jimmy Dough', reviewerPic: DefaultPic, rating: 5, reviewContent: 'Very good at baking bread' },
    ]);
    {/*variables for displaying report*/ }
    const [snackbar, setSnackbar] = useState(false);
    const [reported, setReported] = useState(false);
    {/*Button function for reporting user*/ }
    const reportUser = () => {
        setSnackbar(true);
        setReported(true)
    }
    {/*Update Rating*/ }
    useEffect(() => {
        const updateRating = () => {
            if (reviews.length == 0) {
                setAvRating(0)
            }
            else {
                console.log("called");
                let total = 0;
                reviews.forEach(element => {
                    console.log(element);
                    total += element.rating
                });
                setAvRating(total / reviews.length);
            }
        }
        updateRating();
    }, [reviews])

    {/*confirm review*/ }
    const confirmReview = () => {
        let reviewMessage = document.getElementById("reviewMessage").value;
        let newReview = { key: key, reviewer: name, reviewerPic: user.profilePhoto, rating: rating, reviewContent: reviewMessage }
        setReviews((prevReviews) => [...prevReviews, newReview]);
        setKey(key + 1);
        //setRated(false)
        //setLock(true)
    }


    useEffect(() => {
        async function findUser(id) {
            const res = await fetch(base_url + `/testAPI/users/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const response = await res.json()
            // console.log("USER", response["Item"])
            setUser(response["Item"])
            localStorage.setItem('name', response["Item"].name)
            setName(response["Item"].name.split(",").join(" "))

            let aList = []
            for (let i = 0; i < response["Item"].interests.length; i++) {
                aList.push({ key: i, label: response["Item"].interests[i] })
            }
            setChipData(aList)
        }

        findUser(uid) //delete this when we have viewing user profile working
        //   findUser(uid) //uncomment when working
    }, [])

    useEffect(() => {
        console.log("user", user)
        async function fetchReview(id) {
            const res = await fetch(base_url + `/reviewsAPI/reviews/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const senderData = await res.json();
            return senderData["Item"];
        }
        if (user.reviews) {
            user.reviews = user.reviews.filter((review) => review != "")
            const fetchPromises = user.reviews.map((reviewID) => {
                return fetchReview(reviewID)
            })
            Promise.all(fetchPromises).then((res) => {
                setReviews(res.sort((a, b) => b.reviewDate.localeCompare(a.reviewDate)))
            })
        }

    }, [user])

    return (

        <>
            <TopNavBar />
            <Box sx={BoxStyle}>

                <Box sx={InfoStyle}>
                    {/* Default Profile Pic if no selfie */}
                    <img src={user.profilePhoto} className="Default Profile Pic" style={{ width: "300px", height: "300px", objectFit: "cover", borderRadius: "5%" }} alt="Profile Pic" />
                    <img src={user.profilePhoto} className="Default Profile Pic" style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '5%' }} alt="Profile Pic" />
                    {/* Name From Backend */}
                    <Typography variant="h3">{name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                </Box>
                {/*Display Interests*/}
                <Typography variant="h5">Interests:</Typography>
                <Box sx={InterestStyling}>
                    {chipData.map(data => {
                        return (
                            <Box key={data.key} style={{ margin: "4px" }}>
                                <Chip label={data.label} color="primary" variant="outlined" />
                            </Box>
                        )
                    })}
                </Box>

                {/*User ratings with review functionality*/}
                <Typography variant="h5">User Ratings:</Typography>
                <Box sx={RatingStyle}>
                    <Typography sx={{ fontSize: "11px" }}>
                        <Rating
                            name="User-Rating"
                            value={avRating} //Link rating here
                            readOnly
                        />
                        {avRating}</Typography>
                </Box>

                <Typography variant="h7">Leave a review:</Typography>
                <Box sx={RatingStyle}>
                    <Rating
                        name="User-Rating"
                        value={rating} //Link rating here
                        onChange={(event, newRating) => setRating(newRating)}
                    />
                </Box>

                <TextField
                    id="reviewMessage"
                    multiline
                    minRows={2}
                    maxRows={4} />
                <Box>
                    <Button onClick={confirmReview}>Confirm</Button>
                </Box>

                <Typography variant="h5">Reviews:</Typography>

                {/* List of Reviews */}
                <Box>
                    {reviews.map(r => {
                        return (
                            <Box key={r.key} style={{ display: "flex", padding: "10px" }}>
                                <img src={r.reviewerPic} className="Reviewer Profile Pic" alt="Review Pic" style={{ width: "5%", height: "5%", marginRight: '2px' }} />
                                <div>
                                    <Typography>{r.reviewer}</Typography>
                                    <Rating style={{ marginLeft: 0 }}
                                        name="Reviewer-Rating"
                                        value={r.rating}
                                        readOnly
                                    />
                                    <Typography>{r.reviewContent}</Typography>
                                </div>
                            </Box>
                        )
                    })}

                </Box>
                {/*Report user button*/}
                <Button onClick={reportUser} disabled={reported}>Report User</Button>
                {/*Report user alert*/}
                <Snackbar
                    open={snackbar}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar(false)}
                    message="User Reported"
                />
            </Box>
            <WedoNavbar />
        </>

    );
}

export default UserProfile;