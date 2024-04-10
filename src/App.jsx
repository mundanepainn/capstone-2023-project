import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import { Authenticate } from './authentication/Authenticate';
import PrivateRoutes from './authentication/PrivateRoutes';
import Landing from './pages/Landing';
import Home from './pages/Home';
import UsersTest from './pages/UsersTest';
import DateCreate from './pages/DateCreate';
import SignUp from './pages/SignUp';
import LocationCreate from './pages/LocationCreate';
import ActivitySpecs from './pages/ActivitySpecs';
import ConfirmActivity from './pages/ConfirmActivity';
import ContextManager from './pages/ContextManager';
import ExploreActivities from './pages/ExploreActivities';
import Chat from './pages/Chat';
import DisplayCategories from './pages/DisplayCategories';
import DisplayActivities from './pages/DisplayActivities';
import Hosting from './pages/Hosting';
import React, { useState } from 'react';
import Profile from './pages/Profile';
import Attending from './pages/Attending';
import ActivitiesTest from './pages/ActivitiesTest';
import UserCreation from './pages/UserCreation';
import Interests from './pages/Interests';
import ProfilePic from './pages/ProfilePic';
import Gender from './pages/Gender';
import UserProfile from './pages/UserProfile';
import { MyContext } from "./pages/ContextManager";
import io from 'socket.io-client';
import EmailRecovery from './pages/EmailRecovery';
import ChangePassword from './pages/ChangePassword';




function App() {
  /*   const {
      setNewMessage
  } = React.useContext(MyContext);
  
  setSocket(io('http://localhost:9000'))
  
  socket.on('message', (data) => {
    console.log('Received message from server', data)
    
    setNewMessage(data)
  }) */

  return (
    <>

      {/* Context manager tag allows sharing context variables across different pages, similar in a way to global variables. */}
      <BrowserRouter>
        <Authenticate>
          <ContextManager>

            {/* //Routing for the entire applications, all elements exist here. */}
            <Routes>
              <Route path='/' element={<Home />} /> {/* // contents of the main page moved there */}
              <Route path='/usersTest' element={<UsersTest />} />
              <Route path='/activitiesTest' element={<ActivitiesTest />} />
              <Route path='/landing' element={<Landing />} />
              <Route path='/recover' element={<EmailRecovery />} />
              <Route path='/changePass' element={<ChangePassword />} />

              {/* // landing page , add route to test page. */}
              {/* // add route for event creation page as temporary first hosting page */}

              <Route element={<PrivateRoutes />}> {/*Tag includes all routes only accessed via authentication*/}

                <Route path='/chat' element={<Chat />} /> {/* Chat Page */}
                <Route path='/profile' element={<Profile />} />
                <Route path='/userProfile/:uid' element={<UserProfile />} />
                <Route path='/explore' element={<ExploreActivities />} />
                <Route path="/attending" element={<Attending />} />  {/* // Choose activity to be hosted */}
                <Route path="/hosting" element={<Hosting />} />  {/* // Choose activity to be hosted */}
                <Route path="/hosting/displayCategories" element={<DisplayCategories />} />
                <Route path="/hosting/displayActivities" element={<DisplayActivities />} />  {/* // Choose activity to be hosted */}
                <Route path='/hosting/date' element={<DateCreate />} /> {/* // event creation calendar page */}
                <Route path='/hosting/location' element={<LocationCreate />} /> {/* // add route for event creation map page */}
                <Route path='/hosting/activitySpecs' element={<ActivitySpecs />} /> {/* // activity specifications page */}
                <Route path='/hosting/confirmation' element={<ConfirmActivity />} /> {/* confirmation of activity details */}

              </Route>

              {/*Signup Pages*/}
              <Route path='/signup' element={<SignUp />} /> {/* // Sign up Page */}
              <Route path='/signup/userCreation' element={<UserCreation />} /> {/*Name page / This is redundant and rendered inaccessible in navigation*/}
              <Route path='/signup/gender' element={<Gender />} /> {/*Gender and DOB Page*/}
              <Route path='/signup/interests' element={<Interests />} /> {/*Interests Page*/}
              <Route path='/signup/uploadPic' element={<ProfilePic />} /> {/*Profile Pic upload page*/}
            </Routes>

          </ContextManager>
        </Authenticate>
      </BrowserRouter>

    </>
  );
};

export default App;