let myReviews = [];

let orig_user = "Muhammad"; 
document.getElementById("logout").addEventListener("click", logout);
document.getElementById("login").addEventListener("click", login);

if(window.localStorage.getItem("login") === true){
    login();
}else{
    logout();
}

function logout(){
    window.localStorage.setItem("login", false);
    document.getElementById("welcomeUser").innerHTML = "Muhammad's Profile";
    document.getElementById("UserNameInputBox").style.display = "none";
    document.getElementById("emailInputBox").style.display = "none";
    document.getElementById("passwordInputBox").style.display = "none";
    document.getElementById("commentHeader").innerHTML = orig_user + "'s Reviews";
    document.getElementById("profileEdit").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function login(){
    window.localStorage.setItem("login", true);
    document.getElementById("welcomeUser").innerHTML = "Welcome Muhammad";
    document.getElementById("UserNameInputBox").style.display = "block";
    document.getElementById("emailInputBox").style.display = "block";
    document.getElementById("passwordInputBox").style.display = "block";
    document.getElementById("commentHeader").innerHTML = "Your Reviews";
    document.getElementById("profileEdit").style.display = "block";
    document.getElementById("logout").style.display = "block";
    document.getElementById("login").style.display = "none";
}

function updateProfile(){

    let username = document.getElementById("UserNameInputBox");
    username.disabled = false;
    let email = document.getElementById("emailInputBox");
    email.disabled = false;
    let password = document.getElementById("passwordInputBox");
    password.disabled = false;

    editButton = document.getElementById("profileEdit");
    editButton.innerHTML = "Save";
    editButton.removeEventListener("click", updateProfile());
    editButton.addEventListener("click", saveProfile());

    let mypass = window.prompt("Please input your current password to verify this change.");
    if(mypass == client.getPassword()){
        saveProfile();
    }else{
        window.alert("Incorrect password. Please try again.");
    }
    return false;
}

function saveProfile(){
    let username = document.getElementById("UserNameInputBox").value;
    let email = document.getElementById("emailInputBox").value;
    let password = document.getElementById("passwordInputBox").value;

    server.updateUser(orig_user, username, email, password);
    document.getElementById("profileEdit").addEventListener("click", updateProfile());
    document.getElementById("profileEdit").removeEventListener("click", saveProfile());
    document.reload();
}

function renderReview(review, id){
    let theReview = document.createElement("div");

    let courseName = document.createElement("p");
    courseName.innerHTML = review.courseName;
    
    let rating = document.createElement("div");
    rating.innerHTML = review.rating;
    
    let comment = document.createElement("text-area");
    comment.setAttribute("id", "comment"+id);
    comment.setAttribute("rows", 3);
    comment.disabled = true;
    comment.innerHTML = review.comment;

    let edit = document.createElement("button");
    edit.classList.add("btn btn-primary");
    edit.classList.add("bi bi-pen")
    edit.innerHTML = "Edit";
    edit.addEventListener("click", editReview(this));
    
    let delBtn = document.createElement("button");
    delBtn.classList.add("btn btn-primary");
    delBtn.classList.add("bi bi-x color");
    delBtn.innerHTML = "Delete";
    delBtn.addEventListener("click", deleteReview(this.parent));
    
    theReview.append(edit);
    theReview.append(delBtn);

    theReview.setAttribute("id", "review"+id);

    return theReview;
}

function editReview(element){
    element.innerHTML = "Save";
    element.removeEventListener("click", editReview(element));
    element.addEventListener("click", saveReview(element.parentElement));

    let id = element.parentElement.id;
    let comment = document.getElementById("comment"+id);
    comment.disabled = false;
}

function saveReview(element){
    let id = element.parentElement.id;
    id = parseInt(id.substring(6));
    myRev = myReviews[id];
    myRev.comment = document.getElementById("comment"+id).value;
    myReviews[id] = myRev;

}

function loadReviews(element){
    myReviews = client.getUserReviews();
    for (let i = 0; i < myReviews.length; i++){
        element.append(renderReview(myReviews[i]), i);
    }
}

function deleteReview(element){
    let id = element.parentElement.id;
    id = parseInt(id.substring(6));
    client.deleteReview(myReviews[id]);
    document.getElementById("allReviews").innerHTML = "";
    loadReviews(document.getElementById("allReviews"));
}