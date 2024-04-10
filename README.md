# Wedo - project documentation

- The following file acts as the documentation for the entire project.

## Project management

- The link to our trello board : https://trello.com/b/fgCN5TET/todoa
- We have been using discord and other non professional methods and we added everything to trello for better representation.

## Overview

- This is a responsive web app, meant as a fun and interactive way to socialize and find people who share your interests. After creating a user profile, the user will be able to browse through available activities or search using the search bar and filter options. The user can join activities, or host their own, specifying a category, date, time, description, etc, with or without restrictions as to who can join the activity.
  Users can also leave an activity they no longer wish to attend, or delete an activity they no longer wish to host. When hosting an activity, the user can manage the activity by modifying the details or evict from the attendees list. If the host decides to make a private activity, participants must request to join, and the host may decline or accept the request. When hosting or joining an activity, the user will be entered into an automatically created chatroom. The costs of the app arise from the use of AWS Services Cognito, DynamoDB and S3 and Google's Firebase and GoogleMaps API.

## Technologies:

### Front-End

- Created with React JS as the frontend framework and the frontend tooling software vite.
- JavaScript: ES2023
- CSS
- Vite: version 4.4.9
- React: version 18.2.0
- React Dom: ^18.2.0
- React Router Dom: version ^6.15.0
- Dayjs (Date Time library): version ^1.11.9
- MUI Material: version ^5.14.13

#### Instructions on Installation and Setup

- This is a react vite project, start by running `npm i` in the root directory to install dependencies.
- To test and develop the frontend run `npm run dev`.
- Create a .env file in the root directory with **VITE_BACKEND** and assign to it the url for the backend endpoint making it easier to change urls between development and production.
- Note: Run `npm install -g firebase-tools` on your own device, if you have not used firebase before.

#### Deployment

- Start by change th backend url for **VITE_BACKEND** in .env, to the deployed backend address.
- Run `npm run build` to create the final frontend build.
- Login to firebase in your project directory using `firebase login`.
- Run the command `firebase deploy --only hosting`.

### Website URL

Website url: https://wedo-1a85a.web.app/

#### Pages

- **Homepage** represents the homepage
- **Userstest** contains UI for backend database testing
- **landing** contains the basic functionality for the website,top and bottom navbar with the cards.
- **ExploreActivities** contains the list of activities that are available for a user to join. Only activities that the user is eligible to join will display. The user can also use the search bar or filter options. The filter options allow the user to filter activities by name, date location, age, or categories. The activities are displayed as a list of cards and will show the activity photo, name, date and time, street address, and category. There are two buttons for each card: 'More' and 'Attend'. The 'More' button will display additional information such as Attendees, Age Requirement, Gender Requirement and Description. The user can click on an attendee to visit their user profile.
- **Attending** the user can view the activities that they have joined, and will display a cards list in the same way that the ExploreActivities page does. In place of the 'Attend' button will be the 'Leave' button. Clicking the 'Leave' button will ask the user to confirm if they wish to leave the activity. Once the activity date has passed, the activity will have a note at the top: "The event has finished. Leave a review" and the 'Leave' button will be changed to 'Review'. Clicking this button automatically removes the user from the activity, and they can leave a review if they wish to, with a rating out of 5. Leaving a review will remove the activity from the "Attending" page. If there are any activities the user is waiting to be accepted into, there will be a note at the top of the card that says "Pending".
- **Hosting** the user can view the activities that they are hosting. They are able to delete or edit activities, as well as view attendees and join requests for private activities. The host can remove attendees, as well as accept or decline join requests.
- **Profile** the profile page will display the user's details: their profile photo, birthday, gender and interests. Also on the page will be the user's ratings, calculated as the mean of ratings received, and the reviews they have received.

- **Hosting** the user can view the activities that they are hosting. They are able to delete or edit activities, as well as view attendees and join requests for private activities. The host can remove attendees, as well as accept or decline join requests.
- **Profile** the profile page will display the user's details: their profile photo, birthday, gender and interests. Also on the page will be the user's ratings, calculated as the mean of ratings received, and the reviews they have received.

#### Components

- **TopNavBar** top navbar with search functionality.
- **WedoNavBar** bottom navbar.
- **Cards** component responsible for displaying activities.

#### Forms

- This directory contains UI test components for the database functionality.

### Backend

- Uses DynamoDB to store data. The tables in use are Activity, User, ChatLog and Review
- Uses Cognito for user Sign up and Sign in

#### Instructions on Installation and Setup

- Run the command `cd backend/api/functions` in the main directory.
- run `npm i`
- It is a Firebase functions backend to to test it run the Google firebase emulator via `firebase emulators:start` , that also automatically creates a UI to view all backend api calls.

#### Deployment

- Run `firebase deploy --only functions` in the functions directory.

## Usage Examples

- If a user wanted to create an activity, they can click the fab icon (with a plus sign) to create an activity. They can select a category, date, time, location (which must be in NZ), image, activity name, age restriction, gender restrictions, private activity, maximum number of people, cost and description. Clicking 'Next' directs the user to the review page, where the user can review the details of their activity before publishing it for others to see, and potentially join.
- Clicking the 'Attend' button will add the activity in the user's 'Attending' page.

## Future plans:

- Implementation of Advertisements
- Implementation of Google Maps functionality
- Website UI overhaul
- Implement better security measures
- Add more rudimentary social networking features
- Sort by distance

## Acknowledgements:

- Security & Cross-origin bt Hasranjeet Singh (Cybersecurity graduate)
- React JS/TS Tutorial by Mosh Hamedani
- Git and GitHub for Beginners Tutorial by Kevin Stratvert
- Material UI Documentation for MUI Core Components
