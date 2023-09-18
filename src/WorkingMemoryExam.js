import React, { useState, useEffect } from 'react';
import './WorkingMemoryExam.css';

function WMModal() {
    const [currentNumber, setCurrentNumber] = useState(0);
    const [isShowingMathProblem, setIsShowingMathProblem] = useState(false);
    const [failCount, setFailCount] = useState(0);
    const [score, setScore] = useState(10); 
    const [iterationCount, setIterationCount] = useState(1);
    const [numbersToShow, setNumbersToShow] = useState([]);
    const [userResponses, setUserResponses] = useState([]);
    const [examCompleteMessage, setExamCompleteMessage] = useState('');
    const [redNumbers, setRedNumbers] = useState([]);
    const [isShowingRedNumber, setIsShowingRedNumber] = useState(false);
    const [isExamComplete, setIsExamComplete] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const mathProblems = [
        [{"problem": "2 + 3 = None", "answer": false}],
        [{"problem": "4 + 5 = 8", "answer": false}, {"problem": "6 + 7 = 13", "answer": true}],
        [{"problem": "1 + 8 = 9", "answer": true}, {"problem": "3 + 6 = 9", "answer": true}, {"problem": "2 + 4 = 6", "answer": true}],
        [{"problem": "2 + 9 = 1", "answer": false}, {"problem": "3 + 5 = 4", "answer": false}, {"problem": "7 + 8 = 15", "answer": true}, {"problem": "1 + 3 = 4", "answer": true}],
        [{"problem": "4 + 8 = 12", "answer": true}, {"problem": "5 + 9 = 14", "answer": true}, {"problem": "2 + 7 = 9", "answer": true}, {"problem": "3 + 4 = 7", "answer": true}, {"problem": "6 + 9 = 15", "answer": true}],
        [{"problem": "5 + 5 = 8", "answer": false}, {"problem": "8 + 8 = 16", "answer": true}, {"problem": "1 + 7 = 4", "answer": false}, {"problem": "2 + 6 = 3", "answer": false}, {"problem": "3 + 9 = 12", "answer": true}, {"problem": "4 + 10 = 14", "answer": true}],
        [{"problem": "9 + 9 = 18", "answer": true}, {"problem": "6 + 6 = 12", "answer": true}, {"problem": "1 + 5 = 6", "answer": true}, {"problem": "2 + 8 = 10", "answer": true}, {"problem": "3 + 7 = 1", "answer": false}, {"problem": "4 + 9 = 13", "answer": true}, {"problem": "5 + 10 = 15", "answer": true}],
        [{"problem": "10 + 10 = 50", "answer": false}, {"problem": "5 + 6 = 11", "answer": true}, {"problem": "2 + 9 = 1", "answer": false}, {"problem": "3 + 8 = 11", "answer": true}, {"problem": "4 + 7 = 11", "answer": true}, {"problem": "1 + 10 = 11", "answer": true}, {"problem": "6 + 9 = 15", "answer": true}, {"problem": "7 + 8 = 15", "answer": true}],
        [{"problem": "1 + 6 = 8", "answer": false}, {"problem": "2 + 5 = 7", "answer": true}, {"problem": "3 + 10 = 1", "answer": false}, {"problem": "4 + 8 = 1", "answer": false}, {"problem": "5 + 7 = 1", "answer": false}, {"problem": "6 + 8 = 1", "answer": false}, {"problem": "7 + 9 = 1", "answer": false}, {"problem": "8 + 10 = 18", "answer": true}, {"problem": "9 + 10 = 1", "answer": false}],
        [{"problem": "1 + 1 = 2", "answer": true}, {"problem": "2 + 2 = 4", "answer": true}, {"problem": "3 + 3 = 6", "answer": true}, {"problem": "4 + 4 = 8", "answer": true}, {"problem": "5 + 5 = 10", "answer": true}, {"problem": "6 + 6 = 12", "answer": true}, {"problem": "7 + 7 = 14", "answer": true}, {"problem": "8 + 8 = 1", "answer": false}, {"problem": "9 + 9 = 18", "answer": true}, {"problem": "10 + 10 = 2", "answer": false}]
    ];
    
    

    const startNewIteration = () => {
        const newRedNumber = Math.floor(Math.random() * 10) + 1; 
        setRedNumbers((prevNumbers) => [...prevNumbers, newRedNumber]);
        setIsShowingRedNumber(true);
    
        setTimeout(() => {
            setIsShowingRedNumber(false);
            setIsShowingMathProblem(true);
    
            setTimeout(() => {
                setIsShowingMathProblem(false);
                if (iterationCount === redNumbers.length) {
                    promptUserForNumbers();
                } else {
                    startNewIteration();  // Start next sequence
                }
            }, 7000); // 7 seconds for math problem
        }, 1000); // 1 second for red number
    };    

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        const isCorrect = mathProblems[iterationCount - 1].every(
            (problemObj, idx) => {
                return answer ? problemObj.answer === eval(problemObj.problem) : problemObj.answer !== eval(problemObj.problem);
            }
        );

        if (!isCorrect) {
            setFailCount(prev => prev + 1);
            if (failCount >= 2) {
                setExamCompleteMessage("Exam finished due to 2 wrong answers.");
                setIsExamComplete(true);
                return;
            }
        }

        // Continue to the next step
        if (iterationCount === redNumbers.length) {
            promptUserForNumbers();
        } else {
            startNewIteration();  // Start next sequence
        }
    };


    const promptUserForNumbers = () => {
        const userInput = prompt(`Please enter the ${iterationCount} number(s) you remember, separated by commas:`);
        const userNumbers = userInput.split(',').map(num => parseInt(num.trim()));
        
        let correctCount = 0;
        for (let i = 0; i < iterationCount; i++) {
            if (redNumbers[i] === userNumbers[i]) {
                correctCount++;
            }
        }
        
        const score = (correctCount / iterationCount) * 100;
        setUserResponses(prev => [...prev, userNumbers]);
    
        if (score < 66) {
            setExamCompleteMessage("Exam finished due to low score.");
            setIsExamComplete(true);
            return;
        }
        
        if (iterationCount >= 10) {
            setExamCompleteMessage("Exam finished after 10 iterations.");
            setIsExamComplete(true);
            return;
        }
    
        // If exam is not complete, then start a new iteration
        setIterationCount(prevCount => prevCount + 1);
        startNewIteration();
    };
    

    useEffect(() => {
        if (iterationCount <= 10 && !examCompleteMessage) {
            startNewIteration();
        } else if (iterationCount > 10) {
            setExamCompleteMessage('You completed all iterations. Exam is over.');
        }
    }, [iterationCount]);

    return (
        <div className="wm-modal-container">
            {isShowingRedNumber && <div style={{color: 'red'}}>{redNumbers[redNumbers.length - 1]}</div>}
            {isShowingMathProblem && (
                <>
                    {mathProblems[iterationCount - 1].map((problemObj, idx) => (
                        <div key={idx}>{problemObj.problem} = ?</div>
                    ))}
                    <div className="true-false-button-section">
                    <button onClick={() => handleAnswerSelection(true)}>True</button>
                    <button onClick={() => handleAnswerSelection(false)}>False</button>
                    </div>
                </>
            )}
            {examCompleteMessage && <div>{examCompleteMessage}</div>}
        </div>
    );
}

export default WMModal;
