import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TestInstance from './TestInstance.js';
import AdminInstance from './AdminInstance.js';
import './App.css';  // Importing the styles
import MIPEACE_Logo from './MIPEACE_LOGO.png'
import { useHistory } from 'react-router-dom';
import { redirect } from 'react-router';


function App() {
  // State Variables
  const [showModal, setShowModal] = useState(() => {
    return localStorage.getItem('modalClosed') !== 'true';
  });
  const history = useHistory();
  const [redirectToTestInstance, setRedirectToTestInstance] = useState(false);
  const [redirectToAdminInstance, setRedirectToAdminInstance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  localStorage.setItem('modalClosed', 'false');

  //Functions
  const handleGoToTestInstance = () => {
    console.log("Attempting to Testing redirect...");
    localStorage.setItem('modalClosed', 'true'); // Set the local storage value
    console.log(localStorage.getItem('modalClosed'));
    setRedirectToTestInstance(true);
  };

  const handleGoToAdminInstance = () => {
    console.log("Attempting to Admin redirect...");
    localStorage.setItem('adminLoggedOut', 'false');
    localStorage.setItem('modalClosed', 'true'); // Set the local storage value
    console.log(localStorage.getItem('modalClosed'));
    setRedirectToAdminInstance(true);
  }

  //Modals, popups, other functions related to web-app movements
  const TypeSelectorModal = ({}) => {
    if (redirectToTestInstance){
      localStorage.setItem('modalClosed', 'false');
      return <Redirect to="/testInstance" />
    }else{
    }
    if (redirectToAdminInstance){
      localStorage.setItem('modalClosed', 'false');
      return <Redirect to="/adminInstance" />
    }else{
    }
    console.log(localStorage.getItem('modalClosed'));
    return (
      <div className="type-select-modal">
        <div className='top-left-logo'>
          <img src={MIPEACE_Logo} className="starter-logo" alt="MIPEACE_LOGO" />
        </div>
        <div className="title-bar-modal">
          <div className="title-of-title-bar-modal">MIPEACE</div>
            <p className="description-of-title-bar-modal">
              <span>
              Multi-Instance Psychological, Examination, Administration, Collection, and Extraction Platform
              </span>
            </p>
          </div>
          <div className="all">
            <div className="support-button">
              <div className="text">Support</div>
            </div>
            <div className="login-button" onClick={handleGoToTestInstance}>
              <div className="text">Login</div>
            </div>
            <div className="start-take-test-button">
              <div className="explainer"><span>Start Here</span></div>
              <div className="text">Take Test</div>
            </div>
            <div className="admin-login-button" onClick={handleGoToAdminInstance}>
              <div className="text">Admin Login</div>
            </div>
            <div className="settings-button">
              <div className="text">Settings</div>
            </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <TypeSelectorModal 
              setShowModal={setShowModal} 
              handleGoToTestInstance={handleGoToTestInstance}
            />
          </Route>
          <Route path="/testInstance">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <TestInstance />
            )}
          </Route>
          <Route path="/adminInstance">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <AdminInstance />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );    
}

export default App;
