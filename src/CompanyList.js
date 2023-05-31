import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";


export default function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(function getCompaniesOnMount() {
    async function getAllCompaniesFromAPI() {
      const companies = await JoblyApi.getAllCompanies();
      setCompanies(companies);
    }
    getAllCompaniesFromAPI();
  }, []);

  // handler to pass search form
  async function searchCompanies(formData) {
    const {searchTerm} = formData;
    const searchResult = await JoblyApi.getAllCompanies({nameLike: searchTerm});
    setCompanies(searchResult);
  }

  return (
    <div>
      <SearchForm search={searchCompanies}/>
      {companies.map((c) => (
        <CompanyCard key={c.handle} company={c} />
      ))}
    </div>
  );
}
