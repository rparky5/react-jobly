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
  static token;

  /** base api request function */
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
    let res = await this.request(`auth/token`, {username, password}, "post");
    this.token = res.token;
    return res.token;
  }

   /** Signup a user.
   *  {username, password, firstName, lastName, email} -> {token}
   */
  static async signup(user) {
    console.log("user", user)
    let res = await this.request(`auth/register`, user, "post");
    this.token = res.token;
    return res.token;
  }

   /** Update a user profile.
   *  {username, firstName, lastName, password, email} -> {user}
   */
  static async updateProfile(username, updatedData) {
    let res = await this.request(`users/${username}`, updatedData, "patch");
    return res.user;
  }

  /** Get a user.
   *  {username, token} -> {user}
   */
  static async getUser(username) {

    let res = await this.request(`users/${username}`, {token: this.token});
    return res.user;
  }
}
