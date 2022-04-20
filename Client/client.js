//All API calls will be made here.
//Example:
// export async function readCounter(name) {
//   try {
//     const response = await fetch(`/read?name=${name}`, {
//       method: "GET",
//     });
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function courseRatings(courseName, UniName) {
  try {
    const response = await fetch(
      `/courseRatings?course=${courseName}&uniName=${UniName}`,
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

export async function uniRatings(uniName) {
  try {
    const response = await fetch(
      `/courseRatings?uniName=${uniName}`,
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