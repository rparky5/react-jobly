import { Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";

/** Nav component for nav bar
 *
 * BrowserRouter -> Nav -> Link
 */

export default function Nav({ logout }) {
  const user = useContext(userContext);
  const navigate = useNavigate();

  function loggedOutNav() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </li>
      </ul>
    );
  }

  function loggedInNav() {
    function handleLogout() {
      logout();
      navigate("/");
    }

    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/companies">
            Companies
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={handleLogout}>
            Logout {user.username}
          </button>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Jobly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {!user && loggedOutNav()}
          {user && loggedInNav()}
        </div>
      </div>
    </nav>
  );
}
