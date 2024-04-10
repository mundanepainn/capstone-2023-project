const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
require("dotenv").config();


AWS.config.update({
  accessKeyId: process.env.ACCESS,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-east-1',
});

const cognito = new AWS.CognitoIdentityServiceProvider(); // creates a new cognito element.

router.get("/", (req, res) => {
  res.status(200).send("Hello there");
});

router.post('/signUp', (req, res) => { // Registration/sign up endpoint
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: username,
    Password: password,
  };

  cognito.signUp(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send(err.message);
    } else {
      console.log('User signed up:', data);
      res.status(200).send(data);
    }
  });
});

router.post("/signIn", (req, res) => { // sign in endpoint, note that account has to be confirmed for the endpoint to work properly
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  cognito.initiateAuth(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send(err.message);
    } else {
      console.log('User signed in:', data);
      res.status(200).send(data);
    }
  });
});

router.post("/signOut", (req, res) => { // cognito sign out endpoint
  const {username} = req.query; // Assuming you are sending the username in the request body


  const params = {
    UserPoolId: process.env.USER_POOL,
    Username: username,
  };
  console.log(username);
    console.log(params);


  cognito.adminUserGlobalSignOut(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send(err.message);
    } else {
      console.log('User signed out', data);
      res.status(200).send('User signed out');
    }
  });
});


module.exports = router;
