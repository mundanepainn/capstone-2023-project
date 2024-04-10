import React, { useState } from "react";
import {
  Card, CardContent, Typography, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemButton, ListItemText, ListItemAvatar,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Button from '@mui/material-next/Button';

// Advertisement cards

const cardStyle = {
  textAlign: "center",
  margin: '15px 0px 15px 0px',
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 800,
  borderRadius: "10px"
};

function AdCards({ ad }) {
  console.log("ADDDDDDD", ad)
  const [open, setOpen] = useState(false);
  const [openAttend, setOpenAttend] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenAttend(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const openLink = (url) => {
    const newWindow = window.open(
      url,
      "_blank",
      "noreferrer"
    );
    if (newWindow) {
      newWindow.focus();
    }
  };

  return (

    <Card sx={cardStyle} >
      <CardContent sx={{ marginTop: "2vh" }}>
        <img src={ad.adImg} width="60%" height="60%" alt={ad.adName} />
        <Typography variant="h5" style={{ margin: "8.96px", fontFamily: 'Trebuchet MS' }}>{ad.adName}</Typography>
        <Typography>{ad.adLocation}</Typography>
        <Typography>Category: ADVERTISEMENT</Typography>

        <Button style={{ margin: "40px 5px 10px 5px", width: "45%", maxWidth: 150, backgroundColor: "#4e84ee", fontFamily: "Arial" }} variant="filled" onClick={() => (handleOpen())}>More</Button>
        <Button style={{ margin: "40px 5px 10px 5px", width: "50%", maxWidth: 150, backgroundColor: "#4e84ee", fontFamily: "Arial" }} variant="filled" onClick={() => { console.log("LOVE KO TO"), openLink(ad.adSite) }} >Visit Advertiser</Button>
      </CardContent>


      {/* dialog to show advertisement details */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Details</DialogTitle>

        <DialogTitle>Attendees:</DialogTitle>
        <DialogContent dividers={true} >
          <Typography>YOU</Typography>

        </DialogContent>

        <DialogTitle>Ages Requirement:</DialogTitle>
        <DialogContent dividers={true} >
          <Typography>No Age Requirement</Typography>
        </DialogContent>

        <DialogTitle>Gender Requirement/s: </DialogTitle>
        <DialogContent dividers={true} >
          <Typography>Any Gender</Typography>
        </DialogContent>

        <DialogTitle>Description</DialogTitle>
        <DialogContent dividers={true} >
          <Typography>{"I'm lovin' it!"}</Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleClose}>CANCEL</Button>
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={() => { console.log("LOVE KO TO"), openLink(ad.adSite) }}>VISIT</Button>
        </DialogActions>
      </Dialog>


    </Card>

  );
}

export default AdCards;
