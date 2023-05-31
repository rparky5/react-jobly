import JobCard from "./JobCard";

/** Component to produce job cards
 *
 * Props:
 * - jobs: array of jobs like:
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *
 * {CompanyJobs, Jobs} -> JobCardList
 */

export default function JobCardList({ jobs }) {
  return (
    <div>
      { jobs.length !== 0
        ? jobs.map(job => <JobCard key={job.id} job={job} />)
        : <p>No jobs found.</p>
      }
    </div>
  )
}