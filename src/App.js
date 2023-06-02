import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import RoutesList from "./RoutesList";
import Nav from "./Nav";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";
import userContext from "./userContext";

/** App component for Jobly application.
 *
 * State:
 * - error: any errors that occur while pinging server
 * - user: current user logged into app
 * - token: user token from api
 * - isLoading: true if retrieving user data from api
 *
 * App -> BrowserRouter
 */

function App() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoading, setIsLoading] = useState(token && !user);

  useEffect(function updateLocalStorage() {
    token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
  }, [token]);

  useEffect(function getUserOnLoginOrSignup() {
    async function getUser() {
      JoblyApi.token = token;
      const decoded = jwt_decode(token);
      try {
        const user = await JoblyApi.getUser(decoded.username);
        setUser(user);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    }

    if (!token) {
      setUser(null);
    } else {
      getUser();
    }
  }, [token]);

  // user login function. sets token to token from api response
  async function login({ username, password }) {
    const newToken = await JoblyApi.login(username, password);
    setToken(newToken);
    setIsLoading(true);
  }

  // user signup function. sets token to token from api response
  async function signup(user) {
    const signupRes = await JoblyApi.signup(user);
    setToken(signupRes);
    setIsLoading(true);
  }

  // user logout function. sets token to empty string
  function logout() {
    setToken("");
  }

  // user profile update function. sets user with updated data
  async function updateProfile(updatedData) {
    const updateRes = await JoblyApi.updateProfile(user.username, updatedData);
    setUser(updateRes);
  }

  if (error) return <Navigate to={`/500`} />;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="App">
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Nav logout={logout} />
          <RoutesList
            login={login}
            signup={signup}
            updateProfile={updateProfile}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
