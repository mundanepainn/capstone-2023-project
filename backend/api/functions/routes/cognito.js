const AWS = require('aws-sdk');
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
// var auth = require('./auth');

require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.ACCESS,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'ap-southeast-2',
});

const cognito = new AWS.CognitoIdentityServiceProvider();

// Function to calculate SECRET_HASH
function calculateSecretHash(clientId, clientSecret, username) {
  const hmac = crypto.createHmac('sha256', clientSecret);
  hmac.update(username + clientId);
  const secretHash = hmac.digest('base64');
  return secretHash;
}



router.get("/", (req, res) => {
  res.status(200).send("Hello there");
});

//endpoint for registering users
router.post('/signUp', (req, res) => {
  const { username, password } = req.body; // Use req.body to access the email

  if (!username || !password ) {
    return res.status(400).send('Username and password are required.');
  }

  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: username,
    Password: password,
   
    SecretHash: calculateSecretHash(process.env.CLIENT_ID, process.env.CLIENT_SECRET, username), // Calculate SECRET_HASH
  };

  cognito.signUp(params, (err, data) => {
    if (err) {
      //console.error(err);
      res.status(400).send(err.message);
    } else {
      //console.log('User signed up:', data);
     
      res.status(200).send(data);
    }
  });
});

// endpoint for handling user sign in
router.post("/signIn", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: calculateSecretHash(process.env.CLIENT_ID, process.env.CLIENT_SECRET, username), // Calculate SECRET_HASH
    },
  };

  cognito.initiateAuth(params, (err, data) => {
    if (err) {
      //console.error(err);
      res.status(400).send(err);
    } else {
      console.log('User signed in with access token:', data);
      res.status(200).send(data);
    }
    // console.log(data["AuthenticationResult"]["AccessToken"])
/*     localStorage.setItem('AccessToken', data["AuthenticationResult"]["AccessToken"])
    localStorage.setItem('RefreshToken', data["AuthenticationResult"]["RefreshToken"]) */
  });
});

//endpoint for user sign out , uses access token
router.post('/signOut', (req, res) => {
  const { accessToken } = req.body;

  const cognito = new AWS.CognitoIdentityServiceProvider();

  const params = {
    AccessToken: accessToken,
  };

  cognito.globalSignOut(params, (err, data) => {
    if (err) {
     //console.error(err);
      res.status(400).send(err);
    } else {
      console.log('User signed out successfully:', data);
      res.status(200).send('User signed out successfully');
    }
  });
});


router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: calculateSecretHash(process.env.CLIENT_ID, process.env.CLIENT_SECRET, username), // Calculate SECRET_HASH
    },
  };

  cognito.initiateAuth(params, (err, data) => {
    if (err) {
      //console.error(err);
      res.status(400).send(err);
    } else {
      console.log('User authenticated successfully:', data);
      res.status(200).send(data);
    }
  });
});


// Endpoint for initiating password reset
router.post('/forgotPassword', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send('Username is required.');
  }

  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: username,
    SecretHash: calculateSecretHash(process.env.CLIENT_ID, process.env.CLIENT_SECRET, username),
  };

  cognito.forgotPassword(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send(err.message);
    } else {
      console.log('Password reset initiated successfully:', data);
      res.status(200).send(data);
    }
  });
});

// Endpoint for confirming password reset
router.post('/confirmForgotPassword', (req, res) => {
  const { username, verificationCode, newPassword } = req.body;

  if (!username || !verificationCode || !newPassword) {
    return res.status(400).send('Username, verification code, and new password are required.');
  }

  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: username,
    ConfirmationCode: verificationCode,
    Password: newPassword,
    SecretHash: calculateSecretHash(process.env.CLIENT_ID, process.env.CLIENT_SECRET, username),
  };

  cognito.confirmForgotPassword(params, (err, data) => {
    if (err) {
     // console.error(err);
      if (err.code === 'UserNotFoundException') {
        return res.status(404).json({ error: 'User not found' });
      } else if (err.code === 'LimitExceededException') {
        return res.status(429).json({ error: 'Password recovery limit exceeded' });
      } else {
        return res.status(500).json({ error: 'Error confirming password reset' });
      }
    } else {
      //console.log('Password reset confirmed successfully:', data);
      res.status(200).json({ message: 'Password recovery confirmed successfully' });
    }
  });
});

// ... (Other routes)

module.exports = router;
