import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";


/** List of all companies
 *
 * Props:
 * - none
 *
 * State:
 * - companies: array of companies like:
 *    [{ handle, name, description, numEmployees, logoUrl }, ...]
 * - isLoading: boolean based on waiting to get results from api
 * - error: any errors that occur while trying to get company data
 *
 * Routes -> CompanyList -> {CompanyCard, SearchForm}
 */

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(function getCompaniesOnMount() {
    async function getAllCompaniesFromAPI() {
      try {
        const companiesResponse = await JoblyApi.getAllCompanies();
        setCompanies(companiesResponse);
        setIsLoading(false);
      } catch (err) {
        setError(true);
      }
    }
    getAllCompaniesFromAPI();
  }, []);

  // Handler to pass search form. Gets search results from api
  async function searchCompanies(formData) {
    try {
      const {searchTerm} = formData;
      const searchResult = await JoblyApi.getAllCompanies({nameLike: searchTerm});
      setCompanies(searchResult);
    } catch (err) {
      setError(err);
    }
  }

  if (error) return <Navigate to="/500"/>
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <SearchForm search={searchCompanies}/>
      { companies.length !== 0
        ? companies.map(c => (
          <CompanyCard key={c.handle} company={c} />))
        : <p>No companies found.</p>
      }
    </div>
  );
}
