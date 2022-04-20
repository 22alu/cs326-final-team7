import * as client from "../client.js";

const search = document.getElementById("search-button");
const login = document.getElementById("login");
const sort = document.getElementById("sort");

const url = window.location.href;
const querry = new URLSearchParams(url.substring(url.indexOf("?"), url.length));
const uniName = querry.get("uniName");

const arr = await client.courseRatings(uniName);

login.addEventListener("click", () => {
  window.location = "http://3000/Client/profilepage.html";
});

sort.addEventListener("change", function (event) {
  if (sort.value == "mostLikes") {
    sortStar(1);
  } else if (sort.value == "leastLikes") {
    sortStar(-1);
  } else if (sort.value == "mostRatings") {
    sortRatings(1);
  } else if (sort.value == "leastRatings") {
    sortRatings(-1);
  }
  document.getElementById("cardRatings").innerHTML = "";
  displayRatings();
});

function displayRatings() {
  arr.forEach((element) => {
    courseRender(element);
  });
}

function sortRatings(coef) {
  arr.sort(function (x, y) {
    return coef * (parseInt(y.numRatings) - parseInt(x.numRatings));
  });
}

function sortStar(coef) {
  arr.sort(function (x, y) {
    return coef * (parseInt(y.overallRatings) - parseInt(x.overallRatings));
  });
}

const courseRender = (course) => {
  const cardRatings = document.getElementById("cardRatings");

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  rowDiv.classList.add("courseCard");

  const colDiv = document.createElement("div");
  colDiv.classList.add("col-6");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const cardHeader = document.createElement("p");
  cardHeader.classList.add("card-header");
  cardHeader.classList.add("text-dark");
  cardHeader.innerText = course.courseNumber;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const bodyRow = document.createElement("div");
  bodyRow.classList.add("row");

  const bodyNameBox = document.createElement("div");
  bodyNameBox.classList.add("col-10");

  const bodyName = document.createElement("h5");
  bodyName.classList.add("card-title");
  bodyName.classList.add("text-black");
  bodyName.innerText = course.courseName;

  const bodyRatingNum = document.createElement("a");
  bodyRatingNum.innerHTML = course.numRatings + " ratings";

  const bodyStarCol = document.createElement("div");
  bodyStarCol.classList.add("col-2");
  bodyStarCol.classList.add("courseStars");

  const rateContent = document.createElement("a");
  const rate = document.createElement("a");
  rate.innerHTML = course.overallRatings;

  const icon = document.createElement("i");
  icon.classList.add("bi");
  icon.classList.add("bi-star-fill");

  bodyNameBox.appendChild(bodyName);
  bodyNameBox.appendChild(bodyRatingNum);

  rateContent.appendChild(rate);
  rateContent.appendChild(icon);
  bodyStarCol.appendChild(rateContent);

  bodyRow.appendChild(bodyNameBox);
  bodyRow.appendChild(bodyStarCol);

  cardBody.appendChild(bodyRow);

  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardBody);

  colDiv.appendChild(cardDiv);

  rowDiv.appendChild(colDiv);

  cardRatings.appendChild(rowDiv);
};

displayRatings();
