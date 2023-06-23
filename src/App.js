import React, { useState, useEffect } from 'react';
import logo from './brain-illustration-12-svgrepo-com.svg';
import signInImage from './logo-big.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import TestWebpage from './TestWebpage.js';
import AdminWebpage from './AdminWebpage.js';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [cacid, setCacID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCacid, setAdminCacid] = useState('');
  const [adminFirstName, setAdminFirstName] = useState('');
  const [adminMiddleName, setAdminMiddleName] = useState('');
  const [adminLastName, setAdminLastName] = useState('');
  const [adminLoginAttempts, setAdminLoginAttempts] = useState(0);
  const [adminButtonDisabled, setAdminButtonDisabled] = useState(false);
  const [showWelcomeAdminMessage, setShowWelcomeAdminMessage] = useState(false);
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState(false);
  const MAX_LOGIN_ATTEMPTS = 5;
  const [adminAttemptsLeft, setAdminAttemptsLeft] = useState(MAX_LOGIN_ATTEMPTS);
  const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  const [showAdminLockoutMessage, setShowAdminLockoutMessage] = useState(false);
  const [hasBeenToAdminWebpage, setHasBeenToAdminWebpage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log("isAdmin from localStorage: ", isAdmin); // log to the console
    setIsAdmin(isAdmin);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (submitted && !isAdmin) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
        setShowLogo(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  useEffect(() => {
    if (adminLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
      setAdminButtonDisabled(true);
      setShowAdminLogin(false);
      const lockoutTimer = setTimeout(() => {
        setAdminButtonDisabled(false);
        setAdminLoginAttempts(0);
        setAdminAttemptsLeft(MAX_LOGIN_ATTEMPTS);
      }, LOCKOUT_DURATION);
      return () => clearTimeout(lockoutTimer);
    }
  }, [adminLoginAttempts]);

  useEffect(() => {
    // Retrieve values from localStorage
    const savedCacid = localStorage.getItem('cacid');
    const savedFirstName = localStorage.getItem('firstName');
    const savedMiddleName = localStorage.getItem('middleName');
    const savedLastName = localStorage.getItem('lastName');

    // Set the state variables with the retrieved values
    setCacID(savedCacid || '');
    setFirstName(savedFirstName || '');
    setMiddleName(savedMiddleName || '');
    setLastName(savedLastName || '');
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsAdmin(false);
    // Check if first name is "admin"
    if (firstName.toLowerCase() === 'admin') {
      console.log('Invalid first name');
      setError('Invalid first name. Please enter the first name that appears on your CAC Card.');
      // Display an error message or perform appropriate error handling
      return;
    }

    // Save the values in localStorage
    localStorage.setItem('cacid', cacid);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('middleName', middleName);
    localStorage.setItem('lastName', lastName);

    // Create an object with the form data
    const formData = {
      cacid,
      firstName,
      middleName,
      lastName,
    };

    // Make an HTTP POST request to your backend API
    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
        // Perform any necessary actions, such as showing a success message or redirecting the user
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
        // Display an error message or perform appropriate error handling
      });

    setSubmitted(true);
  };

  const handleTestClick = () => {
    // Logic for handling "Test" click
  };

  const handleAccountClick = () => {
    setSelectedButton('account');
    setShowLogo(false);

  };

  const handleAdminClick = () => {
    if (adminButtonDisabled) {
      setShowAdminLockoutMessage(true);
      setTimeout(() => {
        setShowAdminLockoutMessage(false);
      }, 3000);
      return;
    }
    setShowAdminLogin(true);
    setShowLogo(false);
  };
  

  const handleNewClick = () => {
    // Logic for handling "New" click
  };

  const handleUpdateClick = () => {
    console.log("Value of isAdmin:", isAdmin); // This line logs the value of isAdmin to the browser console
    setRedirectToAdmin(true);
    setHasBeenToAdminWebpage(true);
  };

  const handleViewClick = () => {
    // Logic for handling "View" click
  };

  const handleAdminLoginSubmit = (event) => {
    event.preventDefault();
    // Check if the entered credentials match the admin credentials
    if (
      adminCacid === '0000000001' &&
      adminFirstName === 'Admin' &&
      adminMiddleName === 'Research' &&
      adminLastName === 'Manager'
    ) {
      // Save admin status in local storage
      localStorage.setItem('isAdmin', 'true');

      setIsAdmin(true);
      setShowAdminLogin(false);
      setShowWelcomeAdminMessage(true);
      setShowLogo(false);
      setShowWelcomeMessage(false);
    } else {
      setAdminLoginAttempts((prevAttempts) => prevAttempts + 1);
      setAdminAttemptsLeft((prevAttemptsLeft) => prevAttemptsLeft - 1);
      setAdminLoginError(true);
      setShowAdminLogin(true);
      setShowLogo(false);
    }
  };

  useEffect(() => {
    if (adminButtonDisabled) {
      setShowAdminLockoutMessage(true);
      const timer = setTimeout(() => {
        setShowAdminLockoutMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [adminButtonDisabled]);

  const renderSignupForm = () => (
    <div className="signup-container">
      <div className="triangle"></div>
      <div className="image-container">
        <img src={signInImage} alt="Sign In" className="signin-image" />
        <div>
          <form className="signup-form" onSubmit={handleFormSubmit}>
            <p className="Credentials-Req"> Please Sign in with your credentials below.</p>
            <input
              type="text"
              placeholder="CAC ID"
              value={cacid}
              onChange={(e) => setCacID(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <button className="signup-button" type="submit">
              Continue
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );

  const renderHubArea = () => {
    if (redirectToAdmin) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className={`hub-area ${isAdmin ? 'admin-mode' : ''}`}>
        <div className="top-ribbon">
          <div className="ribbon-section">
            <h1 className="mipeace">MIPEACE</h1>
          </div>
          {showAdminLockoutMessage && (
            <h1 className="admin-lockout-message">
              You have entered the wrong admin credentials. Please try again in 30 minutes.
            </h1>
          )}
          <div className="ribbon-section right-section">
            <div className={`ribbon-section ${selectedButton === 'account' ? 'selected' : ''}`} onClick={handleAccountClick}>
              Account
            </div>
            {isAdmin && !showWelcomeMessage && !showLogo && (
              <div className="admin-buttons">
                <div className="clickable-section" onClick={handleNewClick}>
                  New
                </div>
                <div className="clickable-section" onClick={handleUpdateClick}>
                  Update
                </div>
                <div className="clickable-section" onClick={handleViewClick}>
                  View
                </div>
              </div>
            )}
            <div className={`clickable-section admin-button ${adminButtonDisabled ? 'disabled' : ''}`} onClick={handleAdminClick}>
              Admin
            </div>
          </div>
        </div>
        {selectedButton === '' && (
          <>
            {showWelcomeMessage && !isAdmin && (
              <div className="welcome-message">
                Welcome, <span className="nickname">{firstName}</span>!
              </div>
            )}
            {!showWelcomeMessage && showLogo && (
              <div className="center-logo">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
            )}
          </>
        )}
        {isAdmin && !showWelcomeMessage && !showLogo && (
          <div className="admin-welcome-message">Welcome Admin!</div>
        )}
        {selectedButton === 'account' && (
          <div className="account-container">
            <div className="account-info">
              <p>CAC ID: {cacid}</p>
              <p>First Name: {firstName}</p>
              <p>Middle Name: {middleName}</p>
              <p>Last Name: {lastName}</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  

  const renderAdminLogin = () => (
    <div className="admin-login-container">
      <div className="admin-login-content">
        <form className="admin-login-form" onSubmit={handleAdminLoginSubmit}>
          <img src={signInImage} alt="Sign In" className="admin-image" />
          <p className="Admin-Req"> Are you an admin?</p>
          {adminLoginError && (
            <p className="admin-login-error-message">
              Incorrect Admin Credentials. Please try again. Attempts left: {adminAttemptsLeft}
            </p>
          )}
          <input
            type="text"
            placeholder="CAC ID"
            value={adminCacid}
            onChange={(e) => setAdminCacid(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            value={adminFirstName}
            onChange={(e) => setAdminFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Middle Name"
            value={adminMiddleName}
            onChange={(e) => setAdminMiddleName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={adminLastName}
            onChange={(e) => setAdminLastName(e.target.value)}
            required
          />
          <button className="admin-login-button" type="submit" disabled={adminButtonDisabled}>
            Login
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {!showSignup && !submitted ? (
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Welcome to the Psychological Exam</p>
              </header>
            ) : null}
            {showSignup && !submitted ? renderSignupForm() : null}
            {submitted ? renderHubArea() : null && showWelcomeMessage}
            {showAdminLogin && renderAdminLogin()}
          </Route>
          <Route path="/tests">
            <TestWebpage />
          </Route>
          <Route path="/admin">
          {isLoading ? (
              <div>Loading...</div>
            ) : (
                <AdminWebpage
                  isAdmin={isAdmin}
                  hasBeenToAdminWebpage={hasBeenToAdminWebpage}
                  setHasBeenToAdminWebpage={setHasBeenToAdminWebpage}
                  setIsAdmin={setIsAdmin} // Pass setIsAdmin as a prop
                />
              )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
