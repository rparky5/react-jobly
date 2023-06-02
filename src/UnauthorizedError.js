import { Link } from "react-router-dom";
import './UnauthorizedError.css'

/** Unauthorized Error component */

export default function UnauthorizedError() {
  return (
    <div>
      <h2>Oops! Looks like you're not logged in! Please login or sign up to continue.</h2>
      <span>
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary" to="/signup">
            Signup
          </Link>
        </span>
    </div>
  )
}