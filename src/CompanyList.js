import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

//TODO: if no companies found, display message

/** List of all companies
 *
 * Props:
 * - none
 *
 * State:
 * - companies: array of companies like:
 *    [{ handle, name, description, numEmployees, logoUrl }, ...]
 * - isLoading: boolean based on waiting to get results from api
 *
 * Routes -> CompanyList -> {CompanyCard, SearchForm}
 */

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getCompaniesOnMount() {
    async function getAllCompaniesFromAPI() {
      const companies = await JoblyApi.getAllCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getAllCompaniesFromAPI();
  }, []);

  // Handler to pass search form. Gets search results from api
  //TODO: add logic about empty string search terms
  async function searchCompanies(formData) {
    const {searchTerm} = formData;
    const searchResult = await JoblyApi.getAllCompanies({nameLike: searchTerm});
    setCompanies(searchResult);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <SearchForm search={searchCompanies}/>
      {companies.map((c) => (
        <CompanyCard key={c.handle} company={c} />
      ))}
    </div>
  );
}
