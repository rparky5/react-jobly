export default function JobCard({
  job: { id, title, salary, equity, companyName },
}) {
  return (
    <div className="JobCard">
      <b>
        <h3>Title: {title}</h3>
      </b>
      {companyName && <p>{companyName}</p>}
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
    </div>
  );
}
