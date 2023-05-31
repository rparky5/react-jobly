import { Link } from "react-router-dom";

/** Nav component for nav bar
 *
 * BrowserRouter -> Nav -> Link
 */

export default function Nav() {
  return (
    <ul>
      <li><Link to="/">Homepage</Link></li>
      <li><Link to="/companies">CompanyList</Link></li>
      <li><Link to="/jobs">Jobs</Link></li>
    </ul>
  );
}
