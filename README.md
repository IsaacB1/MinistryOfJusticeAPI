# Task Tracker Application

A fullstack web application for managing tasks.

---

### Built With

**Backend:**
- Spring Boot & Java
- H2 in-memory database

**Frontend:**
- HTML & CSS
- React (with Vite)
- TypeScript

---

## Prerequisites

Make sure you have the following installed:

- Java 17+
- Maven (for Spring Boot)
- Node.js and npm (for frontend)

---

## Project Structure

<pre>
minJusticeAPI/ <br>
    ├── frontend/ # All frontend code <br> 
    ├── src/<br>
        ├── main/ # Main Java code<br>
        ├── tests/ # Unit tests
</pre>

---

## Running the Application

### Frontend

```
# Navigate to the frontend folder
cd minJusticeAPI/frontend

# Run the frontend server
npm run dev

# Navigate to the root directory where mvnw is located
cd minJusticeAPI

# Run the Spring Boot backend server
./mvnw spring-boot:run

Once both servers are running, visit:
http://localhost:5173
```

## Tests
Tests are writted in JUnit, and can be run via `./mvnw test` when in the minJusticeAPI directory. 
There are 7 unit tests written for the behaviours:
- Getting a task by ID
- Getting all tasks
- Updating each field
  - Title
  - Description
  - Due Date
  - Status
  - Deleting a task

## Features
- You can:
  - Create tasks
  - Delete tasks
  - Update each field of the task

## API Endpoints
- GET /tasks/all #Gets all tasks.
- GET /tasks/{id} #Gets a task via its id.
- POST /tasks/create #Creates a task, takes a json version of a task.
- DELETE /tasks/delete/{id} #Deletes a task given its id.
- PATCH /tasks/update/title/{id}/{newTitle} #Updates the title of the task given its id and a new title (String)
- PATCH /tasks/update/desc/{id}/{newDesc} #Updates the description of the task given its id and a new description (String)
- PATCH /tasks/update/dueDate/{id}/{newDueDate} #Updates the due date of the task given its id and a new due date (String)
- PATCH /tasks/update/status/{id}/{newStatus} #Updates the status the task given its id and a new status (boolean)
- DELETE /deleteAll #Deletes the entire database

