import React, { useEffect, useState } from 'react';
import './Test.css'; // Import the CSS file
import { useHistory } from 'react-router-dom';
import warningSound from "./wrong-answer-126515.mp3";

function TestPage() {
  const [sortedTestOrders, setSortedTestOrders] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentTestLines, setCurrentTestLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lastLinesList, setLastLinesList] = useState([]);
  const [questionRecords, setQuestionRecords] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [showContinueMessage, setShowContinueMessage] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false); // New state variable
  const history = useHistory();

  const responseIdMap = {
    'Strongly Disagree': 5,
    'Disagree': 4,
    'Neither': 3,
    'Agree': 2,
    'Strongly Agree': 1,
    'Skip': 0,
  };

  useEffect(() => {
    // Fetch the test orders
    fetch('http://localhost:8080/api/get-test-order')
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is an array before sorting
        const testOrdersArray = Array.isArray(data) ? data : [];

        // Sort the entries by test_order_number
        const sortedOrders = testOrdersArray.sort((a, b) => a.testOrderNumber - b.testOrderNumber);

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

    // Add event listener to clear questionRecords on page refresh or close
    window.addEventListener('beforeunload', clearQuestionRecords);
    return () => {
      window.removeEventListener('beforeunload', clearQuestionRecords);
    };
  }, []);

  const clearQuestionRecords = () => {
    // Check if sessionStorage has the 'questionRecords' key
    if (sessionStorage.getItem('questionRecords')) {
      // Do not remove the sessionStorage on refresh
      sessionStorage.removeItem('questionRecords');
    }
  };

  useEffect(() => {
    // Fetch and display the first test file initially
    if (sortedTestOrders.length > 0) {
      fetchTestFile(sortedTestOrders[currentTestIndex].textFileName);
    }
  }, [sortedTestOrders, currentTestIndex]);

  const fetchTestFile = (textFileName) => {
    fetch(`http://localhost:8080/api/get-test-file?fileName=${textFileName}`)
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split('\n');
        const lastLine = lines.pop();
        setCurrentTestLines(lines);
        setCurrentLineIndex(0);

        // Store the question record for the first line
        const firstLine = lines[0];
        const [questionContent, positiveOrNegative] = firstLine.split('/').map((item) => item.trim());
        const record = {
          cacID: sessionStorage.getItem('cacid'),
          textFileName: sortedTestOrders[currentTestIndex].textFileName,
          questionContent,
          positiveOrNegative,
        };
        setQuestionRecords((prevRecords) => [...prevRecords, record]);
        console.log(record);
        console.log(sessionStorage.getItem('questionRecords'));
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
        // Display an error message or perform appropriate error handling
      });
  };

  const handleAnswerButtonClick = (answer) => {
    const line = currentTestLines[currentLineIndex];
    const [questionContent, positiveOrNegative, selectedChoice] = line.split('/').map((item) => item.trim());
    const record = {
      cacID: sessionStorage.getItem('cacid'),
      textFileName: sortedTestOrders[currentTestIndex].textFileName,
      questionContent,
      positiveOrNegative,
      answer,
      selectedChoice, // Save the selected choice in the record
      responseId: responseIdMap[answer], // Add the response ID based on the answer
    };
    setQuestionRecords((prevRecords) => [...prevRecords, record]);
    console.log(record);
    console.log(sessionStorage.getItem('questionRecords'));
    const storedRecords = JSON.parse(sessionStorage.getItem('questionRecords') || '[]');
    const updatedRecords = [...storedRecords, record];
    sessionStorage.setItem('questionRecords', JSON.stringify(updatedRecords));

    if (currentLineIndex < currentTestLines.length - 1) {
      const nextLineIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextLineIndex);
      setButtonsDisabled(false);
    } else {
      if (currentTestIndex < sortedTestOrders.length - 1) {
        const nextIndex = currentTestIndex + 1;
        setCurrentTestIndex(nextIndex);

        const nextTestOrder = sortedTestOrders[nextIndex];
        fetchTestFile(nextTestOrder.textFileName);
        setButtonsDisabled(false);
      } else {
        setAssessmentComplete(true);
        sessionStorage.setItem('assessmentComplete', "Completed");
      }
    }
  };

  const handleNextButtonClick = () => {
    // Check if any choice container button has been selected
    const selectedChoice = currentTestLines[currentLineIndex].split('/').map((item) => item.trim())[2];
    if (!buttonsDisabled && !selectedChoice) {
      const audio = new Audio(warningSound);
      audio.play();
      // Display alert message
      alert('Please select an option before continuing.');
      return; // Exit the function without proceeding further
    }

    if (currentLineIndex < currentTestLines.length - 1) {
      const nextLineIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextLineIndex);
      setButtonsDisabled(false);
    } else {
      if (currentTestIndex < sortedTestOrders.length - 1) {
        const nextIndex = currentTestIndex + 1;
        setCurrentTestIndex(nextIndex);

        const nextTestOrder = sortedTestOrders[nextIndex];
        fetchTestFile(nextTestOrder.textFileName);
        setButtonsDisabled(false);
      } else {
        setAssessmentComplete(true);
      }
    }
  };

  const handleReturnToHome = () => {
    // Get the user responses from sessionStorage
    const questionRecords = JSON.parse(sessionStorage.getItem('questionRecords') || '[]');

    // Create an array of user response objects
    const userResponses = questionRecords.map((record) => {
      return {
        cacID: record.cacID,
        textFileName: record.textFileName,
        questionContent: record.questionContent,
        positiveOrNegative: record.positiveOrNegative,
        answer: record.answer,
        responseId: record.responseId, // Include the response ID in the object
      };
    });

    // Send the user responses to the backend
    fetch('http://localhost:8080/api/save-user-responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userResponses),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Log the response from the backend
        // Perform any further actions or display a success message
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
        // Display an error message or perform appropriate error handling
      });

    // Perform the necessary actions to redirect to App.js or the home page
    // You can use the appropriate routing mechanism or any navigation method
    console.log('Return to Home');
    history.push('/');
    window.location.reload();
  };


  const renderAssessmentComplete = () => {
    return (
      <div className="assessment-complete-container">
        <h1 className="assessment-complete-message">Assessment Complete</h1>
        <p className="please-contact">Please contact your administrator for further assistance.</p>
        <div className="assessment-spacer">
          <p className='.assessment-spacer-message'>
            We at the US Army Research Institute would like to thank you for coming out to our examination and Psychological assessment today. It was quiet the pleasure to have you
            here with us today. You have tremendously helped in our efforts in creating better leaders and better soldiers. We hope to see you again and we hope to hear your feedback!
            Please press "Return to Home" button on the bottom of the screen and logout once you get to the next screen. Many Thanks, US Army Research Institute.
          </p>
        </div>
        <button className="button-return-home" onClick={handleReturnToHome}>Return to Home</button>
      </div>
    );
  }

  return (
    <div>
      {!assessmentComplete && currentTestLines.length > 0 && (
        <div className="TestQuestionContainer">
          <p className="DisplayText">{currentTestLines[currentLineIndex].split(/[|]/)[0]}</p>
          <div className="spacer"></div>
          <div className="choice-container">
            <ul>
              {showContinueMessage && (
                <p className="continue-message">You've already selected, please press the "Next" button.</p>
              )}
              <li>
                <button className="button-strongly-agree" onClick={() => handleAnswerButtonClick('Strongly Agree')} disabled={buttonsDisabled}>
                  <span className="button-strongly-agree-icon"></span>
                  <span className="button-strongly-agree-text">Strongly Agree</span>
                </button>
              </li>
              <li>
                <button className="button-agree" onClick={() => handleAnswerButtonClick('Agree')} disabled={buttonsDisabled}>
                  <span className="button-agree-icon"></span>
                  <span className="button-agree-text">Agree</span>
                </button>
              </li>
              <li>
                <button className="button-neither" onClick={() => handleAnswerButtonClick('Neither')} disabled={buttonsDisabled}>
                  <span className="button-neither-icon"></span>
                  <span className="button-neither-text">Neither</span>
                </button>
              </li>
              <li>
                <button className="button-disagree" onClick={() => handleAnswerButtonClick('Disagree')} disabled={buttonsDisabled}>
                  <span className="button-disagree-icon"></span>
                  <span className="button-disagree-text">Disagree</span>
                </button>
              </li>
              <li>
                <button className="button-strongly-disagree" onClick={() => handleAnswerButtonClick('Strongly Disagree')} disabled={buttonsDisabled}>
                  <span className="button-strongly-disagree-icon"></span>
                  <span className="button-strongly-disagree-text">Strongly Disagree</span>
                </button>
              </li>
              <li>
                <button className="button-skip" onClick={() => handleAnswerButtonClick('Skip')} disabled={buttonsDisabled}>
                <span className="button-strongly-disagree-icon"></span>
                <span className="button-strongly-disagree-text">Skip</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {assessmentComplete && renderAssessmentComplete()}
    </div>
  );
}

export default TestPage;
