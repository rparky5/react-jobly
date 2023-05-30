import { Link } from "react-router-dom";

/** Nav component for nav bar
 *
 * BrowserRouter -> Nav -> Link
 */
// TODO: list-style-items; <nav> element contains ul and li
export default function Nav() {
  return (
    <ul>
      <li><Link to="/">Homepage</Link></li>
      <li><Link to="/companies">CompanyList</Link></li>
      <li><Link to="/jobs">Jobs</Link></li>
    </ul>
  );
}
