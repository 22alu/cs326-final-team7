document.getElementById("bigSearch").addEventListener("click", () => {
    redirectToResults(document.getElementById("bigInput").value);
});

document.getElementById("smallSearch").addEventListener("click", () => {
    redirectToResults(document.getElementById("smallInput").value);
});

function redirectToResults(querry){
    console.log(querry);
    window.location.href = "resultsPage.html?search=" + querry;
}