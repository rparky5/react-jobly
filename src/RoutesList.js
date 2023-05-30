import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyJobs from "./CompanyJobs";
import Jobs from "./Jobs";


/** RoutesList component for all Routes
 *
 * BrowserRouter -> RoutesList -> { Routes, [Route, ...] }
 */
export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyJobs />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
