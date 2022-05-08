import express, { response } from "express";
import { RatingsTable } from "./ratingDB";
import logger from "morgan";

const app = express();
const port = process.env.PORT || 80;

const dburl = process.env.DATABASE_URL;
let db = new RatingsTable(dburl);
await db.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/client", express.static("Client"));

app.get('/courseRatings', async (request, response) => {
    const options = request.body;
    const r = rand(5,10);
    let fakeData = [];
    for(let i = 0; i < r; i++){
        let obj = {};
        obj['user'] = faker.name.firstName();
        obj['rate'] = faker.datatype.number({min: 0, max: 5});
        obj['description'] = faker.random.words(rand(5,15));
        fakeData.push(obj);
    }
    response.json(fakeData);
});

app.get('/uniRatings', async (request, response) => {
    const options = request.body;
    const r = rand(5,10);
    let fakeData = [];
    for(let i = 0; i < r; i++){
        let obj = {};
        obj['courseNumber'] = faker.random.alpha({ count: 2, upcase: true,}) + faker.datatype.number({min: 100, max: 999});
        obj['courseName'] = faker.company.catchPhrase();
        obj['numRatings'] = faker.datatype.number({min: 1, max: 100});
        obj['overallRating'] = Math.round(Math.random() * 5 * 10) / 10;
        fakeData.push(obj);
    }
    response.json(fakeData);
});

app.get('/userRatings', async (request, response) => {
    const options = request.body;
    const r = rand(5, 10);
    let fakeData = [];
    for(let i = 0; i < r; i++){
        let obj = {};
        obj['uniName'] = faker.random.words(2);
        obj['courseName'] = faker.company.catchPhrase();
        obj['rating'] = Math.round(Math.random() * 5 * 10) / 10;
        obj['comment'] = faker.random.words(rand(5,15));
        fakeData.push(obj);
    }
    response.json(fakeData);
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
    const options = request.body;
    const r = rand(2,7);
    let fakeData = []
    for(let i = 0; i < r; i++){
        fakeData.push(request.query.query.toUpperCase() + ' ' + faker.random.words(rand(0,2)));
    }
    response.json(fakeData);
});

app.get('/courses', async (request, response) => {
    const options = request.body;
    const r = rand(2,7);
    let fakeData = []
    for(let i = 0; i < r; i++){
        fakeData.push(request.query.courseName.toUpperCase() + ' ' + faker.company.catchPhrase());
    }
    response.json(fakeData);
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
    const options = request.body;
    console.log("Created a new review");
    response.json("Created a new review");
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