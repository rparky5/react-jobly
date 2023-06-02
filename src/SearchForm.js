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
    <form className="SearchForm " onSubmit={handleSubmit}>
      <div className='row justify-content-center justify-content-lg-start gx-0 align-items-center'>
        <div className='col-6'>
          <input
            aria-label="search"
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter search term..."
            id="searchTerm"
            name="searchTerm"
            value={formData.searchTerm || ''}
            onChange={handleChange}>
          </input>
        </div>
        <div className='col-auto'>
          <button className="btn btn-primary btn-lg mx-0">Submit</button>
        </div>
      </div>
    </form>
  )
}