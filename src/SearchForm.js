import './SearchForm.css'
import { useState } from "react";

/** Form for users to search by name
 *
 * Props:
 * - search: handler passed down by parent to ping api and get search results
 *
 * State:
 * - formData: { searchTerm } where searchTerm is a string
 *
 * {CompanyList, JobCardList} -> SearchForm
 */

export default function SearchForm({ search }) {
  const [formData, setFormData] = useState({});

  // update formData state on change
  function handleChange(evt) {
    setFormData(formData => ({
      ...formData,
      [evt.target.name]: evt.target.value
    }))
  }

  // handle form submit
  function handleSubmit(evt) {
    evt.preventDefault();
    const trimmedData = formData.searchTerm.trim()
    if (trimmedData.length === 0) {
      search({})
    } else {

      search({searchTerm: trimmedData});
    }
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <label htmlFor="searchTerm">Search:</label>
      <input
        type="text"
        placeholder="Enter search term..."
        id="searchTerm"
        name="searchTerm"
        value={formData.searchTerm || ''}
        onChange={handleChange}>
      </input>
      <button>Submit</button>
    </form>
  )
}