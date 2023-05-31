import { useState } from "react";

/** Form for users to search by name
 *
 * Props:
 * - search: handler passed down by parent to ping api and get search results
 *
 * State:
 * //TODO: state
 * - none
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
    search(formData);
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      {/* TODO: add label */}
      <input
        type="text"
        placeholder="Enter search term..."
        name="searchTerm"
        value={formData.searchTerm}
        onChange={handleChange}>
      </input>
      <button>Submit</button>
    </form>
  )
}