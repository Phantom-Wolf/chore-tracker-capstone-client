# Capstone Project Title

One line description of what this app is doing and who is it for

## Working Prototype

You can access a working prototype of the React app here: https://your-app-client.herokuapp.com/ and Node app here: https://your-app-server.herokuapp.com/

## User Stories

This app is for two types of users: a visitor and a logged-in user

#### Landing Page

- as a visitor
- I want to understand what I can do with this app (or sign up, or log in)
- so I can decide if I want to use it

#### Landing Page:

- As a new/returning user
- I want to be able to understand what I am seeing and what I can do with the application
- so that I can find this application useful and reliable

#### Register Page:

- As a visitor
- I want to be able to sign up using an email address and password
- so that I can create an account to access the web application

#### Login Page:

- As a new/returning user
- I want to be able to login using my registered email and password
- to gain access to my personal account of the web application

#### Home Page:

- As a user
- I want to to be able to se a dashboard that shows all the tasks that fit the date criteria (with date shown within dashboard)
- so that I can easily track what needs to be done

* As a user
* I want to be able to click on Date Category tabs that will bring me to the Category Page of my choice
* so that I can navigate to the Category Page's contents

#### Category Page

- As a user
- I want to be able to see all the tasks stored under the given category
- so that I can see, edit or delete all my tasks within that field

* As a user
* I want to be able to click on a Task within the populated list
* so that I can navigate to the specific task I want details on

#### Task Page

- As a user
- I want to be able to see the page of a specific Task that shows title, notes, and category type
- so that I can see any detailed notes on the task relevent to its completion

* As a user
* I want to be able to be able to click buttons that allow me to edit the contents of the task or to delete the task
* so that the task remains relevent to my needs

### Wireframes

<!-- Landing/Login Page
:-------------------------:
![Landing/Login Page](/github-images/wireframes/landing-page-wireframe.png) -->

#### Landing/Register Page

![Landing/Register Page](/github-images/wireframes/landing-page-signup.png)

#### Dashboard

![Home/Dashboard](/github-images/wireframes/home-page-dashboard.png)

#### Category Page/Weekdays

![Catogory Page/Weekdays](/github-images/wireframes/category-page-weekdays.png)

#### Category Page/Weekly

![Catogory Page/Weekly](/github-images/wireframes/category-page-weekly.png)

#### ategory Page/Monthly

![Catogory Page/Monthly](/github-images/wireframes/category-page-monthly.png)

#### Add Task Form

![Add Task Form](/github-images/wireframes/add-task-form.png)

## Screenshots

Landing/Login Page
:-------------------------:
![Landing Page](/github-images/screenshots/login-page-screenshot.png)
Landing/Register Page
![Register Page](/github-images/screenshots/login-page-screenshot.png)

## Functionality

The app's functionality includes:

- Every User has the ability to create an account

## Technology

- Front-End: HTML5, CSS3, JavaScript ES6, React
- Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
- Development Environment: Heroku, DBeaver

## Front-end Structure - React Components Map

- **Index.js** (stateless)
  - **App.js** (stateful)
    - **LandingPage.js** (stateful) - gets the _"prop name"_ and the _"callback prop name"_ from the **App.js**
      - **Login.js** (stateful) -
      - **Register.js** (stateful) -
    - **Context.Provider** (stateless) -
      - **CategoryListNav.js** (stateless) -
      - **Dashboard.js** (stateful) -
      - **CategoryListMain.js** (stateful) -
        - **Task.js** (stateful) -
        - **AddTask.js** (stateful) -

## Back-end Structure - Business Objects

- user (DATABASE table)

  - user id
  - email (email validation)
  - password (at least 8 chars, 1 alpha, 1 special)

- event (DATABASE table)

  - event id
  - user id
  - title (varchar)
  - notes (text)
  - recurrence (weekday, weekly, monthly)
  - recurrence specifics (Monday, 2nd and 4th week of the month, January)
  - start date (date)
  - end date (date)

- tasks (DATABASE table)
  - task id
  - event id
  - date of the task (date)
  - task_status (checked / un-checked)
  - task_completion_date (date)

## API Documentation

API Documentation details:

- get all users

## Responsive

App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

- add more functionality

## How to run it

Use command line to navigate into the project folder and run the following in terminal

### Local Node scripts

- To install the node project ===> npm install
- To migrate the database ===> npm run migrate -- 1
- To run Node server (on port 8000) ===> npm run dev
- To run tests ===> npm run test

### Local React scripts

- To install the react project ===> npm install
- To run react (on port 3000) ===> npm start
- To run tests ===> npm run test

USER STORIES:

Landing Page:
-As a new/returning user
-I want to be able to understand what I am seeing and what I can do with the application
-so that I can find this application useful and reliable

    Register Page:
        -As a visitor
        -I want to be able to sign up using an email address and password
        -so that I can create an account to access the web application

    Login Page:
        -As a new/returning user
        -I want to be able to login using my registered email and password
        -to gain access to my personal account of the web application

    Home Page:
        -As a user
        -I want to to be able to se a dashboard that shows all the tasks that fit the date criteria (with date shown within dashboard)
        -so that I can easily track what needs to be done

        -As a user
        -I want to be able to click on Date Category tabs that will bring me to the Category Page of my choice
        -so that I can navigate to the Category Page's contents

    Category Page
        -As a user
        -I want to be able to see all the tasks stored under the given category
        -so that I can see, edit or delete all my tasks within that field

        -As a user
        -I want to be able to click on a Task within the populated list
        -so that I can navigate to the specific task I want details on

    Task Page
        -As a user
        -I want to be able to see the page of a specific Task that shows title, notes, and category type
        -so that I can see any detailed notes on the task relevent to its completion

        -As a user
        -I want to be able to be able to click buttons that allow me to edit the contents of the task or to delete the task
        -so that the task remains relevent to my needs
