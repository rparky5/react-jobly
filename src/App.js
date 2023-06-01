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
  const [token, setToken] = useState("");

  useEffect(function getUserOnLogin() {
    async function getUser() {
      const decoded = jwt_decode(token);
      try {
        const user = await JoblyApi.getUser(decoded.username);
        setUser(user);
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
    try {
      const newToken = await JoblyApi.login(username, password);
      setToken(newToken);
    } catch (err) {
      setError(err);
    }
  }


  async function signup(user) {
    try {
      const signupRes = await JoblyApi.signup(user);
      setToken(signupRes);
    } catch (err) {
      setError(err);
    }
  }

  function logout() {
    setToken('');
  }

  async function updateProfile(updatedData) {
    try {
      const updateRes = await JoblyApi.updateProfile(user.username, updatedData);
      setUser(updateRes);
    } catch (err) {
      setError(err);
    }
  }

  // TODO: dynamic errors
  if (error) return <Navigate to={`/${error.status}`} />;

  return (
    <div className="App">
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Nav logout={logout} />
          <RoutesList login={login} signup={signup} updateProfile={updateProfile} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
