import * as client from "../client.js";

const url = window.location.href;
const query = new URLSearchParams(url.substring(url.indexOf("?"), url.length));

const courseArr = await client.uniList(query);
const uniArr = await client.uniCourses(query);

function displayResults() {
    courseArr.forEach((element) => {
        courseRender(element)
    });
    uniArr.forEach((element) => {
        uniRender(element)
    });
}

const courseRender = (result) => {
    const div = document.getElementById("coruseDiv");
    div.classList.add("courseCard");

    const body = document.createElement("p");
    body.innerText = result;

    div.appendChild(body);
} 

const uniRender = (result) => {
    const div = document.getElementById("uniDiv");
    div.classList.add("courseCard");

    const body = document.createElement("p");
    body.innerText = result;

    div.appendChild(body);
} 

displayResults();