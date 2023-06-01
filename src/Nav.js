import { Link } from "react-router-dom";

/** Nav component for nav bar
 *
 * BrowserRouter -> Nav -> Link
 */

export default function Nav() {
  return (
    // <nav className="navbar navbar-expand-lg bg-light">
    //   <div className="container-fluid">
    //     <ul className="navbar-nav">
    //       <li className="navbar-brand"><Link className="nav-link active" aria-current="page" to="/">Jobly</Link></li>
    //       <li className="nav-item"><Link className="nav-link" to="/companies">Companies</Link></li>
    //       <li className="nav-item"><Link className="nav-link" to="/jobs">Jobs</Link></li>
    //     </ul>
    //   </div>
    // </nav>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Jobly</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/companies">Companies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/jobs">Jobs</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}
