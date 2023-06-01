import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export default class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log("error from (non)response=", err);
      if (err.response) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
      }
      throw new Error(err.message);
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of all companies.
   *  Optional filter queries of minEmployees, maxEmployees, nameLike
   */
  static async getAllCompanies(params = {}) {
    let res = await this.request(`companies`, params);
    return res.companies;
  }

  /** Get list of all jobs.
   *  Optional filter queries of minSalary, hasEquity, title
   */
  static async getAllJobs(params = {}) {
      let res = await this.request(`jobs`, params);
      return res.jobs;
  }

  /** Login a user.
   *  {username, password} -> {token}
   */
  static async login(username, password) {
    let res = await this.request(`/auth/token`, {username, password}, "post");
    return res.token;
  }

   /** Signup a user.
   *  {username, password, firstName, lastName, email} -> {token}
   */
  static async signup(user) {
    let res = await this.request(`/auth/register`, user, "post");
    return res.token;
  }

   /** Update a user profile.
   *  {username, firstName, lastName, password, email} -> {user}
   */
  static async updateProfile(user) {
    const username = user.username;
    delete user.username;
    let res = await this.request(`/users/${username}`, user, "patch");
    return res.user;
  }

  /** Get a user.
   *  {token} -> {user}
   */
  static async getUser(token) {
    let res = await this.request(`/users/${username}`, {token});
    return res.user;
  }
}
