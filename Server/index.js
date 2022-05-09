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

app.get('/courseRatings', async (request, response) => {
    const options = request.query;
    const data = await db.ratingUnderCourse(options.course);
    response.json(data);
});

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

app.get('/uniRatings', async (request, response) => {
    const options = request.query;
    const data = await db.ratingUnderUni(options.uniName);
    response.json(uniRatingsHelper(data));
});

app.get('/userRatings', async (request, response) => {
    const options = request.query;
    const data = await db.ratingUnderUser(options.username);
    response.json(data);
});

app.put('/updateReviews', async (request, response) => {
    const {id, desc} = request.body;
    console.log(id, desc);
    await db.updateRating(id, desc);
    response.json("Updated User Reviews");
});

app.get('/unis', async (request, response) => {
    const options = request.query;
    const data = await db.uniStartingWith(options.query);
    let retSet = new Set();
    let retList = [];
    data.forEach(e => retSet.add(e.uniName));
    retSet.forEach(e => retList.push(e));
    response.json(retList);
});

app.get('/courses', async (request, response) => {
    const options = request.query;
    const data = await db.courseIDStartingWith(options.courseName);
    let retSet = new Set();
    let retList = [];
    data.forEach(e => retSet.add(e.courseID));
    retSet.forEach(e => retList.push(e));
    response.json(retList);
});

app.get('/userProfile', async (request, response) => {
    const options = request.body;
    let fakeData = {};
    fakeData['username'] = faker.name.firstName();
    fakeData['password'] = faker.random.words();
    fakeData['email'] = faker.internet.exampleEmail();
    response.json(fakeData);
})

app.post('/createReview', async (request, response) => {
    const options = request.body.ratingObj;
    const data = await db.addRating(options.userName, options.desc, options.rate, options.courseID, options.courseName, options.uniName);
    response.json("Added New Review");
});

app.delete('/deleteReview', async (request, response) => {
    const {id} = request.body;
    await db.deleteRating(id);
    response.json("Deleted the review");
});

app.post('/register', async (request, response) => {
    const options = request.body;
    await db.registerUser(options.userName, options.password);
    response.status(200).send(`200 OK`);
});

app.get('/login', async (request, response) => {
    const userName = request.query;
    const res = await db.attemptLogin(userName);
    response.send(JSON.stringify(res));
});

app.get('/', async (request, response) =>{
    response.redirect('/Client/index.html');
});

app.get("*", async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); 