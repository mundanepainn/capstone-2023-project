const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const port = 9000;
const http = require('http');
const usersRouter = require('./routes/users');
const testAPIRouter = require("./routes/testAPI");
const activitiesAPIRouter = require("./routes/activitiesAPI");
const chatLogsAPIRouter = require("./routes/chatLogsAPI")
const reviewsAPIRouter = require("./routes/reviewsAPI")
const cognitoRouter = require("./routes/cognito");
const app = express();




let set = false;
const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/activitiesAPI", activitiesAPIRouter);
app.use("/chatLogsAPI", chatLogsAPIRouter);
app.use("/reviewsAPI", reviewsAPIRouter);
app.use("/cognito", cognitoRouter);







app.listen(port, function (err) {
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", port);
});
//exports.MyApi = functions.region('us-central1').runWith({ timeoutSeconds: 120 }).https.onRequest(app);