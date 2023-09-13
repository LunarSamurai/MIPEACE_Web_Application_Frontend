import React, { useState, useEffect, useRef } from 'react';
import logo from './brain-illustration-12-svgrepo-com.svg';
import signInImage from './logo-big.png';
import './TestInstance.css';
import TestPage from './TestWebpage.js';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import TestWebpage from './TestWebpage.js';
import AdminWebpage from './AdminWebpage.js';
import defaultProfileImage from './defaultProfileImage.jpg';
import defaultBannerImage from './defaultBannerImage.jpg';
import { useHistory } from 'react-router-dom';


function TestInstance() {
  
  //Sign up container
  const [showSignup, setShowSignup] = useState(false);
  const [cacid, setCacID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  //Hub Area Container
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [error, setError] = useState('');
  const [isRandomizeEnabled, setIsRandomizeEnabled] = useState(false);

  //Admin Login
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCacid, setAdminCacid] = useState('');
  const [adminFirstName, setAdminFirstName] = useState('');
  const [adminMiddleName, setAdminMiddleName] = useState('');
  const [adminLastName, setAdminLastName] = useState('');
  const [adminLoginAttempts, setAdminLoginAttempts] = useState(0);
  const [adminButtonDisabled, setAdminButtonDisabled] = useState(false);
  const [showWelcomeAdminMessage, setShowWelcomeAdminMessage] = useState(false);
  const [redirectToRootPage, setRedirectToRootPage] = useState(false);
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState(false);
  const MAX_LOGIN_ATTEMPTS = 5;
  const [adminAttemptsLeft, setAdminAttemptsLeft] = useState(MAX_LOGIN_ATTEMPTS);
  const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  const [showAdminLockoutMessage, setShowAdminLockoutMessage] = useState(false);
  const [hasBeenToAdminWebpage, setHasBeenToAdminWebpage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //Sub Area States
  const [showAccountScreen, setAccountScreen] = useState(false);
  const [showTestScreen, setTestScreen] =  useState(false);

  // State variables for profile picture and banner image
  const [profilePicture, setProfilePicture] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);

  // Take Test container
  const [showTakeTest, setShowTakeTest] = useState(false);
  const [testOrders, setTestOrders] = useState([]);
  const [redirectToTest, setRedirectToTest] = useState(false); // State variable for redirection
  const [completionStatus, setCompletionStatus] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [tests, setTests] = useState([]);


  // Demographics
  const [showDemographicsDetails, setShowDemographicsDetails] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);

  // Edit Demographics Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);  // to keep track of selected detail from dropdown
  const [newValue, setNewValue] = useState("");
  const [dutyStatus, setDutyStatus] = useState("");
  const [age, setAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [grade, setGrade] = useState("");
  const [sex, setSex] = useState("");
  const [handedness, setHandedness] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [militaryOccupationalSpeciality, setMilitaryOccupationalSpeciality] = useState("");
  const [siblingsCount, setSiblingsCount] = useState("");
  
  // New Demographics Modal
  const [showNewDemographicModal, setShowNewDemographicModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const demographicQuestions = [
    { question: "What is your current Duty Status?", setter: setDutyStatus },
    { question: "What is your Age?", setter: setAge },
    { question: "What is your Marital Status?", setter: setMaritalStatus },
    { question: "What is your Grade?", setter: setGrade },
    { question: "What is your sex? (M|F)", setter: setSex },
    { question: "What is your best hand?", setter: setHandedness },
    { question: "What is your Height?", setter: setHeight },
    { question: "What is your Weight? (lbs)", setter: setWeight },
    { question: "What is your Military Occupational Specialty?", setter: setMilitaryOccupationalSpeciality },
    { question: "How many siblings do you have?", setter: setSiblingsCount }
];
const [tempAnswer, setTempAnswer] = useState("");  // Temporary answer before pressing Next
const [selectedDemographic, setSelectedDemographic] = useState('');
const [inputValue, setInputValue] = useState('');
const history = useHistory();

const handleListClick = (detailKey, detailName) => {
  setSelectedDetail(detailKey);
  setSelectedDemographic(detailName);
  setNewValue(userDetails[detailKey] || '');  // Set the initial value to the current value in userDetails
};

const [userDetails, setUserDetails] = useState({
  dutyStatus: '',
  age: '',
  maritalStatus: '',
  grade: '',
  sex: '',
  handedness: '',
  height: '',
  weight: '',
  militaryOccupationalSpeciality: '',
  siblingsCount: ''
});

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignup(true);
    }, 1250);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    // Retrieve values from SessionStorage
    const savedCacid = sessionStorage.getItem('cacid');
    const savedFirstName = sessionStorage.getItem('firstName');
    const savedMiddleName = sessionStorage.getItem('middleName');
    const savedLastName = sessionStorage.getItem('lastName');

    // Set the state variables with the retrieved values
    setCacID(savedCacid || '');
    setFirstName(savedFirstName || '');
    setMiddleName(savedMiddleName || '');
    setLastName(savedLastName || '');
  }, []);
  const [cacIdError, setCacIdError] = useState(null);

  const handleCacIdChange = (event) => {
      const value = event.target.value;
      if (value === "0000000001") {
          setCacIdError("The cacId '0000000001' is restricted.");
      } else {
          setCacIdError(null);
      }
      setCacID(value);
  };

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

    if (localStorage.getItem('testStarted') === 'true') {
      let currentCount = parseInt(localStorage.getItem('amountOfExaminees') || '0');
      currentCount += 1;
      localStorage.setItem('amountOfExaminees', currentCount.toString());
    }

    // Save the values in localStorage
    sessionStorage.setItem('cacid', cacid);
    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('middleName', middleName);
    sessionStorage.setItem('lastName', lastName);

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
    setTestScreen(true);
    setShowTakeTest(true);
    setAccountScreen(false);
    setShowWelcomeMessage(false);
    setShowLogo(false);
    fetchFileList();
  };
  
  
  const handleTakeTestButton = () => {
    const testIsCompleted =  sessionStorage.getItem('assessmentComplete');
    if(testIsCompleted == 'Completed'){
      setCompletionStatus('Completed');
      setRedirectToTest(false);
    }else{
      sessionStorage.setItem('assessmentComplete', 'In Progress');
      console.log(sessionStorage.getItem('assessmentComplete'));
      setCompletionStatus('In Progress');
      setRedirectToTest(true);
    }
  }

  const handleAccountClick = () => {
    setAccountScreen(true);
    setShowWelcomeMessage(false);
    setShowTakeTest(false);
    setShowLogo(false);
  };

  const handleNewDemographicAnswer = (value) => {
    setTempAnswer(value);
    const questionObj = demographicQuestions[questionIndex];
    questionObj.setter(value);
    if (questionIndex < demographicQuestions.length - 1) {
        setQuestionIndex(questionIndex + 1);
    } else {
        setShowNewDemographicModal(false);
        setQuestionIndex(0);
    }
  };
  const handleNextButtonClick = () => {
    const setter = demographicQuestions[questionIndex].setter;

    // Basic validation, can be expanded based on requirements
    if (!inputValue) {
        console.warn("Please provide an answer before proceeding.");
        return;
    }

    setter(inputValue);

    if (questionIndex < demographicQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowNewDemographicModal(false);
      setQuestionIndex(0);
    }

    setInputValue('');  // Clear the state
};

  
  const handleNewDemographicButtonClick = () => {
  setShowNewDemographicModal(true);
  };
  
  const handleSaveAllDetailsButton = () => {
    console.log("handleSaveDetailsButton called");

    const dataToSend = {
        cacID: cacid,
        dutyStatus: dutyStatus,
        age: age,
        maritalStatus: maritalStatus,
        grade: grade,
        sex: sex,
        handedness: handedness,
        height: height,
        weight: weight,
        militaryOccupationalSpeciality: militaryOccupationalSpeciality,
        siblingsCount: siblingsCount
    };
    console.log("Sending data:", dataToSend);

    fetch("http://localhost:8080/api/userdetails/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
        if (data.message) {
            setResponseMessage(data.message); // this will trigger the modal to open
        } else {
            setResponseMessage("User details updated successfully");
        }
    })
    .catch(error => {
        console.error("There was an error updating the user details", error);
        console.log("Error encountered during fetch");
        setResponseMessage("There was an error updating the user details");
    });
};
  const handleSaveDetailsButton = () => {
    console.log("handleSaveDetailsButton called");
    if (selectedDetail) {
        let updatedValue;
        switch (selectedDetail) {
            case "dutyStatus":
                updatedValue = newValue;
                setDutyStatus(updatedValue);
                break;
            case "age":
                updatedValue = newValue;
                setAge(updatedValue);
                break;
            case "maritalStatus":
                updatedValue = newValue;
                setMaritalStatus(updatedValue);
                break;
            case "grade":
                updatedValue = newValue;
                setGrade(updatedValue);
                break;
            case "sex":
                updatedValue = newValue;
                setSex(updatedValue);
                break;
            case "handedness":
                updatedValue = newValue;
                setHandedness(updatedValue);
                break;
            case "height":
                updatedValue = newValue;
                setHeight(updatedValue);
                break;
            case "weight":
                updatedValue = newValue;
                setWeight(updatedValue);
                break;
            case "militaryOccupationalSpeciality":
                updatedValue = newValue;
                setMilitaryOccupationalSpeciality(updatedValue);
                break;
            case "siblingCount":
                updatedValue = newValue;
                setSiblingsCount(updatedValue);
                break;
            default:
                console.warn(`Unknown detail selected: ${selectedDetail}`);
                break;
        }

        const dataToSend = {
            cacID: cacid,
            dutyStatus: dutyStatus,
            age: age,
            maritalStatus: maritalStatus,
            grade: grade,
            sex: sex,
            handedness: handedness,
            height: height,
            weight: weight,
            militaryOccupationalSpeciality: militaryOccupationalSpeciality,
            siblingsCount: siblingsCount
        };
        console.log("Sending data:", dataToSend);

        fetch("http://localhost:8080/api/userdetails/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data);
            if (data.message) {
                setResponseMessage(data.message); // this will trigger the modal to open
            } else {
                setResponseMessage("User details updated successfully");
            }
        })
        .catch(error => {
            console.error("There was an error updating the user details", error);
            console.log("Error encountered during fetch");
            setResponseMessage("There was an error updating the user details");
        });
    }
};

  const handleLogoutClick = (event) => {
    event.preventDefault(); 
    sessionStorage.clear();
    localStorage.setItem('modalClosed', 'false');
    localStorage.setItem('lastRoute', '/');  // Resetting the lastRoute to root
    console.log(localStorage.getItem('modalClosed'));
    console.log("RedirectTo from local storage:", localStorage.getItem('lastRoute'));
    history.push('/');
  }

  const handleBannerImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result;
        setBannerImage(image);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleProfilePictureChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result;
        setProfilePicture(image);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleEditBannerClick = () => {
    bannerInputRef.current.click();
  };

  const handleEditProfileClick = () => {
    profileInputRef.current.click();
  };
  
  const fetchFileList = () => {
    fetch('http://localhost:8080/api/get-file-names')
      .then((response) => response.json())
      .then((data) => {
        setTests(data);
        console.log(tests);
        setFileNames(data);
        console.log(fileNames);
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
      });
  };

  function MessageModal({ message, onClose, onButtonClick }) {
    return (
        <div className='message-modal'>
            <div className='message-modal-content'>
                <p>{message}</p>
                <button 
                  className="message-modal-close-button"
                  onClick={() => {
                      if (onButtonClick) onButtonClick();
                      onClose();
                  }}
              >
                  Close
              </button>
            </div>
        </div>
    );
  }
  const handleAdminLoginSubmit = (event) => {
    event.preventDefault();

    // Create an object with the form data

    // Make an HTTP GET request to your backend API for retrieving admin data
    fetch(`http://localhost:8080/api/admin-login?cacid=${adminCacid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from backend:', data); // Print the response from the backend
        if (data === 'Invalid admin credentials') {
          console.log('Invalid admin credentials');
          setAdminLoginError(true);
        } else {
          const { firstName, middleName, lastName } = data;
          // Check if entered admin credentials match the retrieved admin data
          if (
            adminCacid === '0000000001' &&
            firstName === adminFirstName &&
            middleName === adminMiddleName &&
            lastName === adminLastName
          ) {
            localStorage.setItem('isAdmin', 'true');
            console.log('Admin login successful');
            console.log('CAC ID: ', adminCacid);
            console.log('First Name:', firstName);
            console.log('Middle Name:', middleName);
            console.log('Last Name:', lastName);
            // Save admin status in local storage or state
            // Here, we're using state to track the logged-in status
            setAdminLoginError(false);
            setIsAdmin(true);
            setShowAdminLogin(false);
            setShowWelcomeAdminMessage(true);
            setShowLogo(false);
            setShowWelcomeMessage(false);
          } else {
            setAdminLoginAttempts((prevAttempts) => prevAttempts + 1);
            setAdminAttemptsLeft((prevAttemptsLeft) => prevAttemptsLeft - 1);
            setShowAdminLogin(true);
            setShowLogo(false);
            setIsAdmin(false);
            setAdminLoginError(true);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
        // Display an error message or perform appropriate error handling
      });
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
              onChange={handleCacIdChange}
              required
            />
            {cacIdError && <div className="error-message">{cacIdError}</div>}
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
    if (redirectToTest){
        return <Redirect to="/test/" />
    }
    if (redirectToRootPage){
        return <Redirect to="/" />
    }
      
    const sortedTestOrders = testOrders.sort((a, b) => a.test_order_number - b.test_order_number);
    return (
      <div className={`hub-area ${isAdmin ? 'admin-mode' : ''}`}>
        <div className="top-ribbon">
          <div className="ribbon-section">
            <div className="mipeace">MIPEACE</div>
          </div>
          <div className="ribbon-section-center">
              <nav>
                  <ul>
                      <li><a href="#0" onClick={handleTestClick}>Test</a></li>
                      <li><a href="#0" onClick={handleAccountClick}>Account</a></li>
                      <li><a href="#0" onClick={handleLogoutClick}>Logout</a></li>
                  </ul>
              </nav>
          </div>
        </div>
        {showWelcomeMessage && !isAdmin && (
          <div className="welcome-message">
            Welcome, <span className="nickname">{firstName}</span>!
          </div>
        )}
        {!showWelcomeMessage && showLogo && (
          <div className="center-logo">
            <img src={logo} className="testInstance-logo" alt="logo" />
          </div>
        )}
        {showTakeTest && (
          <div className="take-test-container">
            <h1 className="test-container-header">Army Research Institute Testing System</h1>
            <div className="test-completion-amount-container">
              <p className="test-completion-amount-container-title">Current Completion: {completionStatus}</p>
            </div>
            <button className="take-test-button" onClick={handleTakeTestButton}>Take the test</button>
          </div>
        )}
        {showAccountScreen && (
          <div className="account-container">
            <div className="profile-section">
              <div className="banner-section">
                {bannerImage ? (
                  <img src={bannerImage} alt="Banner" className="banner-image" />
                ) : (
                  <img src={defaultBannerImage} alt="Default Banner" className="default-banner" />
                )}
                <button className="edit-banner" onClick={handleEditBannerClick}>
                  Edit
                </button>
              </div>
            </div>
            <div className="profile-divider-section">
              <div className="profile-picture-section">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="profile-image" />
                ) : (
                  <img src={defaultProfileImage} alt="Default Profile" className="default-profile" />
                )}
                <button className="edit-profile" onClick={handleEditProfileClick}>
                  Edit Profile Picture
                </button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleBannerImageChange}
                  ref={bannerInputRef}
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfilePictureChange}
                  ref={profileInputRef}
                />
              </div>
              <div className="account-details">
                <div className="header">
                  <h1 className="profile-title">Profile</h1>
                </div>
                <div className="name-details">
                    <p>CAC ID: {cacid}</p>
                    <p>First Name: {firstName}</p>
                    <p>Middle Name: {middleName}</p>
                    <p>Last Name: {lastName}</p>
                </div>
                <div className="demographics">
                  <h3 className="account-page-demographics-title">Demographics</h3>
                  <div className="account-page-demographics-list">
                  <ul className='account-page-list-of-demographics'>
                      <li>Duty Status: {dutyStatus || "N/A"}</li>
                      <li>Age: {age || "N/A"}</li>
                      <li>Marital Status: {maritalStatus || "N/A"}</li>
                      <li>Grade: {grade || "N/A"}</li>
                      <li>Sex: {sex || "N/A"}</li>
                      <li>Handedness: {handedness || "N/A"}</li>
                      <li>Height: {height || "N/A"}</li>
                      <li>Weight: {weight || "N/A"}</li>
                      <li>Military Occupational Speciality: {militaryOccupationalSpeciality || "N/A"}</li>
                      <li>Amount of Siblings: {siblingsCount || "N/A"}</li>
                  </ul>
                  {(!dutyStatus || !age || !maritalStatus || !grade || !sex || !handedness || !height || !weight || !militaryOccupationalSpeciality || !siblingsCount) && (
                        <p className="no-records-found">Please Press Edit Details to Add Records</p>
                    )}
                  </div>
                  <button className="demographics-see-details-button" onClick={() => setShowDemographicsDetails(true)}>Edit Details</button>
                </div>
              </div>
            </div>
          </div>)}
          {showDemographicsDetails && (
          <div className="demographics-overlay" onClick={() => setShowDemographicsDetails(false)}>
              <div className="demographics-details" onClick={(e) => e.stopPropagation()}>
                  <div className="demographics-title">
                    <span>Demographics Details</span>
                  </div>
                  <ul className='list-of-demographics'>
                      <li>Duty Status: {dutyStatus}</li>
                      <li>Age: {age}</li>
                      <li>Marital Status: {maritalStatus}</li>
                      <li>Grade: {grade}</li>
                      <li>Sex: {sex}</li>
                      <li>Handedness: {handedness}</li>
                      <li>Height: {height}</li>
                      <li>Weight: {weight}</li>
                      <li>Military Occupational Speciality: {militaryOccupationalSpeciality}</li>
                      <li>Amount of Siblings: {siblingsCount}</li>
                  </ul>
                  <div className='demographics-details-buttons-container'>
                    <div className='demographics-details-buttons-description-container'>
                    <p className='demographics-details-description'>Must press the "Save" button in order to save your changes!</p>
                    </div>
                    {/* Direct alert on the button to test if it's being clicked */}
                    <button className="demographics-button-new" onClick={handleNewDemographicButtonClick}>New</button>
                    <button className="demographics-button-edit" onClick={() => setShowEditModal(true)}>Edit</button>
                    <button 
                        className='demographics-button-save' 
                        onClick={handleSaveAllDetailsButton}
                    >
                        Save
                    </button>
                  </div>
              </div>
          </div>
          )}
          {showEditModal && (
              <div className="edit-overlay" onClick={() => setShowEditModal(false)}>
                  <div className="edit-details" onClick={(e) => e.stopPropagation()}>
                      <div className='demographics-edit-modal-title'>
                          <span>Please choose an attribute to change:</span>
                      </div>
                      <div className='demographics-edit-modal-editing-container center-container'>
                          <ul className="menu clearfix">
                              <li className="parent">
                                  <a href="#">Demographics</a>
                                  <ul className="children">
                                      <li onClick={() => handleListClick('dutyStatus', 'Duty Status')} style={selectedDetail === 'dutyStatus' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Duty Status</a></li>
                                      <li onClick={() => handleListClick('age', 'Age')} style={selectedDetail === 'age' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Age</a></li>
                                      <li onClick={() => handleListClick('maritalStatus', 'Marital Status')} style={selectedDetail === 'maritalStatus' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Marital Status</a></li>
                                      <li onClick={() => handleListClick('grade', 'Grade')} style={selectedDetail === 'grade' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Grade</a></li>
                                      <li onClick={() => handleListClick('sex', 'Sex')} style={selectedDetail === 'sex' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Sex</a></li>
                                      <li onClick={() => handleListClick('handedness', 'Handedness')} style={selectedDetail === 'handedness' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Handedness</a></li>
                                      <li onClick={() => handleListClick('height', 'Height')} style={selectedDetail === 'height' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Height</a></li>
                                      <li onClick={() => handleListClick('weight', 'Weight')} style={selectedDetail === 'weight' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Weight</a></li>
                                      <li onClick={() => handleListClick('militaryOccupationalSpeciality', 'Military Occupational Speciality')} style={selectedDetail === 'militaryOccupationalSpeciality' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Military Occupational Speciality</a></li>
                                      <li onClick={() => handleListClick('siblingsCount', 'Amount of Siblings')} style={selectedDetail === 'siblingsCount' ? { backgroundColor: '#e0e0e0' } : {}}><a href="#">Amount of Siblings</a></li>
                                  </ul>
                              </li>
                          </ul>
                          <div className="input-container">
                            <div className='current-selected-demographic'>
                                <small>Currently Selected Demographic: <span>{selectedDemographic}</span></small>
                            </div>
                              <input className='demographics-edit-input'
                                  type="text"
                                  value={newValue}
                                  onChange={(e) => setNewValue(e.target.value)}
                                  placeholder="Enter new value"
                              />
                          </div>
                      </div>
                      <button 
                        className='demographics-button-save' 
                        onClick={() => {
                          if (selectedDetail && userDetails.hasOwnProperty(selectedDetail)) {
                            setUserDetails(prevDetails => ({
                              ...prevDetails,
                              [selectedDetail]: newValue
                            }));

                            handleSaveDetailsButton();
                          } else {
                            console.warn(`Unknown detail selected: ${selectedDetail}`);
                          }
                        }}
                      >
                        Save
                      </button>
                  </div>
              </div>
          )}
            {showNewDemographicModal && (
                <div className="new-overlay">
                    <div 
                        className="new-demographic-modal" 
                        onClick={() => setShowNewDemographicModal(false)}
                    >
                        <div 
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p className='modal-questions'><span>{demographicQuestions[questionIndex].question}</span></p>
                            <div className='demographics-new-input-container'>
                                <p className='description'>Please enter your value below:</p>
                                <input 
                                    type="text"
                                    className="demographics-input"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <button 
                                    className="close-button" 
                                    onClick={handleNextButtonClick}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          {responseMessage && (
              <MessageModal
                  message={responseMessage}
                  onClose={() => setResponseMessage(null)}
              />
          )}
      </div>
    );
  };

  const renderAdminLogin = () => (
    <div className="admin-login-overlay" onClick={() => setShowAdminLogin(false)}>
      <div className="admin-login-container" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );

  return (
    <div className="testInstance">
        {!showSignup && !submitted && (
            <header className="testInstance-header">
                <img src={logo} className="testInstance-logo" alt="logo" />
                <p>Welcome to the Psychological Exam</p>
            </header>
        )}
        {showSignup && !submitted && renderSignupForm()}
        {submitted && renderHubArea()}
        {showAdminLogin && renderAdminLogin()}
    </div>
);

}

export default TestInstance;
