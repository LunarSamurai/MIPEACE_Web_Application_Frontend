import React, { useEffect, useState } from 'react';
import './Test.css'; // Import the CSS file

function TestPage() {
  const [sortedTestOrders, setSortedTestOrders] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentTestLines, setCurrentTestLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lastLinesList, setLastLinesList] = useState([]);


  useEffect(() => {
    // Fetch the test orders
    fetch('http://localhost:8080/api/get-test-order')
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is an array before sorting
        const testOrdersArray = Array.isArray(data) ? data : [];

        // Sort the entries by test_order_number
        const sortedOrders = testOrdersArray.sort((a, b) => a.testOrderNumber - b.testOrderNumber);
        console.log(sortedOrders);
        // Set the sorted test orders
        setSortedTestOrders(sortedOrders);

        // Fetch and display the first test file initially
        if (sortedOrders.length > 0) {
          fetchTestFile(sortedOrders[0].textFileName);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
        // Display an error message or perform appropriate error handling
      });
  }, []);

  const fetchTestFile = (textFileName) => {
    fetch(`http://localhost:8080/api/get-test-file?fileName=${textFileName}`)
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split('\n');
        const lastLine = lines.pop();
        setCurrentTestLines(lines);
        setCurrentLineIndex(0);
        if (lastLine) {
          setLastLinesList((prevList) => [...prevList, { fileName: textFileName, lastLine }]);
          console.log(lastLinesList);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
        // Display an error message or perform appropriate error handling
      });
  };

  //Buttons For Each Question
  const handleStronglyAgreeClick = () => {

  }
  const handleAgreeClick = () => {
    
  }
  const handleNeitherClick = () => {
    
  }
  const handleDisagreeClick = () => {
    
  }
  const handleStronglyDisagreeClick = () => {
    
  }
  const handleNextButtonClick = () => {
    // Check if there are more lines in the current file
    if (currentLineIndex < currentTestLines.length - 1) {
      // Increment the current line index
      const nextLineIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextLineIndex);
    } else {
      // Check if there are more test files to display
      if (currentTestIndex < sortedTestOrders.length - 1) {
        // Increment the current test index
        const nextIndex = currentTestIndex + 1;
        setCurrentTestIndex(nextIndex);

        // Fetch and display the next test file
        const nextTestOrder = sortedTestOrders[nextIndex];
        fetchTestFile(nextTestOrder.textFileName);
      } else {
        // Handle case when all test files have been displayed
        console.log('All test files have been displayed.');
      }
    }
  };

  return (
    <div>
      {currentTestLines.length > 0 && (
        <div className="TestQuestionContainer">
          <p className="DisplayText">{currentTestLines[currentLineIndex].split(/[|]/)[0]}</p>
          <div className="spacer">
          </div>
          <div className="choice-container">
            <button className="button-strongly-agree" onClick={handleStronglyAgreeClick}>Strongly Agree</button>
            <button className="button-agree" onClick={handleAgreeClick}>Agree</button>
            <button className="button-neither" onClick={handleNeitherClick}>Neither</button>
            <button className="button-disagree" onClick={handleDisagreeClick}>Disagree</button>
            <button className="button-strongly-disagree" onClick={handleStronglyDisagreeClick}>Strongly Disagree</button>
          </div>
          <button className="button-next" onClick={handleNextButtonClick}>Next</button>
        </div>
      )}
    </div>
  );
  
}

export default TestPage;
