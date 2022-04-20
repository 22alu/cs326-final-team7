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
        obj['courseName'] = faker.name.firstName();
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
        obj['uniName'] = faker.name.firstName();
        obj['numRatings'] = faker.random.number({min: 1, max: 100});
        obj['overallRating'] = Math.random() * 5;
        fakeData.push(obj);
    }
    response.json(fakeData);
});

app.get('userProfile', async (request, response) => {
    const options = request.body;
    let fakeData = {};
    obj['username'] = faker.name.firstName();
    obj['password'] = faker.name());
    obj['email'] = fake.name();
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