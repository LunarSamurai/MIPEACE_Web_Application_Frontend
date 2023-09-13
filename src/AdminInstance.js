import React, { useState, useEffect, useRef, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TestInstance from './TestInstance.js';
import TestPageContext from './TestPageContext';
import AdminPage from './AdminWebpage.js';
import App from './App.js';
import './AdminInstance.scss';  // Importing the styles
import TestPage from './TestWebpage.js';
import MIPEACE_Logo from './MIPEACE_LOGO.png'
import { useHistory } from 'react-router-dom';
import { redirect } from 'react-router';

function AdminInstance() {

    const [activeItem, setActiveItem] = useState('Connections'); // Initial active item set to 'Connections'
    const [redirectToRootPage, setRedirectToRootPage] = useState(false);
    const [isExamEnabled, setIsExamEnabled] = useState(false);

    // Main Modal Const
    const [showMainModal, setShowMainModal] = useState(true);
    const [showMainAdminGridModal, setShowMainAdminGridModal] = useState(false);
    const [showMainEditModal, setShowMainEditModal] = useState(true);

    // New Button Container
    const [showUploadContainer, setShowUploadContainer] = useState(false);
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
    const isInteractingRef = useRef(false);

    // Update Test Order Modal 
    const [isTestOrderModalOpen, setIsTestOrderModalOpen] = useState(false);

    // Examinee List Modal
    const [showExamineeListModal, setExamineeListModal] =  useState(false);

    useEffect(() => {
      // Define the function to fetch the file list
      const fetchFilesPeriodically = () => {
        // If the user is interacting with the dropdown, skip the update
        if (isInteractingRef.current) return;
    
        fetch('http://localhost:8080/api/get-file-names')
            .then((response) => response.json())
            .then((data) => {
                // Directly update the state with fetched data
                setTests(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };    
      
      // Call the function immediately to fetch the file list
      fetchFilesPeriodically();
    
      // Set up an interval to fetch the file list every 10 seconds (or any desired duration)
      const intervalId = setInterval(fetchFilesPeriodically, 10000);
    
      // Clear the interval when the component is unmounted
      return () => {
          clearInterval(intervalId);
      };
  }, []);

    const handleExamineeListNavigationClick = () => {
      setActiveItem('ExamineeList');
      setShowMainAdminGridModal(false); 
      setShowMainEditModal(false);
      setShowUploadContainer(false);
      setShowEditContainer(false);
      setIsTestOrderModalOpen(false);
      setExamineeListModal(true);
    }

    const handleResultsNavigationClick = () => {
      setActiveItem('Results'); 
      setShowMainEditModal(false); 
      setShowMainAdminGridModal(false);
      setShowUploadContainer(false);
      setShowEditContainer(false);
      setIsTestOrderModalOpen(false);
    }

    const handleManageNavigationClick = () => {
      setActiveItem('Manage'); 
      setShowMainEditModal(true); 
      setShowMainAdminGridModal(true); 
      setShowEditContainer(false); 
      setShowUploadContainer(false); 
      setIsTestOrderModalOpen(false); 
      fetchFileList();
    }

    const handlePullReportsNavigationClick = () => {
      setActiveItem('PullReports'); 
      setShowMainEditModal(false); 
      setShowMainAdminGridModal(false);
      setShowUploadContainer(false);
      setShowEditContainer(false);
      setIsTestOrderModalOpen(false);
    }

    const handleSettingsNavigationClick = () => {
      setActiveItem('Settings'); 
      setShowMainEditModal(false); 
      setShowMainAdminGridModal(false);
      setShowUploadContainer(false);
      setShowEditContainer(false);
      setIsTestOrderModalOpen(false);
    }
    
    const handleLogoutClick = () => {
        console.log("Logout was clicked!");
        localStorage.setItem('adminLoggedOut', 'true'); // Set a specific flag for admin logout
        window.location.reload();

    };

    const handleUploadClick = (event) => {
        event.preventDefault();
        // Logic for handling "New" click
        setShowUploadContainer(true);
        setShowEditContainer(false);
        setIsTestOrderModalOpen(false);
        setShowMainAdminGridModal(false);
        fetch('http://localhost:8080/api/get-file-names')
        .then((response) => response.json())
        .then((data) => {
          setTests(data);
          console.log(tests);
          setFileNames(data);
          console.log(fileNames);
          setShowUploadContainer(true);
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors that occurred during the request
        });
      };

    const handleEditClick = (event) => {
        event.preventDefault();
        // Logic for handling "Edit" click
        setShowEditContainer(true);
        setIsTestOrderModalOpen(false);
        setShowUploadContainer(false);
        setShowMainAdminGridModal(false);
        fetchFileList();
        
      }

    const handleUpdateClick = (event) => {
      event.preventDefault();
      setIsTestOrderModalOpen(true);
      setShowEditContainer(false);
      setShowUploadContainer(false);
      setShowMainAdminGridModal(false);
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
    
    const handleRandomizeClick = (event) => {
        const newRandomizeValue = !isRandomizeEnabled; // Toggle the value
        setIsRandomizeEnabled(newRandomizeValue);
        
        // Store the new value in sessionStorage
        sessionStorage.setItem('isRandomizedEnabled', newRandomizeValue.toString());
        
        // Call handleEditClick to perform additional actions
        handleEditClick(event);
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
                setShowUploadContainer(false); // Hide the new container temporarily
                setSelectedFileName(''); // Reset the selected file name
                setShowUploadContainer(true); // Show the new container again to trigger the useEffect
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
        if (showUploadContainer) {
            fetchFileList();
        }
        }, [showUploadContainer]);

    useEffect(() => {
        if (showEditContainer) {
            fetchFileList();
        }
        }, [showEditContainer]);
        
    useEffect(() => {
      if (isExamEnabled) {
          localStorage.setItem('testStarted', 'true');
      } else {
          localStorage.setItem('testStarted', 'false');
      }
  }, [isExamEnabled]);

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

    useEffect(() => {
      isInteractingRef.current = showEditTestPoolContainer;
  }, [showEditTestPoolContainer]);

    const AdminControlPanel = () => {
        // Check specifically for admin logout
        if (localStorage.getItem('adminLoggedOut') === "true") {
            return <Redirect to="/" />
        }
        const renderUploadContainer = () => {
            if (showUploadContainer) {
              return (
                <div className="upload-container">
                  <h1 className = "upload-h1">Want to add new files to the test pool?</h1>
                  <div className = "Spacer_section">
                    <h3 className = "upload-spacer-title">Current List</h3>
                    <ul className="upload-menu-list">
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
                <div className="main-edit-test-pool-container">
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
                </div>
              );
            }
            return null;
          };
        
          const renderEditTestPoolContainer = () => {
      
            if (showEditTestPoolContainer) {
              return (
                <div className="edit-test-pool-container" onClick={() => setShowEditTestPoolContainer(false)}>
                  <div className="edit-test-pool-content" onClick={(e) => e.stopPropagation()}>
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
                                        tests.filter(test => test.name && test.name.toLowerCase() !== 'desktop.ini').map((test) => (
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
                                  onFocus={() => isInteractingRef.current = true}
                                  onBlur={() => isInteractingRef.current = false}
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

          const renderPullExamineeList = () => {
            
          if(showExamineeListModal){
            return(
              <div className="examinee-panel-wrapper">
                <div className="examinee-main-container">
                  <div className="examinee-inner-container">

                  </div>
                </div>
              </div>
            );
          }}

          return (
            <div className="admin-control-panel-wrapper">
                <nav className="sidebar-navigation">
                <div className="menu-items">
                        <ul>
                            <li className={activeItem === 'ExamineeList' ? 'active' : ''} onClick={() => {handleExamineeListNavigationClick();}}>
                                <i className="fa fa-share-alt"></i>
                                <span className="tooltip">Examinee List</span>
                            </li>
                            <li className={activeItem === 'Results' ? 'active' : ''} onClick={() => {handleResultsNavigationClick();}}>
                                <i className="fa fa-hdd-o"></i>
                                <span className="tooltip">Results</span>
                            </li>
                            <li className={activeItem === 'Manage' ? 'active' : ''} onClick={() => {handleManageNavigationClick();}}>
                                <i className="fa fa-newspaper-o"></i>
                                <span className="tooltip">Manage Exams</span>
                            </li>
                            <li className={activeItem === 'PullReports' ? 'active' : ''} onClick={() => {handlePullReportsNavigationClick();}}>
                                <i className="fa fa-print"></i>
                                <span className="tooltip">Pull Reports</span>
                            </li>
                            <li className={activeItem === 'Settings' ? 'active' : ''} onClick={() => {handleSettingsNavigationClick();}}>
                                <i className="fa fa-sliders"></i>
                                <span className="tooltip">Settings</span>
                            </li>
                        </ul>
                    </div>
                    <li className="logout-item" onClick={handleLogoutClick}>
                        <i className="fa fa-sign-out"></i>
                    <span className="tooltip">Logout</span>
                </li>
                </nav>
                <div className="modal-area">
                    {showMainModal && (
                        <div className="top-admin-ribbon">
                            {showExamineeListModal &&(
                              <div className="examinee-panel-title">
                                Examinee List Portal
                              </div>
                            )}
                            <div className="top-admin-ribbon-title">
                                Admin Interface
                            </div>
                            {showMainEditModal && (
                                <div className="main-editing-modal">
                                    <nav> 
                                        <ul>  
                                            <li><a href="0" onClick={handleUploadClick}>Upload</a></li>
                                            <li><a href="0" onClick={handleEditClick}>Edit</a></li>
                                            <li><a href="0" onClick={handleUpdateClick}>Update</a></li>
                                        </ul> 
                                    </nav> 
                                </div>
                            )}
                        </div>
                    )}
                    {isTestOrderModalOpen && 
                      <AdminPage
                        closeTestOrderModal={() => setIsTestOrderModalOpen(false)}
                      />
                    }
                    {showMainModal && showMainAdminGridModal &&(
                        <div className="main-modal-main-elements">
                            <div className="admin-grid">
                                <div className="files-list">
                                    <h3>Files in Directory:</h3>
                                    <ul>
                                      {fileNames
                                        .filter((fileName) => fileName.toLowerCase() !== 'desktop.ini')
                                        .map((filteredFileName, index) => (
                                          <li key={index}>{filteredFileName}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="test-submissions">
                                    <h3>Test Submissions:</h3>
                                    <p>
                                        {localStorage.getItem('examStarted') === 'true' ? localStorage.getItem('amountOfExaminees') : 'Exam Not Started'}
                                    </p>
                                </div>
                                <div className="start-exam" onClick={() => setIsExamEnabled(!isExamEnabled)}>
                                    <h3>Start Exam</h3>
                                    <p>Press here to begin the Exam for examinees.</p>
                                    <p2>{isExamEnabled ? 'Enabled' : 'Disabled'}</p2>
                                </div>
                            </div>
                        </div>
                    )}
                    {renderUploadContainer()} 
                    {renderEditContainer()}
                    {renderEditTestPoolContainer()}
                    {renderPullExamineeList()}
                </div>
            </div>
        );
    }

    return (
      <div className="AdminInstance">
        {AdminControlPanel()}
          <TestPageContext.Provider value={{ isRandomizeEnabled, setIsRandomizeEnabled }}>
              {/* You can have other components here that use the context */}
          </TestPageContext.Provider>
      </div>
    );
}
    
export default AdminInstance;