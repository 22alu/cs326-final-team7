import * as client from "../client.js";

const url = window.location.href;
const query = new URLSearchParams(url.substring(url.indexOf("?"), url.length));
const uniName = query.get("uniName");

const arr = await client.uniList(uniName);

function displayResults() {
    arr.forEach((element) => {
        resultsRender(element)
    })
}
const resultsRender = (result) => {
    const div = document.getElementById("div");
    div.classList.add("courseCard");

    const body = document.createElement("p");
    body.innerHTML = result;
    
    div.appendChild(body);
} 

displayResults();