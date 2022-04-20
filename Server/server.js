import { faker } from "@faker-js/faker";
import express from "express";
import logger from "morgan";

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

const app = express();
const port = 3000;
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
        obj['rate'] = faker.random.number({min: 0, max: 5});
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
        obj['courseNumber'] = faker.random.alpha({ count: 2, upcase: true,}) + faker.random.number({min: 100, max: 999});
        obj['courseName'] = faker.company.catchPhrase();
        obj['numRatings'] = faker.random.number({min: 1, max: 100});
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
        fakeData.push(faker.random.words(2));
    }
    response.json(fakeData);
});

app.get('/courses', async (request, response) => {
    const options = request.body;
    const r = rand(2,7);
    let fakeData = []
    for(let i = 0; i < r; i++){
        fakeData.push(faker.company.catchPhrase());
    }
    response.json(fakeData);
});

app.get('/userProfile', async (request, response) => {
    const options = request.body;
    let fakeData = {};
    obj['username'] = faker.name.firstName();
    obj['password'] = faker.name();
    obj['email'] = faker.internet.exampleEmail();
    response.json(fakeData);
})

app.post('/createReview', async (request, response) => {
    const options = request.body;
    console.log("Created a new review");
    response.json("Created a new review");
});

app.get("*", async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log(`Server started on poart ${port}`);
});