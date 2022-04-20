export async function courseRatings(courseName, uniName) {
    try {
        const response = await fetch(
            `/courseRatings?course=${courseName}&uniName=${uniName}`,
            {
                method: "GET",
            }
        );
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function uniCourses(UniName) {
    try {
        const response = await fetch(`/uniCourses?uniName=${UniName}`, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function uniList(UniName) {
    try {
        const response = await fetch(`/unis?uniName=${UniName}`, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function courseList(courseName) {
    try {
        const response = await fetch(`/courses?courseName=${courseName}`, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
export async function userRatings(username) {
    try {
        const response = await fetch(`/userRatings?username=${username}`, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function userProfile(username) {
    try {
        const response = await fetch(`/userProfile?userName=${username}`, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUser(username, newuser, email, password) {
    //to be implemented - substitute fake data for now
    const response = await fetch(`/updateUser?userName=${userName}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            newuser: newuser,
            email: email,
            password: password,
        }),
    });
    const data = await response.json();
    return data;
}

export async function deleteReview(username, review) {
  try {
      const response = await fetch(`/deleteReview?userName=${username}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      const data = await response.json();
      return data;
  } catch (err) {
      console.log(err);
  }
}

export async function updateReviews(userName, newReviews) {
    //to be implemented - substitute fake data for now
    const response = await fetch(`/updateReviews?userName=${userName}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newReviews),
  });
  const data = await response.json();
  return data;
}

export async function createReview(courseName, uniName, rating) {
    const response = await fetch(`/createReview`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            courseName: courseName,
            uniName: uniName,
            rating: rating,
        }),
    });
    const data = await response.json();
    return data;
}

export async function uniRatings(uniName) {
    try {
        const response = await fetch(`/uniRatings?uniName=${uniName}`, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
