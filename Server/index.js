import express, { response } from "express";
import { RatingsTable } from "./ratingDB";
import logger from "morgan";
import { RatingsTable } from "./ratingDB.js";

const app = express();
const port = process.env.PORT || 80;

const dburl = process.env.DATABASE_URL;

const db = new RatingsTable(dburl);
await db.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/client", express.static("Client"));

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
    const options = request.body;
    const data = await db.ratingUnderUser(options.username);
    response.json(data);
});

app.put('/updateUser', async (request, response) => {
    const options = request.body;
    console.log("Updated User Profile");
    response.json("Updated User Profile");
});

app.put('/updateReviews', async (request, response) => {
    const options = request.body;
    console.log("Updated User Reviews");
    response.json("Updated User Reviews");
});

app.get('/unis', async (request, response) => {
    const options = request.query;
    const data = await db.uniStartingWith(options.query);
    let retList = [];
    data.forEach(e => retList.push(e.uniName));
    response.json(retList);
});

app.get('/courses', async (request, response) => {
    const options = request.query;
    const data = await db.courseIDStartingWith(options.courseName);
    let retList = [];
    data.forEach(e => retList.push(e.courseID));
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
    const options = request.body;
    console.log("Deleted the review");
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