// TestPage.js
import React, { useEffect, useState } from 'react';

function TestPage() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Fetch the tests from the server and update the 'tests' state
    fetch('http://localhost:8080/tests')
      .then(response => response.json())
      .then(data => setTests(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Tests</h1>
      <ul>
        {tests.map(test => (
          <li key={test.id}>{test.question}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestPage;
