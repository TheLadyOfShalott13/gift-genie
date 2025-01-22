# Gift Genie - A Personal Relationships Management System (Automating the process of gift gifting so you don't have to)

## Project Specifications
This project is used to demonstrate an example of **MERN stack (MongoDB, Express.js, React.js, Node.js) CRUD application** with file management using the **Multer** library. The ODM used here is **mongoose**. The backend is hosted as a **microservice**, each CRUD action invokes an **API** to a service. Login authentication is done using **JWT**.

## Table of Contents
- [Basic Idea](#basic-idea)
- [Running The Project](#running-the-project)
- [Product Features](#product-features)
- [Use Cases](#use-cases)
- [Dependencies](#dependencies)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## Basic Idea
This idea first came to me in my last full time job where I was usually tasked with gift selection for co-workers' birthdays. Usually, a week before a coworker's birthday, a whatsapp group would be created where we would start our discussions for gifts, cake and even a birthday prank setup. I started to wonder if there was a way to suggest gifts and make the whole gift selection process easier instead of laboriously poring through different options online. Perhaps, if accompanied by a reminder system, we can even send alerts for upcoming birthdays, pending gift purchases and other important dates.  

For the structure of a coworker's profile, which would contain information crucial to the gift selection/suggestion process (including their personal information, important dates, interests and gifts) was made clearer to me from my time playing an awesome indie game called ["Stardew Valley"](https://store.steampowered.com/app/413150/Stardew_Valley). I drew inspiration from the meticulously created NPC profiles which categorized gifts as _Loved_, _Liked_, _Neutral_, _Disliked_ and _Hated_ - each gift from these categories would have a direct effect on the friendship level between the player and the NPC in question. 

In short, this is a solution that enters a person's details including their birthday, interests and gifts - to be categorized as loved, liked, neutral and disliked. There is a calendar view that shows upcoming birthdays and this can be used to plan for birthdays in advance. Gifts can be suggested based on a person's interests. A gift purchase request is then placed with a threshold price entered wherein the cron job shall trigger the purchase of a gift when it falls below the given threshold. 

## Running the Project
### Prerequisites
The following must be installed and setup before proceeding with running this project:
- MongoDB Server
- MongoDB Compass (GUI for viewing/managing MongoDB data)
- Node Package Manager on the backend server
- Nodemon via command line `npm install nodemon`

_Note: This project uses the Javascript ES6 standard._

### Setting up the backend
In order to run this project, we need to follow the below steps:
1. Navigate to `/server` folder
2. Create a `.env` file just like the following example:
    ```
   MONGO = <MONGO_DB_URL>
   JWT = <JWT>
   FRONTEND_URL = 'http://localhost:3000'
   PORT = 7700
   ```
    - `MONGO_DB_URL` is the MongoDB server URL
    - `JWT` is the Javascript Web Token used for authentication and can be any kind of string generated. 
    - `FRONTEND_URL` refers to the frontend URL which will be included in the exceptions for the CORS policy.
    - `PORT` refers to the backend port number.
3. (Only if running it for the first time) Run the command `npm install` to install all the dependencies given in the `package.json` file.
4. Run the command `nodemon ./index.js`

### Setting up the frontend
In order to run this project, we need to follow the below steps:
1. Navigate to `/client` folder
2. Create a `.env` file just like the following example:
    ```
    REACT_APP_FRONTEND_URL = 'http://localhost:3000'
    REACT_APP_BACKEND_URL = 'http://localhost:7700'
   ```
    - `REACT_APP_FRONTEND_URL` should include the value of your frontend base URL 
    - `REACT_APP_BACKEND_URL` should include the value of your backend base URL 
3. (Only if running it for the first time) Run the command `npm install` to install all the dependencies given in the `package.json` file.
4. Run the command `npm start`

## Product Features
These are the key functionalities of our application that make it unique and useful:

- Microservice based architecture using RESTful APIs
- User Authentication using JWT based Authorization
- Dynamic data rendering and updates upon user interaction
- Automation of condition-based gift purchases using cron jobs
- File uploading and management


## Use Cases
- Login and Register users using username, email and password in order to implement data isolation and privacy across users.
- Adding and modifying gifts in the database. A price threshold is entered alongside the gift to indicate the max budget for that particular gift. File uploading and management is possible per entry. 
- Adding and modifying interests in the database. A list of gifts may be selected and assigned to a particular interest. File uploading and management is possible per entry.
- Adding and modifying persons in the database. 
  - Enter personal details like name, address, contact information, birthday and upload a picture
  - Assign Interests to this person
  - Assign Gifts to this person based on assigned Interests. Categorize them as either Loved, Liked, Neutral or Disliked.
- Placing a gift purchase, adding a tracking link which can be used to web scrape details and display on our system for delivery updates.


## Dependencies
### Backend
1. **Bcrypt.js**: Node.js password hashing and comparison library
2. **Cookie-Parser**: Node.js cookie parsing library. Used for setting cookies that will be used to authenticate active sessions.
3. **Cors**: Cross-Origin Resource Sharing library
4. **Dotenv**: Node.js `.env` Middleware
5. **Express.js**: Node.js framework
6. **Helmet**: Helps to secure express apps by setting HTTP response headers.
7. **JSON Web Token (JWT)**: Token based authentication used while logging in
8. **MongoDB**: Node.js MongoDB driver
9. **Mongoose**: Node.js ODM (Object Document Mapping) library used for interacting with the MongoDB Server 
10. **Morgan**: Node.js request logger middleware
11. **Multer**: Node.js file uploader middleware (handling `multipart/form-data` forms)
12. **Nodemon**: Automatically restarts the application when file changes in the directory are detected.

### Frontend
1. **Axios**: Promise based Node.js API Middleware
2. **React.js**: Asynchronous frontend JS framework
3. **React Bootstrap**: React.js Bootstrap Styling Library
4. **React DOM**: React.js DOM renderer
5. **React Router DOM**: React.js Router Library
6. **React Scripts** 
7. **React Select**: React.js Select Component
8. **React Tooltip**: React.js Tooltip Component
9. **Web Vitals**: Web application health logger
10. **Font Awesome**: Icons imported from Font Awesome for various actions per item per module
11. Testing Library for Jest DOM
12. Testing Library for React
13. Testing Library for User Event


## License
This is a personal project developed for the sole purpose of learning new technologies and building a useful tool by automating jobs to increase efficiency. This project not open for distribution to the public or duplication without the consent of the author. This project is also not affiliated with any businesses and was not developed with any financial motive. 

## Authors
Created exclusively by [Nisreen K. aka TheLadyOfShalott](https://github.com/TheLadyOfShalott13)

## Acknowledgements
Special thanks to ConcernedApe for creation of ["Stardew Valley"](https://store.steampowered.com/app/413150/Stardew_Valley) which served as an inspiration for the person module in this project and for the hours of mental destressing achieved by this awesome game. 
