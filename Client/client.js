export async function courseRatings(courseID, uniName) {
    try {
        const response = await fetch(
            `/courseRatings?course=${courseID}`,
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

export async function uniList(query) {
    try {
        const response = await fetch(`/unis?query=${query}`, {
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
    const response = await fetch(`/updateUser?userName=${username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            newuser: newuser,
            email: email,
            password: password
        }),
    });
    const data = await response.json();
    return data;
}

export async function deleteReview(id) {
  try {
      const response = await fetch(`/deleteReview`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
      });
      const data = await response.json();
      return data;
  } catch (err) {
      console.log(err);
  }
}

export async function updateReviews(id, desc) {
    //to be implemented - substitute fake data for now
    const response = await fetch(`/updateReviews`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({'id': id, 'desc': desc}),
  });
  const data = await response.json();
  return data;
}

export async function createReview(rating) {
    console.log(rating);
    const response = await fetch(`/createReview`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ratingObj: rating,
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

export async function verifyUser(userName, password) {
    try {
        const response = await fetch(`/login?userName=${userName}`, {
            method: "GET",
        });
        const data = await response.json();
        if(data === password){
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

export async function registerUser(userName, password) {
    const response = await fetch(`/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: userName,
            password: password,
        }),
    });
    const data = await response.json();
    return data;
}
