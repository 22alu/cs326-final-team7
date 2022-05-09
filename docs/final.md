# Title:
### Team 7

# Subtitle:
### CourseCheck

# Application Link
### https://cs326-final-team7.herokuapp.com/Client/index.html

# Semester:
### Spring 2022

# Overview:

CourseCheck is a website for UMass students to rate and review their courses. The objective of the website is to collect and share data that will make it easier for UMass students to decide on which courses they would like to take. While websites exist to review specific professors or schools, there is no website in popular use to allow students to review specific courses. Our goal is to provide students with a straightforward and easily accessible method to learn about courses that they are considering.

# Team Members:

Andy Lu - 22alu  
Manay Patel - ManayPatel  
Muhammad Shah - muhammadshah27  
Jeffrey Wong - notjwong 

# User Interface

All pages contain a search bar to allow users to conduct searches, and a profile page button which allows users to either access their profile or attempt login.

1. Home Page
    ![alt text](./final_images/homepage.PNG)
    The above image displays the landing page, which provides some information about the website.

2. Log In
    ![alt text](./final_images/login.PNG)
    The above image displays the login page. Accessible only to users who are not logged in, users can either log in or click a link to create an account if they do not already have one.

3. Registration
    ![alt text](./final_images/register.PNG)
    The above image displays the registration page, where new users can create an account with a username and password.

4. User Profile
    ![alt text](./final_images/profilepage.PNG)
    The above image displays the user profile page. Accessible only by users who have logged in, this displays all the reviews a given user has created and allows the user to edit or delete their reviews.


5. Search Results
    ![alt text](./final_images/searchresults.PNG)
    The above image displays the search results page, which lists all universities and courses with similar names to the query.

    
6. Course Search
    ![alt text](./final_images/coursesearchpage.PNG)
    The above image displays a course page, which lists all reviews under a course. Users can sort the reviews by rating in ascending or descending order. There is also an option to create and submit a new review.


7. University Search
    ![alt text](./final_images/unisearchpage.PNG)
    The above image displays a university page, which lists all courses under a university.


8. Create Review
    ![alt text](./final_images/createreview.PNG)
    The above image displays the form for creating and submitting a review.

# APIs

1. courseRatings
    - GET
    - Parameters: courseID, uniName
    - Returns a list of all course ratings for a given course at the specified university.

2. uniList
    - GET
    - Parameters: query
    - Returns a list of all courses with at least one existing review at a specified university.

3. courseList
    - GET
    - Parameters: courseName
    - Returns all courses with names similar to the given course name.

4. userRatings
    - GET
    - Parameters: username
    - Returns all reviews made by the specified account.

5. updateUser
    - PUT
    - Parameters: username, newuser, email, password
    - Updates information associated with a specific account.

6. deleteReview
    - DELETE
    - Parameters: id
    - Deletes a given review.

7. updateReviews
    - PUT
    - Parameters: id, desc
    - Edits the content of a given review.

8. createReview
    - POST
    - Parameters: rating
    - Creates a review.

9.  uniRatings
    - GET
    - Parameters: uniname
    - All ratings under a uni

# Database

### Ratings Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | integer   | id of the review created |
| userName     | String    | name of the creating user|
| description  | String    | description of the rating|
| rate         | integer   | number of stars out of 5 |
| uniName      | String    | Name of the uni of rating|
| courseName   | String    | Name of the course       |
| courseID     | String    | courseID string (eg CS326)|

### User Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userName     | String    | User’s userName          |
| password 	   | String    | User’s Password          |

# URL Routes/Mappings

URL Routes/Mappings: A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.

/ -> /index.html
Directs to main landing page.

/profilepage -> /Client/profilepage.html?user='', /Client/login.html
Directs to the user profile page if user is logged in; directs to login page otherwise.

/login -> /Client/login.html, /Client/profilepage.html?user=''
Directs to the login page if user is not logged in; directs to user profile page otherwise.

/logout -> /login.html
Upon successful logout, redirects to the login page.

/register -> /Client/register.html, /Client/login.html
Directs to user registration page if user is not logged in and registering; directs to login page upon successful registration.

# Authentication/Authorization

Users may register an account through the registration page and be authenticated through the login process. Upon logging in, users will be able to edit reviews for courses they have made. The user's login status affects what view is displayed upon attempting to access the login page or profile page, as the login page is not accessible when currently logged in and the profile page is not accessible when logged out.

# Division of Labor

Division of Labor: A breakdown of the division of labor for each team member — that is, saying who did what, for the entire project. Remember that everyone is expected to contribute roughly equally to each phase of the project. We expect to see similar numbers and kinds of GitHub commits by each student.

### Andy Lu


### Jeffrey Wong
Implemented front end and back end for the University Search page. Deployed the app on Heroku and assisted in creating the datbase/change routing functions.

### Manay Patel
Organised the team by distributing tasks to be done per milestone. Helped structure out pages on how they have to function. Provided with templates for coding files so it's easier to distribute programming tasks. Created front end and back end support for course search page. Implemented database class and authentication functionality.

### Muhammad Shah



# Conclusion

Throughout the process of creating CourseCheck, all of us learned valuable lessons about how to delegate and coordinate tasks. In a more technical sense, we learned a lot about the fundamentals of APIs, web security, and more specifically how to utilize Bootstrap and Heroku. We encountered some difficulties deploying to Heroku, given that none of us had previous experience with it, as well as difficulties switching tracks when reworking our code to fit with secure databases rather than dummy data. It would have been useful to know from the start how uneven the pacing would be when implementing different aspects of our application, as we would have been able to organize our time more effectively.

# Rubric
