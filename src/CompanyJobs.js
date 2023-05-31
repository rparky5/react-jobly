import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";

/** Show company detail and list of jobs that company has
 *
 * Props:
 * - none
 *
 * State:
 * - company: current company like:
 *    { handle, name, description, numEmployees, logoUrl, jobs }
 *    where jobs is [{ id, title, salary, equity }, ...]
 * - isLoading: boolean based on waiting to get results from api
 *
 * Routes -> CompanyJobs -> JobCardList
 */

export default function CompanyJobs() {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //TODO: add error handling
  useEffect(function getCompanyDetailOnMount() {
    async function getCompanyDetail(handle) {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
      setIsLoading(false);
    }
    getCompanyDetail(handle);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="CompanyJobs">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}
