import React, { useEffect, useState } from 'react';
import './Admin.css'; // Import the CSS file
import { useHistory } from 'react-router-dom';


function AdminPage({ isAdmin, hasBeenToAdminWebpage, setHasBeenToAdminWebpage }) {
  const history = useHistory();
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [numOfTests, setNumOfTests] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [viewOrderMenu, setViewOrderMenu] = useState(false);
  const [saveConfirmation, setSaveConfirmation] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
    if (!isAdmin) {
      history.push('/'); // Redirect to home page if user is not an admin
    }
  
    // Fetch the tests from the server and update the 'tests' state
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
  }, []);
  

  const handleTestSelection = (event, index) => {
    const updatedSelectedTests = [...selectedTests];
    updatedSelectedTests[index] = event.target.value;
    setSelectedTests(updatedSelectedTests);
  };

  const handleSaveOrder = (event) => {
    event.preventDefault();
    // Logic for saving the test order
    console.log('Selected tests:', selectedTests);
    // Make a POST request to your backend API to save the test order
    setSaveConfirmation(true);
  };

  const handleUpdateNumOfTests = (event) => {
    const value = parseInt(event.target.value);
    setNumOfTests(value);
  };

  useEffect(() => {
    const updatedSelectedTests = selectedTests.slice(0, numOfTests);
    setSelectedTests(updatedSelectedTests);
  }, [numOfTests]);

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
    setHasBeenToAdminWebpage(false);
    isAdmin = false;
    history.push('/');
    window.location.reload();
  };

  if (viewOrderMenu) {
    return (
      <div className="container">
        <h1 className="mb-4">View Order Menu</h1>
        <h3>Current List Order:</h3>
        <ul>
          {selectedTests.map((test, index) => (
            <li key={index}>{test}</li>
          ))}
        </ul>
        <button className="btn btn-primary mb-3" onClick={handleEditOrder}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleReturnToHub}>
          &times;
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mb-4">Admin Page</h1>
      <h2 className="mb-5">Update Test Order</h2>
      <form onSubmit={handleSaveOrder}>
        <div className="mb-3">
          <label htmlFor="test-dropdown" className="form-label">
            Select Test:
          </label>
          {selectedTests.map((selectedTest, index) => (
            <select
              key={index}
              className="form-select"
              onChange={(event) => handleTestSelection(event, index)}
              value={selectedTest}
            >
              <option value="">-- Select a test --</option>
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
          <button type="button" className="btn btn-primary" onClick={handleUpdateTests}>
            Update
          </button>
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleSaveOrder}>
            Save Order
          </button>
          <button className="btn btn-primary" onClick={handleViewOrder}>
            View Order
          </button>
        </div>
      </form>
      <button className="btn btn-danger" onClick={handleReturnToHub}>
        &times;
      </button>
      {!viewOrderMenu && saveConfirmation && (
        <div className="save-confirmation">Successfully Saved!</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default AdminPage;
