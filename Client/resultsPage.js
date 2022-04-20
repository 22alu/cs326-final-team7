import * as client from "./client.js";

const url = window.location.href;
const urlQuerry = new URLSearchParams(url.substring(url.indexOf("?"), url.length));
const searchQuerry = urlQuerry.get('search')

const courseArr = await client.uniList(searchQuerry);
const uniArr = await client.courseList(searchQuerry);

function displayResults() {
    courseArr.forEach((element) => {
        courseRender(element)
    });
    uniArr.forEach((element) => {
        uniRender(element)
    });
}

const courseRender = (result) => {
    const div = document.getElementById("courseDiv");
    div.classList.add("courseCard");

    const body = document.createElement("p");
    body.innerText = result;
    
    const linkNode = document.createElement("a");
    linkNode.setAttribute('href', "uniSearchPage.html?uniName=" + result);
    linkNode.appendChild(body);

    div.appendChild(linkNode);
} 

const uniRender = (result) => {
    const div = document.getElementById("uniDiv");
    div.classList.add("courseCard");

    const body = document.createElement("p");
    body.innerText = result;

    const linkNode = document.createElement("a");
    linkNode.setAttribute('href', "courseSearchPage.html?courseName=" + result.split(' ').slice(1,result.length).join(" ") + "&uniName=" + result.split(' ')[0]);
    linkNode.appendChild(body);

    div.appendChild(linkNode);
} 

displayResults();