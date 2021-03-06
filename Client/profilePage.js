import * as client from './client.js';

//empty array of reviews, empty string username.
let myReviews = [];
const url = window.location.href;
const querry = new URLSearchParams(url.substring(url.indexOf("?"), url.length));
let orig_user = {'username': querry.get("user")};

loadProfile(orig_user.username);

//function to load the profile page.
async function loadProfile(username){
    //get profile information
    myReviews = await client.userRatings(username);
    //display reviews.
    document.getElementById("welcomeUser").innerText = "Welcome " + orig_user.username;
    document.getElementById("commentHeader").innerText = "Your Reviews:";
    await loadReviews(document.getElementById("allReviews"));
    return;
}

//toggle visibility + usage of login/out button
function login(){
    window.localStorage.setItem("login", "true");
    document.getElementById("log").innerText = "Log Out";
    document.getElementById("log").addEventListener("click", logout);
    document.getElementById("log").removeEventListener("click", login);
   toggleReviewButtons();
    return;
}

//unused function, edit privileges removed.
function toggleReviewButtons(){
    for(let count in myReviews){
        if(window.localStorage.getItem("login") === "true"){
            document.getElementById("editBtn"+count).style.display = "block";
            document.getElementById("delBtn"+count).style.display = "block";
        }else{
            document.getElementById("editBtn"+count).style.display = "none";
            document.getElementById("delBtn"+count).style.display = "none";
        }
    }
}

//display a single review
function renderReview(review, id){
    let theReview = document.createElement("div");
    theReview.appendChild(document.createElement("br"));
    theReview.appendChild(document.createElement("hr"));
    //display some info
    let courseName = document.createElement("p");
    courseName.innerText = "Course: " + review.courseName;
    
    let rating = document.createElement("p");
    rating.innerText = "Rating: " + review.rate;

    let university = document.createElement("p");
    university.innerText = "University: " + review.uniName;
    
    //create comment area
    let comment = document.createElement("textarea");
    comment.classList.add("commentArea");
    comment.setAttribute("id", "comment"+id);
    comment.setAttribute("rows", 3);
    comment.disabled = true;
    comment.innerText = review.description;

    //create edit + delete buttons
    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.setAttribute("id", "editBtn"+id);
    edit.addEventListener("click", function() {editReview(this)});
    
    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.setAttribute("id", "delBtn"+id);
    delBtn.addEventListener("click", function() {deleteReview(this.parentElement)});
    
    //dom surgery
    theReview.appendChild(courseName);
    theReview.appendChild(university);
    theReview.appendChild(rating);
    theReview.appendChild(comment);
    theReview.appendChild(edit);
    theReview.appendChild(delBtn);

    theReview.setAttribute("id", "review"+id);
    return theReview;
}



function editReview(element){
    element.innerText = "Save";
    element.removeEventListener("click", function() { editReview(this)});
    element.addEventListener("click", function() {saveReview(this.parentElement)} );

    let id = element.parentElement.id;
    id = parseInt(id.substring(6));
    let comment = document.getElementById("comment"+id);
    comment.disabled = false;
    return;
}

async function saveReview(element){
    let id = element.id;
    id = parseInt(id.substring(6));
    const description = document.getElementById("comment"+id).value;
    const response = await client.updateReviews(id, description);
    location.reload();
    return;
}

async function loadReviews(element){
    element.innerText = "";
    myReviews = await client.userRatings(orig_user.username);
    for (let i = 0; i < myReviews.length; i++){
        if(myReviews[i] != null){
            element.appendChild(renderReview(myReviews[i], myReviews[i].id));
        }
    }
    return;
}


async function deleteReview(element){
    let id = element.id;
    id = parseInt(id.substring(6));
    const response = await client.deleteReview(id);
    location.reload();
    return;
}

document.getElementById("smallSearch").addEventListener("click", () => {
    redirectToResults(document.getElementById("smallInput").value);
});

function redirectToResults(querry){
    window.location.href = "resultsPage.html?search=" + querry;
}