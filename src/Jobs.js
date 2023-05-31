import SearchForm from "./SearchForm";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";
import { useState, useEffect } from "react";

/** List of all jobs
 *
 * Props:
 * - none
 *
 * State:
 * - jobs: array of jobs like:
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 * - isLoading: boolean based on waiting to get results from api
 *
 * Routes -> Jobs -> {JobCardList, SearchForm}
 */

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getJobsOnMount() {
    async function getAllJobsFromAPI() {
      const jobs = await JoblyApi.getAllJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
    getAllJobsFromAPI();
  }, []);

  // Handler to pass search form. Gets search results from api
  async function searchJobs(formData) {
    const {searchTerm} = formData;
    const searchResult = await JoblyApi.getAllJobs({title: searchTerm});
    setJobs(searchResult);
  }

  if (isLoading) return <p>Loading...</p>;

  //TODO: only want 1 job card list
  return (
    <div>
      <SearchForm search={searchJobs}/>
      <JobCardList jobs={jobs} />
    </div>
  );
}