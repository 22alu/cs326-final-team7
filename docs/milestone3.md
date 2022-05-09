# Tables Used in the Database

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

# Divison of labor

### Andy Lu:
Implemented database table and CRUD operations involving account registration and authentication. Filled out routing functions involving these CRUD operations. Created registration page.

### Jeffrey Wong:


### Manay Patel:
Created and implemented database class to work with CRUD operations on _reviews_. Filled out routing functions to use this database class. Refactored front end to work properly with the newly implemented backend. Added log in authentication to the site.

### Muhammad Shah:
