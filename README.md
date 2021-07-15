# Interview Scheduler

Interview Scheduler is a single page application, built using React. 

* The data is persisted by an API server using a PostGresSQL database
* The client application communicates with the API server over HTML, using the JSON format
* Jest tests are used throughout the development of the project, with the implementation of Cypress for end-to-end testing

## Project Features 

* The list of days informs the user how many slots are available for each day
* A user can switch between weekdays to see details for each day
* A user can book an interview in an empty appointment slot.
* A user can book an interview by typing in a student name and clicking on an interviewer from a list of available interviewers
* A user can cancel an existing interview
* A user can edit the details of an existing interview
* The expected day updates the number of spots available when an interview is booked or canceled
* A user is presented with a confirmation when they attempt to cancel an interview
* A user is shown an error if an interview cannot be saved or deleted
* A user is shown a status indicator while asynchronous operations are in progress
* When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm)
* The application makes API requests to load and persist data. We do not lose data after a browser refresh

## Screenshots

![Main page](https://github.com/vvncheung/scheduler/blob/master/docs/index-page.png?raw=true)
📌 Main page

![Different functionalities](https://github.com/vvncheung/scheduler/blob/master/docs/secondary-view.png?raw=true)
📆 Different appointment states, from top to bottom:

1️⃣ Edit interview 2️⃣ Hover over existing interview to access edit and delete buttons 3️⃣ Existing interview in its passive state


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Database set up

This project requires the setup of a database in order to run in full functionality

To set up the database:
* Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api)
* Follow the steps in the README to set up the database
* Fork and clone this repo
* Install dependencies using `npm install`
* Run `npm start` from the root directory of the project once the database has been set up and the scheduler-api is running

## Stack
*Front-End:* React, Axios, JSX, HTML, SASS, JavaScript

*Back-End:* Express, Node.js, PostgreSQL

*Testing:* Storybook, Webpack Dev Server, Jest, React Testing Library and Cypress

## Dependencies

* Axios
* Babel/core
* Babel-loader
* Classnames
* Node-sass
* Normalize.css
* React
* React-dom
* React-scripts
* React-test-renderer
* Storybook/addon-actions
* Storybook/addon-backgrounds
* Storybook/addon-links
* Storybook/addons
* Storybook/react
* Prop-types
* Testing-library/jest-dom
* Testing-library/react
* Testing-library/react-hooks
