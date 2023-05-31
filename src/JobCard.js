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
      {salary && <p>Salary: ${salary.toLocaleString()}</p>}
      {equity && <p>Equity: {equity}</p>}
    </div>
  );
}
