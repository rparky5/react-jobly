import JobCard from "./JobCard"

export default function JobCardList({ jobs }) {
  return (
    <div>
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  )
}