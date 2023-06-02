import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "./userContext";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyJobs from "./CompanyJobs";
import Jobs from "./Jobs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import ServerError from "./SeverError";
import NotFoundError from "./NotFoundError";
import UnauthorizedError from "./UnauthorizedError";

/** RoutesList component for all Routes
 *
 * BrowserRouter -> RoutesList -> { Routes, [Route, ...] }
 */

export default function RoutesList({ login, signup, updateProfile }) {
  const user = useContext(userContext);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/404" element={<NotFoundError />} />
      <Route path="/401" element={<UnauthorizedError />} />
      <Route path="/500" element={<ServerError />} />

      {user && (
        <>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyJobs />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<ProfileForm updateProfile={updateProfile} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
      {!user && (
        <>
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="*" element={<Navigate to="/401" />} />

        </>
      )}
    </Routes>
  );
}
