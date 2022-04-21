import * as client from './client.js';

const url = window.location.href;
const querry = new URLSearchParams(url.substring(url.indexOf('?'), url.length));
const courseName = querry.get('courseName');
const uniName = querry.get('uniName');

document.getElementById("courseBadge").innerText = courseName;

const sortSelector = document.getElementById('sort');

const ratings = await client.courseRatings(courseName, uniName);
// const ratings = [{'user': 'Andy','rate': 4, 'description': "BEST CLASS EVER", 'university': "UMass"}, {'user': 'And','rate': 2, 'description': "WORST CLASS EVER", 'university': "UMass"}, {'user': 'An','rate': 3, 'description': "OKAYEST CLASS EVER", 'university': "UMass"}];

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
    rate.innerText = String(rating.rate) + "/5";
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
    ratings.sort(function(x, y) { return coef * (parseInt(y.rate) - parseInt(x.rate)) });
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
    <form id="reviewForm">
        <div class="form-group">
            <div class="col-sm-5">
                <label for="userName">Your UserName:</label>
                <input type="text" class="form-control" id="userName" placeholder="UserName" name="user">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-5">
                <label for="rating">Rating Stars:</label>
                <input type="number" class="form-control" id="rating" placeholder="0 to 5" max="5" min="0" name="rating">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-5">
                <label for="description">Review Description:</label>
                <textarea type="text" class="form-control" id="description" placeholder="Write your review here" name="desc"></textarea>
            </div>
        </div>
        <button type="submit" class="btn btn-primary submitBtn">Submit</button>
    </form>`;
    document.getElementById("reviewForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = new FormData(document.getElementById("reviewForm"));
        if((fd.get("rating") !== '') && (fd.get("desc") !== '') && (fd.get('user') !== '')){
            const ratingObj = {"rate": fd.get("rating"), "description": fd.get("desc"), 'university': uniName, 'user': fd.get('user')};
            ratings.push(ratingObj);
            sortRatings(1);
            displayRatings();
            const response = await client.createReview(courseName, uniName, ratingObj);
            console.log(response);
            document.getElementById("reviewSubmission").innerHTML = `<button type="button" class="btn btn-primary footerButtons submitBtn" id="submitReview"><i class="bi bi-pen"></i> &nbsp; Submit your own review! </button>`;
            document.getElementById("submitReview").addEventListener("click", submitButton);
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