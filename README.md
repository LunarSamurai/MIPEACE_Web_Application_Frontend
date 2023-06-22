# MIPEACE (Multi Instance Psychological Evaluation, Administration, Collection, and Extraction) tool/platform/web application
 ## Designed by Joseph Craig for the US Army Psychologocial Research Institute

 
 # Grabbing this to work on it yourself
 
 - Remember this was created by Joseph Craig for the US Army Psychological Research Institute
 
 - You do not own this product, the users of the contributors do. 
 
 ## If you want to download a copy and work on the project on your own machine you must complete the following steps:
 
  - Pre-requisite being that it is assumed you have visual studio code the most recent.
    - Having javascript and any other dependencies for coding for the code-base aswell. 
  - First you must clone this repo into your own folder
  - Delete the /package.json and the /package-lock.json [It will auto create later when you install npm]
  - Based on your HDD or SSD of choice, install nodist into that drive via the /Program Files
  - After this https://nodejs.org/en/download <-- Follow that link to install nodejs (can install anywhere)
  - Then you must open administrator powershell and locate the directory that you had clone the repo into, and inside this folder
  - Run ```npm install -g@latest```
  - After which please run the command ```npm install react-router-dom@5.2.0```
  - Test by running the command ```npm start```
  - You should be able to edit this code! 
 
 ## Understanding the Hiearchy
 
   ### Database
    - You must create a table called (user) and database schema called (mipeace_db)
    - The table must have the fields (id = pk) (cacid, first_name, middle_name, last_name)
    - There is also another table but we will get to that later (please update me)
    - You must have created in your database the same name and table to have the same name
    - You must also create a user (labuser) and the password as (123!@#ARIira18())
    - These are hard coded into the application.properties file, if you choose to change your schema requirments:
     - Please change the user and password in the applications.properties file within the backend application.
      
   ### Backend Application
    - This application which is cloned from https://github.com/LunarSamurai/MIPEACE_Web_Application_Backend.git
     - Is the application that connects to the database and does logic based on that connection
    - You have files such as repositories that store objects within this file to be used later
    - This backend is programmed in Java via the Spring Boot Java Framework
    - The backend was coded with an object-oriented, polymorphic, and abstract codebase ideology
    - You have a User and Test class that will store information about the user and the tests to be stored into the database
    - You have their controller classes as well.
    - The controller class that handles the connection for the Frontend to store the user information into the databse will be the RegistrationController.java
    - The controller class that handles reading the files within the src/resources/QuestionFiles directory is handled within the TestController class
    - You also have service classes that push saves to the repositories so that they can update the database
    - The driver is the MipeaceBackendSpringBootApplication.java class
    - All other classes are irrelevant at this point (Updated 06/22/2023
    - Port used is Localhost:8080
 
  ### Frontend Application
   - This application which is cloned from https://github.com/LunarSamurai/MIPEACE_Web_Application_Frontend.git
    - Is the application that is responsible for displaying the web server and web application on either the localhost:3000 or a public address (insert here)
    - You have typical web application files such as the main (first webpage)'s logic and creation within the App.js and modified using the App.css
    - You also have the public facing Admin.html and Test.html (Updated 06/22/2023)
    - Those files' logic are controlled using the AdminWebpage.js. TestWebpage.js
    - With their styling being controlled by and modified with Admin.css, Test.css
    - This application connects to the backend to send back user information and testing information which the logic for both will be found within the .js and .html files
 
  ### Topography
    Database (mipeace_db) <-||-> MIPEACE_Backend <-||-> MIPEACE_Frontend
    
 # Support
 
  - If you need to contact me in regards to this project please reach out to josephcraig.business@gmail.com
    - Thankyou for continuing development of this project. I hope I was able to provide enough documentation to get you going!
 
 
 
 # Below are all of the information pertaining to the basis of React JS
 
 # Getting Started with Create React App
 
 This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
 
 ## Available Scripts
 
 In the project directory, you can run:
 
 ### `npm start`
 
 Runs the app in the development mode.\
 Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
 
 The page will reload when you make changes.\
 You may also see any lint errors in the console.
 
 ### `npm test`
 
 Launches the test runner in the interactive watch mode.\
 See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
 
 ### `npm run build`
 
 Builds the app for production to the `build` folder.\
 It correctly bundles React in production mode and optimizes the build for the best performance.
 
 The build is minified and the filenames include the hashes.\
 Your app is ready to be deployed!
 
 See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
 
 ### `npm run eject`
 
 **Note: this is a one-way operation. Once you `eject`, you can't go back!**
 
 If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
 
 Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
 
 You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
 
 ## Learn More
 
 You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
 
 To learn React, check out the [React documentation](https://reactjs.org/).
 
 ### Code Splitting
 
 This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
 
 ### Analyzing the Bundle Size
 
 This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
 
 ### Making a Progressive Web App
 
 This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
 
 ### Advanced Configuration
 
 This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
 
 ### Deployment
 
 This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
 
 ### `npm run build` fails to minify
 
 This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
