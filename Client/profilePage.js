import * as client from './client.js';

//empty array of reviews, empty string username.
let myReviews = [];
//let orig_user = {};

//demo profile, however we use fakedata. by default the user is logged out.
//loadProfile("Andy");

//activate login/logout buttons. activate edit-profile button (though by default this is hidden)
document.getElementById("log").addEventListener("click", login);

//document.getElementById("profileEdit").addEventListener("click", updateProfile);

//function to load the profile page.
async function loadProfile(username){
    //get profile information
    let user = await client.userProfile(username);
    myReviews = await client.userRatings(username);

    //display reviews.
    await loadReviews(document.getElementById("allReviews"));

    //check if logged in/out. update html
    if(window.localStorage.getItem("login") === "true"){
        login();
    }else{
        logout();
    }

    /* removed.
    document.getElementById("UserNameInputBox").value = myname;
    document.getElementById("emailInputBox").value = email;
    document.getElementById("passwordInputBox").value = password;
    */

    return;
}

//toggle visibility + usage of login/out button
function logout(){
    window.localStorage.setItem("login", "false");
    document.getElementById("welcomeUser").innerText = orig_user.username + "'s Profile";
//    document.getElementById("UserNameInputBox").style.display = "none";
//    document.getElementById("userLabel").style.display = "none";
//    document.getElementById("emailInputBox").style.display = "none";
//    document.getElementById("emailLabel").style.display = "none";
//    document.getElementById("passwordInputBox").style.display = "none";
//    document.getElementById("pwLabel").style.display = "none";
    document.getElementById("commentHeader").innerText = orig_user.username + "'s Reviews";
    document.getElementById("profileEdit").style.display = "none";
    document.getElementById("log").innerText = "Log In";
    document.getElementById("log").removeEventListener("click", logout);
    document.getElementById("log").addEventListener("click", login);
    toggleReviewButtons();
    return;
}

//toggle visibility + usage of login/out button
function login(){
    window.localStorage.setItem("login", "true");
    document.getElementById("welcomeUser").innerText = "Welcome " + orig_user.username;
//    document.getElementById("UserNameInputBox").style.display = "block";
//    document.getElementById("userLabel").style.display = "block";
//    document.getElementById("emailInputBox").style.display = "block";
//    document.getElementById("emailLabel").style.display = "block";
//    document.getElementById("passwordInputBox").style.display = "block";
//    document.getElementById("pwLabel").style.display = "block";
    document.getElementById("commentHeader").innerText = "Your Reviews:";
//    document.getElementById("profileEdit").style.display = "block";
    document.getElementById("log").innerText = "Log Out";
    document.getElementById("log").addEventListener("click", logout);
    document.getElementById("log").removeEventListener("click", login);
//    toggleReviewButtons();
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

//unused function, profile edit removed.
/*function updateProfile(){
    //enable input boxes
    let username = document.getElementById("UserNameInputBox");
    username.disabled = false;
    let email = document.getElementById("emailInputBox");
    email.disabled = false;
    let password = document.getElementById("passwordInputBox");
    password.disabled = false;

    //toggle functionality of edit/save button
    let editButton = document.getElementById("profileEdit");
    editButton.innerText = "Save";
    editButton.removeEventListener("click", updateProfile);
    editButton.addEventListener("click", saveProfile);
}*/

/*unused function, save profile info removed.
async function saveProfile(){
    //verify
    let mypass = window.prompt("Please input your current password to verify this change.");

    if(mypass === orig_user.password){
        //get new or unchanged properties
        let username = document.getElementById("UserNameInputBox");
        let email = document.getElementById("emailInputBox");
        let password = document.getElementById("passwordInputBox");

        //change backend info for user, update global user variable
        const response = await client.updateUser(orig_user.username, username.value, email.value, password.value);
        orig_user = await client.userProfile(username.value);

        //reload profile
        loadProfile(username.value);

        //toggle edit/save button
        let editButton = document.getElementById("profileEdit");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", updateProfile);
        editButton.removeEventListener("click", saveProfile);

        //disable input boxes
        username.disabled = true;
        email.disabled = true;
        password.disabled = true;
    }else{
        window.alert("Incorrect password. Please try again.");
    }
    return;
}*/

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


/*review edit and save removed.
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
    let oldReviews = JSON.parse(JSON.stringify(myReviews));
    let id = element.id;
    id = parseInt(id.substring(6));
    let myRev = myReviews[id];
    myRev.description = document.getElementById("comment"+id).value;
    myReviews[id] = myRev;
    const response = await client.updateReviews(oldReviews, myReviews);
    document.getElementById("allReviews").innerText = "";
    loadReviews(document.getElementById("allReviews"));
    return;
}*/

async function loadReviews(element){
    element.innerText = "";
    myReviews = await client.userRatings(orig_user.username);
    for (let i = 0; i < myReviews.length; i++){
        if(myReviews[i] != null){
            element.appendChild(renderReview(myReviews[i], i));
        }
    }
    return;
}

/*delete review removed.
async function deleteReview(element){
    let id = element.id;
    id = parseInt(id.substring(6));
    const response = await client.deleteReview(orig_user.username, myReviews[id]);
    delete myReviews[id];
    document.getElementById("allReviews").innerText = "";
    loadReviews(document.getElementById("allReviews"));
    return;
}*/

document.getElementById("smallSearch").addEventListener("click", () => {
    redirectToResults(document.getElementById("smallInput").value);
});

function redirectToResults(querry){
    window.location.href = "resultsPage.html?search=" + querry;
}