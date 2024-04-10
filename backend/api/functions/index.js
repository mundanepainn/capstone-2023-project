/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors")
//const port = 8080;
//const indexRouter = require('./routes/index');
const functions = require('firebase-functions');
const usersrouter = require('./routes/users.js');
const testAPIRouter = require("./routes/testapi.js");
const activitiesAPIRouter = require("./routes/activitiesapi.js");
const cognitoRouter = require("./routes/cognito");
const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.get("/hello",(req,res)=>{res.send("server works");})
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersrouter);
app.use("/testAPI",testAPIRouter);
app.use("/activitiesAPI",activitiesAPIRouter);
app.use("/cognito",cognitoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

//app.listen(port, ()=>{console.log(`server running ${port}`)}); //Needed to run server/important
exports.api = functions.runWith({ timeoutSeconds: 120 }).https.onRequest(app);
