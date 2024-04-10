import React from "react";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const cardStyle = {
  textAlign: "center",
  margin: "auto",
  width: "75%",
  justifyContent: "center",
  alignItems: "center",
};

function Cards({ activities }) {
  const navigate = useNavigate();

  return (
    <List>
        <ListItem key={index}>
          <Card sx={cardStyle} onClick={() => navigate("/") /* Replace with "get event with id" page */}>
            <CardContent>
              <img src={activities.photo} alt={activities.name} />
              <Typography variant="h5">{activities.name}</Typography>
              <Typography variant="h6">{activities.description}</Typography>
              <Typography>Location: {activities.location}</Typography>
              <Typography>Date: {activities.date}</Typography>
              <Typography>Time: {activities.time}</Typography>
              {activities.ageRestrict ? (
                <Typography>
                  Ages: {activities.minAge}
                  {activities.maxAge === -1 ? <span>+</span> : <span>-{activities.maxAge}</span>}.
                </Typography>
              ) : (
                <Typography>No Age Requirement.</Typography>
              )}
              {activities.genderRestrict ? (
                <Typography>Gender Requirement/s: {activities.genderReq.join(", ")}.</Typography>
              ) : (
                <Typography>Any Gender.</Typography>
              )}
            </CardContent>
          </Card>
        </ListItem>
    </List>
  );
}

export default Cards;
