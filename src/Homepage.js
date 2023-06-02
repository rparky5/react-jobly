import { useContext } from "react";
import userContext from "./userContext";
import { Link } from "react-router-dom";

/** Homepage view
 *
 * Props:
 * - none
 *
 * State:
 * - none
 *
 * RoutesList -> Homepage
 */

export default function Homepage() {
  const user  = useContext(userContext);

  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      <h3>All the jobs in one, convenient place.</h3>
      {!user?.firstName && (
        <span>
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary" to="/signup">
            Signup
          </Link>
        </span>
      )}
      {user?.firstName && <h2>Welcome back, {user?.firstName}!</h2>}
    </div>
  );
}
