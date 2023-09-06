import React, { useState, useEffect, useRef } from 'react';
import logo from './brain-illustration-12-svgrepo-com.svg';
import signInImage from './logo-big.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import TestWebpage from './TestWebpage.js';
import AdminWebpage from './AdminWebpage.js';
import defaultProfileImage from './defaultProfileImage.jpg';
import defaultBannerImage from './defaultBannerImage.jpg';
import { redirect } from 'react-router';

function App() {
  
  

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

  // New Button Container
  const [showNewContainer, setShowNewContainer] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');

  // Edit Button Container
  const [showEditContainer, setShowEditContainer] = useState(false);
  const [showEditTestPoolContainer, setShowEditTestPoolContainer] = useState(false);
  const [numOfTests, setNumOfTests] = useState(0);
  const [selectedTests, setSelectedTests] = useState([]);
  const [tests, setTests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRandomizeEnabled, setIsRandomizeEnabled] = useState(false);

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
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log("isAdmin from localStorage: ", isAdmin); // log to the console
    setIsAdmin(isAdmin);
    setIsLoading(false);
    const currentCompletionStatus = sessionStorage.getItem('assessmentComplete');
    if(currentCompletionStatus == 'Completed'){
      setCompletionStatus('Completed');
    }
    else if(currentCompletionStatus == 'In Progress'){
      setCompletionStatus('In Progress');
    }
    else{
      setCompletionStatus('Not Started Yet');
      
    }
    if(sessionStorage.length > 0){
      setShowSignup(false);
      setShowLogo(false);
      setSubmitted(true);
    }else{
      sessionStorage.clear();
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
    setShowNewContainer(false);
    setShowEditContainer(false);
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
    setShowNewContainer(false);
    setShowEditContainer(false);
    
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
    const inputElement = document.querySelector('.demographics-input');
    const inputValue = inputElement.value;
    const setter = demographicQuestions[questionIndex].setter;
    setter(inputValue);
    if (questionIndex < demographicQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowNewDemographicModal(false);
      setQuestionIndex(0);
    }
    inputElement.value = '';  // Clear the input field
  };
  
  const handleNewDemographicButtonClick = () => {
  setShowNewDemographicModal(true);
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

  const handleLogoutClick = () => {
    sessionStorage.clear();
    window.location.reload();

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

  const handleUpdateClick = () => {
    console.log("Value of isAdmin:", isAdmin); // This line logs the value of isAdmin to the browser console
    setRedirectToAdmin(true);
    setHasBeenToAdminWebpage(true);
  };

  const handleViewClick = () => {
    // Logic for handling "View" click
  };

  const handleEditClick = () => {
    // Logic for handling "Edit" click
    setShowEditContainer(true);
    setAccountScreen(false);
    setShowTakeTest(false);
    setShowNewContainer(false);
    fetchFileList();
    
  }

  const handleEditButtonClick = () => {
    setShowEditTestPoolContainer(true);
    fetch('http://localhost:8080/test/questions')
    .then((response) => response.json())
    .then((data) => {
      const testsFromServer = data.map((test) => ({
        id: test,
        name: test,
      }));
      setTests(testsFromServer);
    })
    .catch((error) => console.error('Error:', error));
  }

  const handleRandomizeClick = () => {
    const newRandomizeValue = !isRandomizeEnabled; // Toggle the value
    setIsRandomizeEnabled(newRandomizeValue);
    
    // Store the new value in sessionStorage
    sessionStorage.setItem('isRandomizedEnabled', newRandomizeValue.toString());
    
    // Call handleEditClick to perform additional actions
    handleEditClick();
  };
  

  const handleUpdateTests = () => {
    if (isNaN(numOfTests) || numOfTests === '') {
      setErrorMessage('Invalid Value Entered, please enter only numeric values');
      return;
    }

    const updatedSelectedTests = Array(numOfTests).fill('');
    setSelectedTests(updatedSelectedTests);
    setErrorMessage('');
  };

  const handleTestSelection = (event, index) => {
    const updatedSelectedTests = [...selectedTests];
    updatedSelectedTests[index] = event.target.value;
    setSelectedTests(updatedSelectedTests);
  };
  
  const handleUpdateNumOfTests = (event) => {
    const value = parseInt(event.target.value);
    setNumOfTests(value);
  };

  const handleRemoveButtonClick = (event) => {
    event.preventDefault();
  
    const filesToRemove = selectedTests.filter((fileName) => !!fileName);
    console.log(filesToRemove);
    // Create an array of promises for each file removal request
    const removePromises = filesToRemove.map((fileName) => {
      return fetch('http://localhost:8080/api/remove-files', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([fileName]), // Pass an array of the file name
      })
        .catch((error) => {
          console.error(error);
          console.log(`Failed to remove file "${fileName}"`);
          throw error; // Propagate the error to the promise chain
        });
    });
  
    // Execute all promises and handle the results
    Promise.all(removePromises)
      .then(() => {
        console.log('All files removed successfully');
        fetchFileList(); // Fetch the updated file list from the server
        setShowEditTestPoolContainer(false); // Hide the edit container
        setShowEditContainer(false);
        setTimeout(() => {
          setShowEditContainer(true);
        }, 2);
        
      })
      .catch((error) => {
        console.error('Error while removing files:', error);
        // Handle any errors that occurred during the requests
        // Display an error message or perform appropriate error handling
      });
      
  };

  useEffect(() => {
    if (showNewContainer) {
      fetchFileList();
    }
  }, [showNewContainer]);

  useEffect(() => {
    if (showEditContainer) {
      fetchFileList();
    }
  }, [showEditContainer]);

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

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFileName(file ? file.name : '');
  }
  
  const handleFileUpload = () => {
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('http://localhost:8080/api/upload-file', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File Uploaded Successfully");
            // File upload successful
            // Fetch the updated file list from the server
            fetchFileList();
            setShowNewContainer(false); // Hide the new container temporarily
            setSelectedFileName(''); // Reset the selected file name
            setShowNewContainer(true); // Show the new container again to trigger the useEffect
          } else {
            // File upload failed
            // Handle the error case
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors that occurred during the request
        });
    } else {
      // Handle case when no file is selected
      console.log('No file selected.');
    }
  };

  const handleNewClick = () => {
    // Logic for handling "New" click
    setShowNewContainer(true);
    setShowTakeTest(false);
    setAccountScreen(false);
    setShowEditContainer(false);
    fetch('http://localhost:8080/api/get-file-names')
    .then((response) => response.json())
    .then((data) => {
      setTests(data);
      console.log(tests);
      setFileNames(data);
      console.log(fileNames);
      setShowNewContainer(true);
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
    const renderNewContainer = () => {
      if (showNewContainer) {
        return (
          <div className="new-container">
            <h1 className = "new-h1">Want to add new files to the test pool?</h1>
            <div className = "Spacer_section">
              <h3 className = "new-spacer-title">Current List</h3>
              <ul>
                {fileNames.map((fileName) => (
                <li key={fileName}>{fileName}</li>
                ))}
              </ul>
            </div>
            <p className = "directory-message">Please press "upload" twice for updated list.</p>
            <label htmlFor="file-upload" className="custom-file-input-button">
              {selectedFileName || 'Choose file'}
            </label>
            <input
              type="file"
              id="file-upload"
              className="file-input"
              onChange={handleFileInputChange}
              accept=".txt"
             />
            <button className = "upload-button" onClick={handleFileUpload}>
              Upload
            </button>
          </div>
        );
      }
      return null;
    };

    const renderEditContainer = () => {
      if (showEditContainer) {
        return (
          <div className="edit-current-test-pool-container">
            <h1 className="edit-current-test-pool-header">Edit Current Test Pool</h1>
            <div className="current-list-container">
              <h3 className="current-list-title">Current List</h3>
              <ul className = "editTestPoolList">
                {fileNames.map((fileName, index) => (
                  <li key={index}>{fileName}</li>
                ))}
              </ul>
            </div>
            <h3 className="edit-bottom-title">
              Randomized Testing: 
            </h3>
            {sessionStorage.getItem('isRandomizedEnabled') === 'true' ? (
                <p className="randomize-state-true">Enabled</p>
              ) : (
                <p className="randomize-state-false">False</p>
              )}
            <div className = "bottom-buttons">
            <button className="edit-button" onClick={handleEditButtonClick}>
              Edit
            </button>
            <button className="reload-button" onClick={handleEditClick}>
              Reload
            </button>
            <button className = "randomize-button" onClick={handleRandomizeClick}>
              Randomize
            </button>
            </div>
          </div>
        );
      }
      return null;
    };
  
    const renderEditTestPoolContainer = () => {

      if (showEditTestPoolContainer) {
        return (
          <div className="edit-test-pool-container">
            <div className="edit-test-pool-content">
              <div className="edit-test-pool-form">
                <form onSubmit={handleRemoveButtonClick}>
                  <h1 className="edit-test-pool-header">Edit the Test Pool</h1>
                  <div className="amount-input-container">
                    <label htmlFor="test-dropdown" className="amount-input">
                      Items to remove:
                    </label>
                    {selectedTests.map((selectedTest, index) => (
                      <select
                        key={`select_${index}`}
                        className="form-select"
                        onChange={(event) => handleTestSelection(event, index)}
                        value={selectedTest}
                      >
                        <option value="">
                          -- Select a test --
                        </option>
                        {tests.length > 0 &&
                          tests.map((test) => (
                            <option key={test.id} value={test.id}>
                              {test.name}
                            </option>
                          ))}
                      </select>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="num-of-tests" className="form-label">
                      Number of Tests in Sequence:
                    </label>
                    <input
                      type="number"
                      id="num-of-tests"
                      name="num-of-tests"
                      className="form-control"
                      value={numOfTests}
                      onChange={handleUpdateNumOfTests}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdateTests}
                    >
                      Update
                    </button>
                  </div>
                  <button className="remove-button" 
                   onClick={(event) => handleRemoveButtonClick(event)} // Pass the event object here
                   >
                    Remove
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };
      
    const sortedTestOrders = testOrders.sort((a, b) => a.test_order_number - b.test_order_number);
    return (
      <div className={`hub-area ${isAdmin ? 'admin-mode' : ''}`}>
        <div className="top-ribbon">
          <div className="ribbon-section">
            <div className="mipeace">MIPEACE</div>
          </div>
          {showAdminLockoutMessage && (
            <h1 className="admin-lockout-message">
              You have entered the wrong admin credentials. Please try again in 30 minutes.
            </h1>
          )}
          <div className="ribbon-section-center">
              <nav>
                  <ul>
                      <li><a href="#0" onClick={handleTestClick}>Test</a></li>
                      <li><a href="#0" onClick={handleAccountClick}>Account</a></li>
                      <li><a href="#0" onClick={handleLogoutClick}>Logout</a></li>
                      {isAdmin && !showWelcomeMessage && !showLogo ? (
                          <li>
                              <a href="#0">Admin</a>
                              <ul className="admin-buttons">
                                  <li><a href="#0" onClick={handleNewClick}>New</a></li>
                                  <li><a href="#0" onClick={handleEditClick}>Edit</a></li>
                                  <li><a href="#0" onClick={handleUpdateClick}>Update</a></li>
                                  <li><a href="#0" onClick={handleViewClick}>View</a></li>
                              </ul>
                          </li>
                      ) : (
                        isAdmin && (
                        <li>
                          <a href="#0" className={`clickable-section admin-button ${adminButtonDisabled ? 'disabled' : ''}`} onClick={handleAdminClick}>
                              Admin
                          </a>
                        </li>
                        )
                      )}
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
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        )}
        {isAdmin && !showWelcomeMessage && !showLogo && (
          <div className="admin-welcome-message">Welcome Admin!</div>
        )}
        {showTakeTest && !isAdmin &&(
          <div className="take-test-container">
            <h1 className="test-container-header">Army Research Institute Testing System</h1>
            <div className="test-completion-amount-container">
              <p className="test-completion-amount-container-title">Current Completion: {completionStatus}</p>
            </div>
            <button className="take-test-button" onClick={handleTakeTestButton}>Take the test</button>
          </div>
        )}
        {showTakeTest && isAdmin && (
          <div className="take-test-container">
            <h1 className="test-container-header">Army Research Institute Testing System</h1>
            <div className="test-order-container">
              <p className="test-order-container-title">Current Test Order: </p>
              <ul className="test-order-list">
              {sortedTestOrders.map((testOrder) => (
                <li key={testOrder.id} className="test-order-item">
                  &bull; {testOrder.text_file_name}
                </li>
              ))}
            </ul>
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
                  <h1 className="cac-id">CAC ID: {cacid}</h1>
                </div>
                <div className="name-details">
                  <p>First Name: {firstName}</p>
                  <p>Middle Name: {middleName}</p>
                  <p>Last Name: {lastName}</p>
                </div>
                <div className="demographics">
                  <h3>Demographics</h3>
                  <button onClick={() => setShowDemographicsDetails(true)}>See Details</button>
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
                    <button className="demographics-button-save" onClick={handleSaveDetailsButton}>Save</button>
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
                                  // Remove the value and onChange props
                                  //value={tempAnswer}
                                  // onChange={(e) => handleNewDemographicAnswer(e.target.value)}
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
        {renderNewContainer()} 
        {renderEditContainer()}
        {renderEditTestPoolContainer()}
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
          <Route path="/test">
          {isLoading ? (
              <div>Loading...</div>
            ) : (
                <TestWebpage
                  isRandomizeEnabled={isRandomizeEnabled}
                  setIsRandomizeEnabled={setIsRandomizeEnabled}
                />
              )}
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
