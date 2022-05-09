import express, { response } from "express";
import logger from "morgan";
import { RatingsTable } from "./ratingDB.js";
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const app = express();
const port = process.env.PORT || 80;

const dburl = process.env.DATABASE_URL;

const db = new RatingsTable(dburl);
await db.connect();

// Session configuration
const sessionConfig = {
    // set this encryption key in Heroku config (never in GitHub)!
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
  };

app.use(expressSession(sessionConfig));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/client", express.static("Client"));
auth.configure(app);

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      // If we are authenticated, run the next route.
      next();
    } else {
      // Otherwise, redirect to the login page.
      res.redirect('Client/login.html');
    }
}

// Handle post data from the login.html form.
app.post(
    '/login',
    auth.authenticate('local', {
      // use username/password authentication
      successRedirect: '/profilepage', // when we login, go to /private
      failureRedirect: 'Client/login.html', // otherwise, back to login
    })
);

// Private data
app.get(
    '/profilepage',
    checkLoggedIn, // If we are logged in (notice the comma!)...
    (req, res) => {
      // Go to the user's page.
      res.redirect('Client/profilepage.html?user=' + req.user);
    }
);

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('Client/login.html'); // back to login
});

// handles post call to register a user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const ret = await users.addUser(username, password);
    if (ret) {
      res.redirect('/Client/login.html');
    } else {
      res.redirect('Client/register.html');
    }
});
  
// Register URL
app.get('/register', (req, res) =>
    res.sendFile('Client/register.html', { root: __dirname })
);

// Get all ratings under a courseid
app.get('/courseRatings', async (request, response) => {
    const options = request.query;
    const data = await db.ratingUnderCourse(options.course);
    response.json(data);
});

//Row data into array of university names
function uniRatingsHelper(data){
    let courses = {};
    let courseSet = new Set();
    data.forEach(e => {
        const data = courses[e.courseID] || {'courseNumber' : e.courseID, 'courseName' : e.courseName, 'numRatings' : 0, 'overallRating' : 0};
        data.numRatings += 1;
        data.overallRating += e.rate; 
        courses[e.courseID] = data;
        courseSet.add(e.courseID);
    });
    let courseList = [];
    courseSet.forEach((e) => { 
        const data = courses[e];
        data.overallRating = data.overallRating / data.numRatings;
        courseList.push(data);
    });
    return courseList;
}

//All courses that have ratings under a university
app.get('/uniRatings', async (request, response) => {
    const options = request.query;
    const data = await db.ratingUnderUni(options.uniName);
    response.json(uniRatingsHelper(data));
});

//ALl ratings made by a user
app.get('/userRatings', async (request, response) => {
    const options = request.query;
    const data = await db.ratingUnderUser(options.username);
    response.json(data);
});

//Update description of a previously made review
app.put('/updateReviews', async (request, response) => {
    const {id, desc} = request.body;
    await db.updateRating(id, desc);
    response.json("Updated User Reviews");
});

//All university in database that match a query substring
app.get('/unis', async (request, response) => {
    const options = request.query;
    const data = await db.uniStartingWith(options.query);
    let retSet = new Set();
    let retList = [];
    data.forEach(e => retSet.add(e.uniName));
    retSet.forEach(e => retList.push(e));
    response.json(retList);
});

//All courses in database that match a query substring
app.get('/courses', async (request, response) => {
    const options = request.query;
    const data = await db.courseIDStartingWith(options.courseName);
    let retSet = new Set();
    let retList = [];
    data.forEach(e => retSet.add(e.courseID));
    retSet.forEach(e => retList.push(e));
    response.json(retList);
});

//Create a new review and add it to the database
app.post('/createReview', async (request, response) => {
    const options = request.body.ratingObj;
    const data = await db.addRating(options.userName, options.desc, options.rate, options.courseID, options.courseName, options.uniName);
    response.json("Added New Review");
});

//Delete a review from the database
app.delete('/deleteReview', async (request, response) => {
    const {id} = request.body;
    await db.deleteRating(id);
    response.json("Deleted the review");
});

//Redirect to home page
app.get('/', async (request, response) =>{
    response.redirect('/Client/index.html');
});

//No existing pages
app.get("*", async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); 