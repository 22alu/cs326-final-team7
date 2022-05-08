import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class RatingsTable {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    // Create a new Pool. The Pool manages a set of connections to the database.
    // It will keep track of unused connections, and reuse them when new queries
    // are needed. The constructor requires a database URL to make the
    // connection. You can find the URL of your database by looking in Heroku
    // or you can run the following command in your terminal:
    //
    //  heroku pg:credentials:url -a APP_NAME
    //
    // Replace APP_NAME with the name of your app in Heroku.
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });

    // Create the pool.
    this.client = await this.pool.connect();

    // Init the database.
    await this.init();
  }

  async init() {
    const queryText = `
      create table if not exists ratings (
        "id" integer GENERATED ALWAYS AS IDENTITY primary key,
        "userName" varchar(30),
        "description" varchar(280),
        "rate" integer,
        "courseID" varchar(15),
        "courseName" varChar(30),
        "uniName" varchar(30)
      );

      create table if not exists users (
        "userName" varchar(30) primary key,
        "password" varchar(30),
      );
    `;
    const res = await this.client.query(queryText);
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }

  // Register username and password
  async registerUser(username, password) {
    const queryText = 'INSERT INTO users ("userName", password) VALUES ($1, $2)';
    const res = await this.client.query(queryText, [username, password]);
    return res.rows;
  }

  // Return user if exists
  async findUser(username) {
    const queryText = 'SELECT "userName" FROM users WHERE "userName" = $1';
    const res = await this.client.query(queryText, [username]);
    return res.rows;
  }

  // Return password
  async attemptLogin(username) {
    const queryText = 'SELECT password FROM users WHERE "userName" = $1';
    const res = await this.client.query(queryText, [username]);
    return res.rows;
  }

  // Read uni names that contains query
  async uniStartingWith(uniStart) {
    const queryVal = "%" + String(uniStart) + "%";
    const queryText =
      'SELECT "uniName" FROM ratings WHERE ("uniName" LIKE ($1))';
    const res = await this.client.query(queryText, [queryVal]);
    return res.rows;
  }

  // Read course names that ratet contain query
  async courseNameStartingWith(nameStart) {
    const queryVal = "%" + String(nameStart) + "%";
    const queryText =
      'SELECT "courseName" FROM ratings WHERE ("courseName" LIKE ($1))';
    const res = await this.client.query(queryText, [queryVal]);
    return res.rows;
  }

  // Read course ids that ratet contain query
  async courseIDStartingWith(nameStart) {
    const queryVal = "%" + String(nameStart) + "%";
    const queryText =
      'SELECT "courseID" FROM ratings WHERE ("courseID" LIKE ($1))';
    const res = await this.client.query(queryText, [queryVal]);
    return res.rows;
  }

  // INSERT a review entry into the table
  async addRating(userName, desc, rate, courseID, courseName, uniName) {
    const queryText =
      'INSERT INTO ratings ("userName", "description", "rate", "courseID", "courseName", "uniName") VALUES ($1, $2, $3, $4, $5, $6)';
    const res = await this.client.query(queryText, [userName, desc, rate, courseID, courseName, uniName]);
    return res;
  }

  // Get all ratings from a user.
  async allUserRatings(user) {
    const queryText =
      'SELECT * FROM ratings WHERE ("userName" LIKE ($1))';
    const res = await this.client.query(queryText, [user]);
    return res.rows;
  }

  // Update Description of a rating
  async updateRating(ratingID, desc) {
    const queryText =
      'UPDATE ratings description = ($1) WHERE ("id" LIKE ($2))';
    const res = await this.client.query(queryText, [desc, ratingID]);
    return res.rows;
  }

  // Delete a rating from user
  async deleteRating(ratingID) {
    const queryText =
      'DELETE FROM ratings WHERE ("id"=($1))';
    const res = await this.client.query(queryText, [ratingID]);
    return res;
  }

  async ratingUnderCourse(courseID){
    const queryText =
      'SELECT * FROM ratings WHERE ("courseID" LIKE ($1))';
    const res = await this.client.query(queryText, [courseID]);
    return res.rows;
  }

  async ratingUnderUni(uniName){
    const queryText =
      'SELECT * FROM ratings WHERE ("uniName" LIKE ($1))';
    const res = await this.client.query(queryText, [uniName]);
    return res.rows;
  }

  async ratingUnderUser(userName){
    const queryText =
      'SELECT * FROM ratings WHERE ("userName" LIKE ($1))';
    const res = await this.client.query(queryText, [userName]);
    return res.rows;
  }
}
