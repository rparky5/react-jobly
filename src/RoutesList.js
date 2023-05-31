import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyJobs from "./CompanyJobs";
import Jobs from "./Jobs";
import NotFoundError from "./NotFoundError";
import UnauthorizedError from "./UnauthorizedError";
import BadRequestError from "./BadRequestError";
import ServerError from "./SeverError";

/** RoutesList component for all Routes
 *
 * BrowserRouter -> RoutesList -> { Routes, [Route, ...] }
 */
export default function RoutesList() {
  // fn to get company by handle

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyJobs />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/404" element={<NotFoundError />} />
      <Route path="/401" element={<UnauthorizedError />} />
      <Route path="/403" element={<BadRequestError />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
