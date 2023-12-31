import React, { useEffect, useState } from 'react';
import './Admin.css'; // Import the CSS file
import { useHistory } from 'react-router-dom';
import badPersonImage from "./bad_person.png";
import '@progress/kendo-theme-default/dist/all.css';
import { DropDownList } from '@progress/kendo-react-dropdowns';


function AdminPage() {
  const history = useHistory();
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [numOfTests, setNumOfTests] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [viewOrderMenu, setViewOrderMenu] = useState(false);
  const [saveConfirmation, setSaveConfirmation] = useState(false);
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  useEffect(() => {
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
  }, [history,]);

  useEffect(() => {
    const updatedSelectedTests = selectedTests.slice(0, numOfTests);
    setSelectedTests(updatedSelectedTests);
  }, [numOfTests]);

  const handleTestSelection = (event, index) => {
    const updatedSelectedTests = [...selectedTests];
    updatedSelectedTests[index] = event.target.value;
    setSelectedTests(updatedSelectedTests);
  };

  const handleSaveOrder = (event) => {
    event.preventDefault();
    console.log('Selected tests:', selectedTests);
  
    // Delete all test orders
    fetch('http://localhost:8080/api/test-order', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('All test orders deleted successfully');
          // Proceed with saving the new test orders
          const newArrayList = selectedTests.map((selectedTest, index) => ({
            testOrderNumber: index + 1,
            textFileName: selectedTest,
          }));
  
          console.log('New ArrayList:', newArrayList);
  
          newArrayList.forEach((item) => {
            const { testOrderNumber, textFileName } = item;
            const payload = {
              testOrderNumber,
              textFileName,
            };
  
            console.log('Save order payload:', payload);
  
            fetch('http://localhost:8080/api/test-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Save order response:', data);
                // Handle the response for each individual item here
              })
              .catch((error) => console.error('Error:', error));
          });
        } else {
          console.error('Failed to delete test orders');
        }
      })
      .catch((error) => console.error('Error:', error));
  };
    
  const handleUpdateNumOfTests = (event) => {
    const value = parseInt(event.target.value);
    setNumOfTests(value);
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

  const handleViewOrder = () => {
    setViewOrderMenu(true);
    setSaveConfirmation(false);
  };

  const handleEditOrder = () => {
    setViewOrderMenu(false);
  };

  const handleReturnToHub = () => {
    history.push('/');
    window.location.reload();
    localStorage.setItem('isAdmin', 'false');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUnauthorized(true);
    }, 2250);

    return () => clearTimeout(timer);
  }, []);
  /*
  if (!isAdmin) {
    if (!showUnauthorized) {
      return null;
    } 

    return (
      <div className="back-ground">
        <div className="unauthorized-wrapper">
          <div className="unauthorized-container">
            <h1>Unauthorized Access</h1>
            <img src={badPersonImage} alt="Unauthorized-Access" className="unauthorized-access" />
            <p>You are not authorized to access this page.</p>
            <button className="uh-oh-wrong-place" onClick={handleReturnToHub}>Go Back</button>
          </div>
        </div>
      </div>
    );
  }
  */

  if (viewOrderMenu) {
    return (
      <div className="view-order-container">
        <h1 className="view-order-title">View Order Menu</h1>
        <div className="view-order-inner-container">
        <h3 className="view-order-list-title">Current List Order:</h3>
        <ul>
          {selectedTests.map((test, index) => (
            <li key={index}>{test}</li>
          ))}
        </ul>
        </div>
        <button className="btn btn-primary mb-3" onClick={handleEditOrder}>
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="test-list-container">
      <h1 className="mb-4">Update Test List</h1>
      <h2 className="mb-5">Update the list of available tests in test pool.</h2>
      <div className="test-list-container-inner">
          <h1 className="test-list-title">Current List:</h1>
          <label htmlFor="test-dropdown" className="form-label">
            Select Test:
          </label>
          <div className="test-list-choice-container">
            <form onSubmit={handleSaveOrder}>
              <div className="mb-3">
                {selectedTests.map((selectedTest, index) => (
                  <select
                    key={index}
                    className="form-select" // Apply the form-select class here
                    onChange={(event) => handleTestSelection(event, index)}
                    value={selectedTest}
                  >
                    <option value="">-- Select a test --</option>
                    {tests.length > 0 &&
                      tests.filter(test => test.name && test.name.toLowerCase() !== 'desktop.ini').map((test) => (
                        <option key={test.id} value={test.id}>
                          {test.name}
                        </option>
                      ))}
                  </select>
                ))}
              </div>
            </form>
          </div>
        <div className="test-list-manager">
          <form onSubmit={handleSaveOrder}>
            <div className="mb-3">
              <label htmlFor="num-of-tests" className="form-label">
                Number of Tests in Test Pool:
              </label>
              <input
                type="number"
                id="num-of-tests"
                name="num-of-tests"
                className="form-control"
                value={numOfTests}
                onChange={handleUpdateNumOfTests}
              />
              <button type="button" className="btn btn-primary" onClick={handleUpdateTests}>
                Update
              </button>
            </div>
            <div className="btn-group">
              <button className="btn btn-primary" type="submit">
                Save List
              </button>
              <button className="btn btn-primary" onClick={handleViewOrder}>
                View List
              </button>
            </div>
          </form>
        </div>
        {!viewOrderMenu && saveConfirmation && (
          <div className="save-confirmation">Successfully Saved!</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
  
}

export default AdminPage;

