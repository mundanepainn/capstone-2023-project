import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './App.css';

import Landing from './pages/Landing';
import Home from './pages/Home';
import UsersTest from './pages/UsersTest';
import DateCreate from './pages/DateCreate';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import LocationCreate from './pages/LocationCreate';
import ActivitySpecs from './pages/ActivitySpecs';
import ConfirmActivity from './pages/ConfirmActivity';
import ContextManager from './pages/ContextManager';


function App() {
 

  return (
    <>
    {/* Context manager tag allows sharing context variables across different pages, similar in a way to global variables. */}
      <ContextManager>
      <BrowserRouter> {/* //Routing for the entire applications, all elements exist here. */}
        <Routes>
          <Route path='/' element={<Home/>}/> {/* // contents of the main page moved there */}
          <Route path='/usersTest' element={<UsersTest/>}/>
          <Route path='/landing' element={<Landing/>}/> {/* // landing page , add route to test page. */}
          {/* // add route for event creation page as temporary first hosting page */}
          <Route path='/hosting/date' element={<DateCreate/>}/> {/* // event creation calendar page */}
          <Route path='/hosting/location' element={<LocationCreate/>}/> {/* // add route for event creation map page */}
          <Route path='/hosting/activitySpecs' element={<ActivitySpecs/>}/> {/* // activity specifications page */}
          <Route path='/hosting/confirmation' element={<ConfirmActivity/>}/> {/* confirmation of activity details */}
          <Route path='/signup' element={<SignUp/>}/> {/* // Sign up Page */}
          <Route path='/signin' element={<SignIn/>}/> {/* // Sign in Page */}
        </Routes>
      </BrowserRouter>
      </ContextManager>
    </>
  );
};

export default App;

