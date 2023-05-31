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
 *
 * Routes -> CompanyList -> {CompanyCard, SearchForm}
 */

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [networkError, setNetworkError] = useState(null)

  useEffect(function getCompaniesOnMount() {
    async function getAllCompaniesFromAPI() {
      try {
        const companiesResponse = await JoblyApi.getAllCompanies();
        setCompanies(companiesResponse);
        setIsLoading(false);
      } catch (err) {
        setNetworkError(true);
      }
    }
    getAllCompaniesFromAPI();
  }, []);

  // Handler to pass search form. Gets search results from api
  async function searchCompanies(formData) {
    const {searchTerm} = formData;
    const searchResult = await JoblyApi.getAllCompanies({nameLike: searchTerm});
    setCompanies(searchResult);
  }

  if (networkError) return <Navigate to="/500"/>
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
