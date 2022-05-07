import * as client from './client.js';

const url = window.location.href;
const querry = new URLSearchParams(url.substring(url.indexOf('?'), url.length));
const courseName = querry.get('courseName');
const uniName = querry.get('uniName');

document.getElementById("courseBadge").innerText = courseName;

const sortSelector = document.getElementById('sort');

const ratings = await client.courseRatings(courseName, uniName);
// const ratings = [{'user': 'Andy','star': 4, 'description': "BEST CLASS EVER", 'university': "UMass"}, {'user': 'And','star': 2, 'description': "WORST CLASS EVER", 'university': "UMass"}, {'user': 'An','star': 3, 'description': "OKAYEST CLASS EVER", 'university': "UMass"}];

function createRatingCard(rating){
    const cardRatings = document.getElementById("cardRatings");
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.classList.add("courseCard");
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-5");
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    const cardHeader = document.createElement("p"); 
    cardHeader.classList.add("card-header");
    cardHeader.classList.add("text-dark");
    cardHeader.innerText = rating.user + "'s Review:";
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const bodyRow = document.createElement("div");
    bodyRow.classList.add("row");
    const bodyStarCol = document.createElement("div");
    bodyStarCol.classList.add("col-3");
    bodyStarCol.classList.add("courseStars");
    const rateContent = document.createElement("a");
    const rate = document.createElement("a");
    rate.innerText = String(rating.star) + "/5";
    const icon = document.createElement("i");
    icon.classList.add("bi");
    icon.classList.add("bi-star-fill");
    rateContent.appendChild(rate);
    rateContent.appendChild(icon);
    bodyStarCol.appendChild(rateContent);
    const bodyDescCol = document.createElement("div");
    bodyDescCol.classList.add("col-9");
    bodyDescCol.innerText = rating.description;
    bodyRow.appendChild(bodyStarCol);
    bodyRow.appendChild(bodyDescCol);
    cardBody.appendChild(bodyRow);
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    rowDiv.appendChild(colDiv);
    cardRatings.appendChild(rowDiv);
}

sortSelector.addEventListener("change", function(event) {
    if (sortSelector.value == 'leastLikes'){
        sortRatings(-1);
    }
    else{
        sortRatings(1);
    }
    displayRatings();
});

function sortRatings(coef){
    ratings.sort(function(x, y) { return coef * (parseInt(y.star) - parseInt(x.star)) });
}

function displayRatings(){
    document.getElementById("cardRatings").innerHTML = "";
    ratings.forEach(rating => createRatingCard(rating));
}

sortRatings(1);
displayRatings();

document.getElementById("submitReview").addEventListener("click", submitButton);

function submitButton(){
    document.getElementById("reviewSubmission").innerHTML = `
    <form id="reviewForm" class="border border-primary submitForm">
        <div class="form-group row formContent">
            <div class="col-sm-5">
                <label for="userName">Your Display Name:</label>
                <input type="text" class="form-control" id="userName" placeholder="Name" name="user">
            </div>
            <div class="col-sm-2">
                <label for="star">Rating Stars:</label>
                <input type="number" class="form-control input-sm" id="star" placeholder="0 to 5" max="5" min="0" name="star">
            </div>
        </div>
        <div class="form-group row formContent">
            <div class="col-sm-5">
                <label for="courseName">Course Name:</label>
                <input type="text" class="form-control" id="courseName" placeholder="Course Name (e.g. Intro to ML)" name="courseName">
            </div>
            <div class="col-sm-5">
                <label for="courseID">Course Number/ID:</label>
                <input type="text" class="form-control" id="courseID" placeholder="Course ID (e.g. CS326)" name="courseID">
            </div>
        </div>
        <div class="form-group row formContent">
            <div class="col-sm-5">
                <label for="uniName">University:</label>
                <input type="text" class="form-control" id="uniName" placeholder="University Name" name="uniName">
            </div>
        </div>
        <div class="form-group row formContent">
            <div class="col-9">
                <label for="description">Review Description:</label>
                <textarea type="text" class="form-control" id="description" placeholder="Write your review here" name="desc"></textarea>
            </div>
        </div>
        <button type="submit" class="btn btn-primary formSubmit">Submit</button>
    </form>`;
    document.getElementById("reviewForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = new FormData(document.getElementById("reviewForm"));
        if((fd.get("star") !== '') && (fd.get("desc") !== '') && (fd.get('user') !== '') && (fd.get('courseID') !== '') && (fd.get('uniName') !== '') && (fd.get('courseName') !== '')){
            const ratingObj = {"star": fd.get("star"), "description": fd.get("desc"), 'userName': fd.get('user'), "courseID": fd.get("courseID"), "uniName": fd.get("uniName"), "courseName": fd.get("courseName")};
            console.log(ratingObj);
            const response = await client.createReview(courseName, uniName, ratingObj);
            console.log(response);
            const sleep = ms => new Promise(r => setTimeout(r, ms));
            await sleep(600);
            location.reload();
        }
    });
}

document.getElementById("smallSearch").addEventListener("click", () => {
    redirectToResults(document.getElementById("smallInput").value);
});

function redirectToResults(querry){
    console.log(querry);
    window.location.href = "resultsPage.html?search=" + querry;
}