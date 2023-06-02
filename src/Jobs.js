import SearchForm from "./SearchForm";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

/** List of all jobs
 *
 * Props:
 * - none
 *
 * State:
 * - jobs: array of jobs like:
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 * - isLoading: boolean based on waiting to get results from api
 * - error: any errors that occur while trying to get job data
 *
 * Routes -> Jobs -> {JobCardList, SearchForm}
 */

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function getJobsOnMount() {
    async function getAllJobsFromAPI() {
      try {
        const jobs = await JoblyApi.getAllJobs();
        setJobs(jobs);
        setIsLoading(false);
      } catch (err) {
        setError(err)
      }
    }
    getAllJobsFromAPI();
  }, []);

  // Handler to pass search form. Gets search results from api
  async function searchJobs(formData) {
    try {
      const {searchTerm} = formData;
      const searchResult = await JoblyApi.getAllJobs({title: searchTerm});
      setJobs(searchResult);
    } catch (err) {
      setError(err);
    }
  }

  if (error) return <Navigate to={`/404`} />;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <SearchForm search={searchJobs}/>
      <JobCardList jobs={jobs} />
    </div>
  );
}