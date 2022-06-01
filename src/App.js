import './App.css';
import Container from '@mui/material/Container';
import React from 'react';

import Companies from './components/Companies';
import Jobs from './components/Jobs'
import Home from './components/Home';
import Navbar from './components/Navbar';
import FilteredCompanyJobs from './components/FilteredCompanyJobs';
import SignInSide from './components/SignInSide';
import SignUpSide from './components/SignUpSide';
import Profile from './components/Profile';
import LogOut from './components/LogOut';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import UserContext from './auth/Usercontext';
import JoblyApi from './api/api'
import useLocalStorage from './hooks/useLocalStorage';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_IN_STORAGE = "jobly-token";


/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 */
function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_IN_STORAGE);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          // create a variable called username from the token's payload
          let { username } = jwt.decode(token);
          // put the token in JoblyApi, so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or an error ocurres), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles signup or registration.
   * Automatically logs a user in (sets token in state) upon signup.
   signupData => {firstName, lastName, email, username, password }*/
  async function signup(signUpData) {
    try {
      let token = await JoblyApi.signup(signUpData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles login.
   */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) {
      return;
    }
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <UserContext.Provider
            value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
            <Navbar logout={logout} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/SignIn" element={<SignInSide login={login} />} />
              <Route path="/SignUp" element={<SignUpSide signup={signup} />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/LogOut" element={<LogOut />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:companyHandle" element={<FilteredCompanyJobs />} />
              <Route path="/jobs" element={<Jobs />} />
              {/* <Route path="/jobs/:id" element={<JobDetails />} /> */}
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </ Container>
    </div >
  );
}

export default App;
