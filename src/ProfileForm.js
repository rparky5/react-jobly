import { useState, useContext } from 'react';
import userContext from "./userContext";

export default function ProfileForm({ updateProfile }) {
  const { username, firstName, lastName, email } = useContext(userContext);
  const [formData, setFormData] = useState(
    {
      username,
      firstName,
      lastName,
      email
  });

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
    const updatedData = {...formData};
    delete updatedData.username;
    updateProfile(updatedData);
  }

  return (
    <div className='ProfileForm'>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Username
          <input
            disabled
            type="text"
            placeholder="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange} />
        </label>
        <label>First Name
          <input
            type="text"
            placeholder="First Name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange} />
        </label>
        <label>Last Name
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange} />
        </label>
        <label>Email
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}
