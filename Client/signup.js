import * as client from './client.js';

const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("register");

submit.addEventListener("onclick", regUser);

function regUser(){
    const un = username.value;
    const pw = password.value;
    await client.registerUser(un, pw);

    //TODO: implement login/logout persistency
    
    //redirect to profile page <- needs to be checked
    window.location.href = "profilePage.html";
}