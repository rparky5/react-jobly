import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";


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

  return (
    <div>
      {/* Search form component goes here */}
      {companies.map((c) => (
        <CompanyCard key={c.handle} company={c} />
      ))}
    </div>
  );
}
