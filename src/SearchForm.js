import { useState } from "react";
import JoblyApi from "./api";

//TODO: why do we need to keep track of formData
export default function SearchForm({ search }) {
  const [formData, setFormData] = useState({});

  function handleChange(evt) {
    setFormData(formData => ({
      ...formData,
      [evt.target.name]: evt.target.value
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData);
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter search term..."
        name="searchTerm"
        onChange={handleChange}>
      </input>
      <button>Submit</button>
    </form>
  )
}