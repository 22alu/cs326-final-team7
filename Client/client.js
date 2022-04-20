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

export async function createReview(courseName, uniName, rating) {
    const response = await fetch(`/createReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'courseName': courseName, 'uniName': uniName, 'rating': rating}),
    });
    const data = await response.json();
    return data;
  }

export async function uniRatings(uniName) {
  try {
    const response = await fetch(
      `/uniRatings?uniName=${uniName}`,
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

