import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import TestInstance from './TestInstance.js';
import AdminInstance from './AdminInstance.js';
import TestWebpage from './TestWebpage.js';
import AdminWebpage from './AdminWebpage.js';
import './App.css';  // Importing the styles
import MIPEACE_Logo from './MIPEACE_LOGO.png'
import { useHistory } from 'react-router-dom';

function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
      console.log(`Navigated to ${location.pathname}`);
  }, [location]);

  return null;  // This component doesn't render anything
}

function App() {
  // State Variables
  const [showModal, setShowModal] = useState(() => {
    return localStorage.getItem('modalClosed') !== 'true';
  });
  const history = useHistory();
  const [redirectToTestInstance, setRedirectToTestInstance] = useState(false);
  const [redirectToAdminInstance, setRedirectToAdminInstance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState(localStorage.getItem('lastRoute') || "/");

  useEffect(() => {
    // If the route in the local storage isn't the root, then we redirect to the stored route.
    if (redirectTo !== "/") {
      setShowModal(false);
    }
  }, [redirectTo]);
  //Functions
  const handleGoToTestInstance = () => {
    console.log("Attempting to Testing redirect...");
    localStorage.setItem('modalClosed', 'true'); // Set the local storage value
    localStorage.setItem('lastRoute', '/testInstance');
    setRedirectTo(prev => '/testInstance');  // Use a functional update here
    console.log(localStorage.getItem('modalClosed'));
    console.log("RedirectTo from local storage:", localStorage.getItem('lastRoute'));
    window.location.reload();
};


  const handleGoToAdminInstance = () => {
    console.log("Attempting to Admin redirect...");
    localStorage.setItem('adminLoggedOut', 'false');
    localStorage.setItem('modalClosed', 'true'); // Set the local storage value
    console.log(localStorage.getItem('modalClosed', "lastroute"));
    console.log("RedirectTo from local storage:", localStorage.getItem('lastRoute'));
    setRedirectTo('/adminInstance');
  }

  //Modals, popups, other functions related to web-app movements
  const TypeSelectorModal = ({}) => {
    if (redirectTo === "/testInstance" && localStorage.getItem('modalClosed') === 'true') {
      console.log("Redirecting to /testInstance from TypeSelectorModal");
      return <Redirect to="/testInstance" />;
  }
    if (redirectTo === "/adminInstance") {
      console.log("Redirecting to /adminInstance from TypeSelectorModal");
      console.log(localStorage.getItem('modalClosed'));
      return <Redirect to="/adminInstance" />;
    }
    console.log("Showing Modal, no redirection");
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
        <RouteLogger />
        <Switch>
          <Route exact path="/">
            <TypeSelectorModal />
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
          <Route path="/test">
            <TestWebpage />
          </Route>
          <Route path="/admin">
            <AdminWebpage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
