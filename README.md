# Task tracker application

Fullstack:
    Backend:
        - Spring Boot and Java
        - H2 for databse
    Frontend:
        - HTML
        - CSS
        - React and Vite to run the server
        - Typescript

## Prerequisites
    - Java 17+
    - Maven, for spring boot
    - Node.js and npm to run frontend server 

## Project Structure:
    - All frontend code in frontend folder
    - src --|--- main
            |--- tests
    - main Java code in main
    - tests in tests!

## To run:
    - To run the frontend server go to frontend server
        - cd min minJusticeAPI/frontend
        - run command npm run dev
    - To run the backend server go to where mvnw is lcoated
        - cd minJusticeAPI
        - Then run commant to start the backend server ./mvnw spring-boot:run
    - Then go to local host http://localhost:5173 and click the green button to get started

## Tests
    - Tests are writted in JUnit, and can be run via ./mvnw test when in the minJusticeAPI directory. 
    - There are 7 unit tests written for the behaviours:
        - Getting a task by ID
        - Getting all tasks
        - Updating each field
            - Title
            - Description
            - Due Date
            - Status
        - Deleting a task

## Features
    - You can create/delete and edit tasks, all tasks have a title, description, due data and a boolean variabel completed

## API End Points 
    - 
