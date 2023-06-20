// AdminPage.js
import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');

  useEffect(() => {
    // Fetch the tests from the server and update the 'tests' state
    fetch('http://localhost:8080/tests')
      .then(response => response.json())
      .then(data => setTests(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleTestSelection = (event) => {
    setSelectedTest(event.target.value);
  };

  const handleSaveOrder = (event) => {
    event.preventDefault();
    // Logic for saving the test order
    console.log('Selected test:', selectedTest);
    // Make a POST request to your backend API to save the test order
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSaveOrder}>
        <label htmlFor="test-dropdown">Select Test:</label>
        <select id="test-dropdown" name="test-dropdown" onChange={handleTestSelection}>
          <option value="">-- Select a test --</option>
          {tests.map(test => (
            <option key={test.id} value={test.id}>{test.name}</option>
          ))}
        </select>
        <button type="submit">Save Order</button>
      </form>
    </div>
  );
}

export default AdminPage;
