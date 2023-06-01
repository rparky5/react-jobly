import "./App.css";
import { useState, useEffect, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import Nav from "./Nav";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";


function App() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(
    function getUserOnLogin() {
      async function getUser() {
        const decoded = jwt_decode(token);
        try {
          const user = await JoblyApi.getUser(decoded.username);
          setUser(user);
        } catch (err) {
          setError(err);
        }
      }
      getUser();
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

  // requires username, password, firstName, lastName, email
  async function signup(user) {}
  // requires firstName, lastName, password, email
  async function updateProfile(user) {}

  
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <RoutesList />
      </BrowserRouter>
    </div>
  );
}

export default App;
