import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import DefaultPic from '../assets/DefaultProfilePic.svg';
import {
    Typography, Box, Rating, Chip, IconButton, Dialog, DialogActions,
    Button, TextField, DialogTitle, Divider,
    Menu, MenuItem
} from "@mui/material";
import { MyContext } from "./ContextManager";
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';

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


const Profile = () => {
    const base_url = import.meta.env.VITE_BACKEND;
    const [location, setLocation] = useState(null);
    const [file, setFile] = useState(DefaultPic);
    const [user, setUser] = useState([])
    const [name, setName] = useState("John Doe");
    const [askLocation, setAskLocation] = useState(false)
    const [avRating, setAvRating] = useState(null);
    const [rating, setRating] = useState(5);
    const [anchor, setAnchor] = useState(null);
    const menuOpen = Boolean(anchor);
    const [confirmLogout, setConfirmLogout] = useState(false);
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

    const handleMenu = (event) => {
        setAnchor(event.currentTarget)
    };

    const handleConfirm = () => {
        setAnchor(null);
        setConfirmLogout(true);
    };

    const handleClose = () => {
        localStorage.clear
        setConfirmLogout(false);
        setAnchor(null);
    };

    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload(false);
        alert("Log Out");
        handleClose();
    };

    {/*Update Rating*/ }
    useEffect(() => {
        const updateRating = () => {
            if (reviews.length == 0) {
                setAvRating(0) //if no reviews
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

    useEffect(() => {
        if (askLocation) {
            requestLocationPermission()
        }
    }, [askLocation])

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error(error.message);
                }
            )
        } else {
            console.error("Geolocation is not supported")
        }
    }

    const requestLocationPermission = () => {
        if ("geolocation" in navigator) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "granted") {
                    getLocation();
                } else if (result.state === "prompt") {
                    window.confirm(
                        "Pleaes grant permission to find nearby activities"
                    )
                    getLocation();
                } else if (result.state === "denied") {
                    // alert("FINE THEN")
                    true
                }
            })
        } else {
            alert("Your current browser does not allow us to find your current location")
        }
    }


    const [displayEdit, setDisplayEdit] = useState(false);
    {/*Bio useState from Context Manager*/ }
    const {
        bio, setBio,
    } = React.useContext(MyContext);
    {/*Saves Profile edit*/ }
    const confirmBioEdit = () => {
        let newBio = document.getElementById("bio").value;
        setBio(newBio);
        user.profilePhoto = file;
        setDisplayEdit(false);
    }
    {/*Function for changing pfp*/ }
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        const userID = localStorage.getItem('userID');
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

        findUser(userID)
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
                console.log("res", res)
                setReviews(res.sort((a, b) => b.reviewDate.localeCompare(a.reviewDate)))
            })
        }
        setAskLocation(true)
    }, [user])

    return (

        <>
            <TopNavBar />
            <Box sx={BoxStyle}>
                <Box sx={{ textAlign: 'right' }}>
                    <IconButton onClick={(e) => handleMenu(e)}>
                        <MoreHorizIcon />
                    </IconButton>

                    <Menu
                        id="signout-menu"
                        anchorEl={anchor}
                        open={menuOpen}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleConfirm}><LogoutIcon sx={{ marginRight: '5px' }} />Logout  </MenuItem>
                    </Menu>
                </Box>

                <Box sx={InfoStyle}>
                    {/* Default Profile Pic if no selfie */}
                    <img src={user.profilePhoto} className="Default Profile Pic" style={{ width: "300px", height: "300px", objectFit: "cover", borderRadius: "5%" }} alt="Profile Pic" />
                    {/* Name From Backend */}
                    <Typography style={{ fontFamily: 'Trebuchet MS', marginBottom: "2vh" }} variant="h3">{name}</Typography>
                    <Typography>{bio}</Typography>
                    {/* <Typography>Email: {user.email}</Typography> */}
                    <Typography>Birthday: {user.dob}</Typography>
                    <Typography>Gender: {user.gender}</Typography>
                    {/* <Typography>Your Current Location: {location ? `${location.latitude}, ${location.longitude}` : null}</Typography> */}

                    <IconButton onClick={() => setDisplayEdit(true)}>
                        <EditIcon />
                    </IconButton>
                </Box>

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

                <Typography variant="h5">User Ratings:</Typography>
                <Box sx={RatingStyle}>
                    <Rating
                        name="User-Rating"
                        value={avRating} //Link rating here
                        readOnly
                    />
                </Box>

                <Typography variant="h5">Reviews:</Typography>
                {/* List of Reviews */}
                <Box>
                    {reviews.map(r => {
                        return (
                            <Box key={r.reviewer} style={{ display: "flex", padding: "10px" }}>
                                <img src={r.reviewerPic} className="Reviewer Profile Pic" alt="Review Pic" style={{ width: "5%", height: "5%", marginRight: '5px' }} />
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
                {/*Edit modal with upload photo and bio*/}
                <Dialog
                    open={displayEdit}
                    onClose={() => setDisplayEdit(false)}
                    scroll="paper"
                >
                    <Box component='img' src={file} sx={{ width: "200px", height: "200px", margin: "auto", objectFit: "cover", marginTop: "20px" }} />
                    <DialogTitle>
                        Change your Profile Pic:
                    </DialogTitle>
                    <Button variant="filled" component='label'> Upload Image <input type="file" hidden onChange={handleChange} /></Button>
                    <Divider />
                    <DialogTitle>
                        Edit your bio:
                    </DialogTitle>
                    <TextField
                        id="bio"
                        multiline
                        minRows={2}
                        maxRows={4}
                        defaultValue={bio}
                        style={{ paddingLeft: '10px', paddingRight: '10px' }}
                    />
                    <DialogActions>
                        <Button onClick={confirmBioEdit}>Confirm</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={confirmLogout}
                    onClose={handleClose}
                    scroll="paper"
                >
                    <DialogTitle>Are you sure you want to log out?</DialogTitle>
                    <Divider />
                    <DialogActions sx={{ display: 'flex' }}>
                        <Box sx={{ flex: '1', textAlign: "left", marginLeft: '20%' }}>
                            <Button onClick={handleClose}>Cancel</Button>
                        </Box>
                        <Button onClick={handleLogOut} sx={{ marginRight: '20%' }}>Log Out</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <WedoNavbar />
        </>

    );
}

export default Profile;