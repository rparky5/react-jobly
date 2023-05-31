import JobCard from "./JobCard";

/** Component to produce job cards
 *
 * Props:
 * - jobs: array of jobs like:
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *
 * {CompanyJobs, Jobs} -> JobCardList
 */

//TODO: add styling
export default function JobCardList({ jobs }) {
  return (
    <div>
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  )
}