import React, { useEffect, useState } from 'react';
import './Test.css'; // Import the CSS file

function TestPage() {
  const [sortedTestOrders, setSortedTestOrders] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentTestFile, setCurrentTestFile] = useState(null);

  useEffect(() => {
    // Fetch the test orders
    fetch('http://localhost:8080/api/get-test-order')
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is an array before sorting
        const testOrdersArray = Array.isArray(data) ? data : [];

        // Sort the entries by test_order_number
        const sortedOrders = testOrdersArray.sort((a, b) => a.test_order_number - b.test_order_number);

        // Set the sorted test orders
        setSortedTestOrders(sortedOrders);
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
        // Display an error message or perform appropriate error handling
      });
  }, []);

  useEffect(() => {
    console.log('sortedTestOrders:', sortedTestOrders);
    if (sortedTestOrders.length > 0) {
      // Get the current test order
      const currentTestOrder = sortedTestOrders[currentTestIndex];

      // Fetch the test file based on the text_file_name
      fetch(`http://localhost:8080/api/get-test-file?fileName=${currentTestOrder.text_file_name}`)
        .then((response) => response.text())
        .then((text) => {
          // Set the current test file
          setCurrentTestFile(text);
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors that occurred during the request
          // Display an error message or perform appropriate error handling
        });
    }
  }, [sortedTestOrders, currentTestIndex]);

  const handleNextButtonClick = () => {
    // Check if there are more test files to display
    if (currentTestIndex < sortedTestOrders.length - 1) {
      // Increment the current test index
      setCurrentTestIndex((prevIndex) => prevIndex + 1);
    } else {
      // Handle case when all test files have been displayed
      console.log('All test files have been displayed.');
    }
  };

  console.log('currentTestFile:', currentTestFile);

  return (
    <div>
      <h1 className="TestWebpageTitle">Tests</h1>
      {currentTestFile && (
        <div>
          <pre>{currentTestFile}</pre>
          <button onClick={handleNextButtonClick}>Next</button>
        </div>
      )}
    </div>
  );
}

export default TestPage;
