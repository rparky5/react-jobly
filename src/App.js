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

  useEffect(function getTokenOnMount() {
    function getToken() {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      JoblyApi.token = storedToken;
    }
    getToken();
  }, []);

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
  }, [token]);


  async function login({ username, password }) {
    const newToken = await JoblyApi.login(username, password);
    setToken(newToken);
  }


  async function signup(user) {
    const signupRes = await JoblyApi.signup(user);
    setToken(signupRes)
  }

  function logout() {
    setToken('');
    localStorage.removeItem("token");
  }

  async function updateProfile(updatedData) {
    const updateRes = await JoblyApi.updateProfile(user.username, updatedData);
    setUser(updateRes);
  }


  // TODO: dynamic errors
  if (error) return <Navigate to={`/404`} />;
  if (token) localStorage.setItem("token", token);

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
