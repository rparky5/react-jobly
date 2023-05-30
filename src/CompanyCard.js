import { Link } from "react-router-dom";

export default function CompanyCard({
  company: { handle, name, description, logoUrl },
}) {
  return (
    <Link className="CompanyCard" to={`/companies/${handle}`}>
      <div className="card-body">
        {/* TODO: explicitly close elements vs self-closing */}
        <img src={logoUrl} alt={name}></img>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
