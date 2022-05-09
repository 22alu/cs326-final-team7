import { RatingsTable } from "./ratingDB.js";
class Users {
  constructor() {
    // we use an in-memory "database"; this isn't persistent but is easy
    // default user
    
  }

  async connectToTable(){
    const dburl = process.env.DATABASE_URL;
    this.db = new RatingsTable(dburl);
    await this.db.connect();
  }

  // Returns true iff the user exists.
  async findUser(username) {
    const res = await this.db.findUser(username);
    if (res.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  // Returns true iff the password is the one we have stored (in plaintext = bad
  // but easy).
  async validatePassword(name, pwd) {
    const res = await this.findUser(name);
    if (!res) {
      return false;
    }
    const pass = await this.db.attemptLogin(name);
    if (pass !== pwd) {
      return false;
    }
    return true;
  }

  // Add a user to the "database".
  async addUser(name, pwd) {
    const res = await this.findUser(name);
    if (res) {
      return false;
    }
    await this.db.registerUser(name, pwd);
    return true;
  }
}

let user = new Users();
await user.connectToTable();
export default user;
