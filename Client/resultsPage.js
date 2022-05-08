import * as client from "./client.js";

const url = window.location.href;
const urlQuerry = new URLSearchParams(url.substring(url.indexOf("?"), url.length));
const searchQuerry = urlQuerry.get('search')

const uniArr = await client.uniList(searchQuerry);
const courseArr = await client.courseList(searchQuerry);

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
    linkNode.setAttribute('href', "courseSearchPage.html?course=" + result);
    linkNode.appendChild(body);

    div.appendChild(linkNode);
} 

const uniRender = (result) => {
    console.log(result);
    const div = document.getElementById("uniDiv");
    div.classList.add("courseCard");

    const body = document.createElement("p");
    body.innerText = result;

    const linkNode = document.createElement("a");
    linkNode.setAttribute('href', "uniSearchPage.html?uniName=" + result);
    linkNode.appendChild(body);

    div.appendChild(linkNode);
} 

displayResults();

document.getElementById("smallSearch").addEventListener("click", () => {
    redirectToResults(document.getElementById("smallInput").value);
});

function redirectToResults(querry){
    console.log(querry);
    window.location.href = "resultsPage.html?search=" + querry;
}