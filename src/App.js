import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import RoutesList from "./RoutesList";
import Nav from "./Nav";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";
import userContext from "./userContext";

function App() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoading, setIsLoading] = useState(token && !user);

  useEffect(
    function updateLocalStorage() {
      token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
    },
    [token]
  );

  useEffect(
    function getUserOnLoginOrSignup() {
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
    },
    [token]
  );

  async function login({ username, password }) {
    const newToken = await JoblyApi.login(username, password);
    setToken(newToken);
    setIsLoading(true);
  }

  async function signup(user) {
    const signupRes = await JoblyApi.signup(user);
    setToken(signupRes);
    setIsLoading(true);
  }

  function logout() {
    setToken("");
  }

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
