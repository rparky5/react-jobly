import './CompanyCard.css'
import { Link } from "react-router-dom";

/** Simple component for a company card.
 *
 * Props:
 * - company: { handle, name, description, logoUrl }
 *
 * State:
 * - none
 *
 * CompanyList -> CompanyCard
 */

export default function CompanyCard({
  company: { handle, name, description, logoUrl },
}) {
  return (
    <div>
      <Link className="CompanyCard card" to={`/companies/${handle}`}>
        <div className="card-body">
          <img src={logoUrl} alt={name} />
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}
