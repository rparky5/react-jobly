import './JobCard.css';

/** Simple presentation component for a job card.
 *
 * Props:
 * - job: like { id, title, salary, equity, companyName }
 *
 * State:
 * - none
 *
 * JobCardList -> JobCard
 */

export default function JobCard({
  job: { title, salary, equity, companyName },
}) {
  return (
    <div className="JobCard">
      <b>
        <h3>Title: {title}</h3>
      </b>
      {companyName && <p>{companyName}</p>}
      {/* TODO: add logic to handle missing data */}
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
    </div>
  );
}
