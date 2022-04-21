APIs supported by the server:

1. courseRatings:
   -   Get
   -   Param: courseName & uniName
   -   Returns a list of all the course ratings for a given course and university name
   -   The returned object is a json file with required fields

2. uniRatings:
   - Get
   - Param: uniName
   - all courses that have a review under a University name

3. userRatings:
   - Get
   - Param: username
   - Returns list of all reviews made by a user

4. updateUser:
   - Put
   - Param: userName
   - Body: {
            username: xyz,
            newuser: abc,
            email: pqr,
            password: uvz
        }
   - Updates a user's info and sends status of whether the update was a success or a failure.

5. updateReviews:
   - Put
   - Param: userName
   - Body: review object
   - Updates the review and sends status of whether the update was a success or a failure.

6. unis:
   - Get
   - Param: query
   - Returns all matching university in database that match with the querry

7. courses:
   - Get
   - Param: courseName
   - Returns all matching courses in the database that match with the querry

8. userProfile:
   - Get
   - Param: userName
   - Returns the profile details of a user

9. createReview:
    - Post
    - Body: review object
    - Creates a new review in the database and sends status of whether the create was a success or a failure.

10. deleteReview:
    - DELETE
    - Param: userName
    - Body: review object
    - Deletes the specified review object under the userName and sends status of whether the delete was a success or a failure.