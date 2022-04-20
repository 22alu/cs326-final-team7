import * as client from './client.js';

//empty array of reviews, empty string username.
let myReviews = [];
let orig_user = {};

//demo profile, however we use fakedata. by default the user is logged out.
loadProfile("Andy");

//activate login/logout buttons. activate edit-profile button (though by default this is hidden)
document.getElementById("log").addEventListener("click", login);
document.getElementById("profileEdit").addEventListener("click", updateProfile);

//function to load the profile page.
function loadProfile(username){
    //get profile information
    let user = client.userProfile(username);
    orig_user = user;
    let myname = user.username;
    let email = user.email;
    let password = user.password;
    myReviews = client.userRatings(username);

    //check if logged in/out. update html
    if(window.localStorage.getItem("login") === "true"){
        login();
    }else{
        logout();
    }

    //fill in info. not displayed when logged out but still not secure, to be fixed later
    document.getElementById("UserNameInputBox").value = myname;
    document.getElementById("emailInputBox").value = email;
    document.getElementById("passwordInputBox").value = password;

    //display reviews.
    loadReviews(document.getElementById("allReviews"));

    return;
}

//toggle visibility + usage of login/out button
function logout(){
    window.localStorage.setItem("login", "false");
    document.getElementById("welcomeUser").innerHTML = orig_user + "'s Profile";
    document.getElementById("UserNameInputBox").style.display = "none";
    document.getElementById("userLabel").style.display = "none";
    document.getElementById("emailInputBox").style.display = "none";
    document.getElementById("emailLabel").style.display = "none";
    document.getElementById("passwordInputBox").style.display = "none";
    document.getElementById("pwLabel").style.display = "none";
    document.getElementById("commentHeader").innerHTML = orig_user + "'s Reviews";
    document.getElementById("profileEdit").style.display = "none";
    document.getElementById("log").innerHTML = "Log In";
    document.getElementById("log").removeEventListener("click", logout);
    document.getElementById("log").addEventListener("click", login);
    return;
}

//toggle visibility + usage of login/out button
function login(){
    window.localStorage.setItem("login", "true");
    document.getElementById("welcomeUser").innerHTML = "Welcome " + orig_user;
    document.getElementById("UserNameInputBox").style.display = "block";
    document.getElementById("userLabel").style.display = "block";
    document.getElementById("emailInputBox").style.display = "block";
    document.getElementById("emailLabel").style.display = "block";
    document.getElementById("passwordInputBox").style.display = "block";
    document.getElementById("pwLabel").style.display = "block";
    document.getElementById("commentHeader").innerHTML = "Your Reviews";
    document.getElementById("profileEdit").style.display = "block";
    document.getElementById("log").innerHTML = "Log Out";
    document.getElementById("log").addEventListener("click", logout);
    document.getElementById("log").removeEventListener("click", login);
    return;
}

//change profile info
function updateProfile(){
    //enable input boxes
    let username = document.getElementById("UserNameInputBox");
    username.disabled = false;
    let email = document.getElementById("emailInputBox");
    email.disabled = false;
    let password = document.getElementById("passwordInputBox");
    password.disabled = false;

    //toggle functionality of edit/save button
    let editButton = document.getElementById("profileEdit");
    editButton.innerHTML = "Save";
    editButton.removeEventListener("click", updateProfile);
    editButton.addEventListener("click", saveProfile);
}

//save profile info
function saveProfile(){
    //verify
    let mypass = window.prompt("Please input your current password to verify this change.");

    if(mypass === orig_user.password){
        //get new or unchanged properties
        let username = document.getElementById("UserNameInputBox");
        let email = document.getElementById("emailInputBox");
        let password = document.getElementById("passwordInputBox");

        //change backend info for user, update global user variable
        client.updateUser(orig_user.username, username.value, email.value, password.value);
        orig_user = client.userProfile(username.value);

        //reload profile
        loadProfile(username.value);

        //toggle edit/save button
        let editButton = document.getElementById("profileEdit");
        editButton.innerHTML = "Edit";
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
}

//display a single review
function renderReview(review, id){
    let theReview = document.createElement("div");

    //display some info
    let courseName = document.createElement("p");
    courseName.innerHTML = "Course: " + review.courseName;
    
    let rating = document.createElement("p");
    rating.innerHTML = "Rating: " + review.rating;

    let university = document.createElement("p");
    university.innerHTML = "University: " + review.university;
    
    //create comment area
    let comment = document.createElement("textarea");
    comment.setAttribute("id", "comment"+id);
    comment.setAttribute("rows", 3);
    comment.disabled = true;
    comment.innerHTML = review.comment;

    //create edit + delete buttons
    let edit = document.createElement("button");
    edit.innerHTML = "Edit";
    edit.addEventListener("click", function() {editReview(this)});
    
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
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
    element.innerHTML = "Save";
    element.removeEventListener("click", function() { editReview(this)});
    element.addEventListener("click", function() {saveReview(this.parentElement)} );

    let id = element.parentElement.id;
    id = parseInt(id.substring(6));
    console.log(id);
    let comment = document.getElementById("comment"+id);
    console.log(comment);
    comment.disabled = false;
    return;
}

function saveReview(element){
    let oldReviews = JSON.parse(JSON.stringify(myReviews));
    let id = element.id;
    id = parseInt(id.substring(6));
    console.log(id);
    let myRev = myReviews[id];
    myRev.comment = document.getElementById("comment"+id).value;
    myReviews[id] = myRev;
    client.updateReviews(oldReviews, myReviews);
    document.getElementById("allReviews").innerHTML = "";
    loadReviews(document.getElementById("allReviews"));
    return;
}

function loadReviews(element){
    element.innerHTML = "";
    myReviews = client.userRatings(orig_user);
    for (let i = 0; i < myReviews.length; i++){
        if(myReviews[i] != null){
            element.appendChild(renderReview(myReviews[i], i));
        }
    }
    return;
}

function deleteReview(element){
    let oldReviews = JSON.parse(JSON.stringify(myReviews));
    let id = element.id;
    id = parseInt(id.substring(6));
    delete myReviews[id];
    client.updateReviews(oldReviews, myReviews);
    document.getElementById("allReviews").innerHTML = "";
    loadReviews(document.getElementById("allReviews"));
    console.log(myReviews);
    return;
}