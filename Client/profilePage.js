import * as dummy_server from './dummy_server.js';

let myReviews = [];
let orig_user = '';

loadProfile("Andy");

window.localStorage.removeItem("login");

document.getElementById("log").addEventListener("click", login);
document.getElementById("profileEdit").addEventListener("click", updateProfile);

if(window.localStorage.getItem("login") === "true"){
    login();
}else{
    logout();
}

function loadProfile(username){
    let user = dummy_server.getUser(username);
    orig_user = user.username;
    let email = user.email;
    let password = user.password;
    myReviews = dummy_server.getUserReviews(username);

    document.getElementById("welcomeUser").innerHTML = orig_user + "'s Profile";
    document.getElementById("UserNameInputBox").value = orig_user;
    document.getElementById("emailInputBox").value = email;
    document.getElementById("passwordInputBox").value = password;
    loadReviews(document.getElementById("allReviews"));
    return;
}

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

function updateProfile(){

    let username = document.getElementById("UserNameInputBox");
    username.disabled = false;
    let email = document.getElementById("emailInputBox");
    email.disabled = false;
    let password = document.getElementById("passwordInputBox");
    password.disabled = false;

    let editButton = document.getElementById("profileEdit");
    editButton.innerHTML = "Save";
    editButton.removeEventListener("click", updateProfile);
    editButton.addEventListener("click", saveProfile);
}

function saveProfile(){
    let mypass = window.prompt("Please input your current password to verify this change.");
    if(mypass == dummy_server.getPassword(orig_user)){
        let username = document.getElementById("UserNameInputBox");
        let email = document.getElementById("emailInputBox");
        let password = document.getElementById("passwordInputBox");
        document.getElementById("profileEdit").addEventListener("click", updateProfile);
        document.getElementById("profileEdit").removeEventListener("click", saveProfile);
        dummy_server.updateUser(orig_user, username.value, email.value, password.value);
        orig_user = username.value;
        loadProfile(username.value);

        let editButton = document.getElementById("profileEdit");
        editButton.innerHTML = "Edit";
        editButton.addEventListener("click", updateProfile);
        editButton.removeEventListener("click", saveProfile);

        username.disabled = true;
        email.disabled = true;
        password.disabled = true;
    }else{
        window.alert("Incorrect password. Please try again.");
    }
    return false;
}

function renderReview(review, id){
    console.log(id);
    let theReview = document.createElement("div");

    let courseName = document.createElement("p");
    courseName.innerHTML = "Course: " + review.courseName;
    
    let rating = document.createElement("p");
    rating.innerHTML = "Rating: " + review.rating;

    let university = document.createElement("p");
    university.innerHTML = "University: " + review.university;
    
    let comment = document.createElement("textarea");
    comment.setAttribute("id", "comment"+id);
    comment.setAttribute("rows", 3);
    comment.disabled = true;
    comment.innerHTML = review.comment;

    let edit = document.createElement("button");
    edit.innerHTML = "Edit";
    edit.addEventListener("click", function() {editReview(this)});
    
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.addEventListener("click", function() {deleteReview(this.parentElement)});
    
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
    let id = element.id;
    console.log(id);
    id = parseInt(id.substring(6));
    console.log(id);
    let myRev = myReviews[id];
    myRev.comment = document.getElementById("comment"+id).value;
    myReviews[id] = myRev;
    updateBack();
    document.getElementById("allReviews").innerHTML = "";
    loadReviews(document.getElementById("allReviews"));
    return;
}

function updateBack(){
    dummy_server.updateReviews(myReviews);
}

function loadReviews(element){
    element.innerHTML = "";
    myReviews = dummy_server.getUserReviews(orig_user);
    for (let i = 0; i < myReviews.length; i++){
        if(myReviews[i] != null){
            element.appendChild(renderReview(myReviews[i], i));
        }
    }
    return;
}

function deleteReview(element){
    let id = element.id;
    id = parseInt(id.substring(6));
    delete myReviews[id];
    updateBack();
    document.getElementById("allReviews").innerHTML = "";
    loadReviews(document.getElementById("allReviews"));
    console.log(myReviews);
    return;
}