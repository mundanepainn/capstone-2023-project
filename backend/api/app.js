// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const cors = require("cors")
// //const port = 8080;
// //const indexRouter = require('./routes/index');
// const functions = require('firebase-functions');
// const usersRouter = require('./routes/users');
// const testAPIRouter = require("./routes/testAPI");
// const activitiesAPIRouter = require("./routes/activitiesAPI");
// const cognitoRouter = require("./routes/cognito");
// const app = express();

// // view engine setup
// //app.set('views', path.join(__dirname, 'views'));
// //app.set('view engine', 'jade');
// app.get("/hello",(req,res)=>{res.send("server works");})
// app.use(logger('dev'));
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// //app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use("/testAPI",testAPIRouter);
// app.use("/activitiesAPI",activitiesAPIRouter);
// app.use("/cognito",cognitoRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// /*app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });*/

// //app.listen(port, ()=>{console.log(`server running ${port}`)}); //Needed to run server/important
// exports.api = functions.https.onRequest(app);
