import { useState, useContext } from "react";
import userContext from "./userContext";
import Alert from "./Alert";

/** Profile update form component
 *
 * Props:
 * - updateProfile: fn passed down from parent to update user data
 *
 * State:
 * - error: any errors that occur while trying to update user data
 * - message: messages passed into alert components indicating successful update
 * - formData: controlled user form inputs
 *
 * RoutesList -> ProfileForm
 */

export default function ProfileForm({ updateProfile }) {
  const { username, firstName, lastName, email } = useContext(userContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username,
    firstName,
    lastName,
    email,
  });

  // update formData state on change
  function handleChange(evt) {
    setFormData((formData) => ({
      ...formData,
      [evt.target.name]: evt.target.value,
    }));
  }

  // handle form submit
  async function handleSubmit(evt) {
    evt.preventDefault();
    const updatedData = { ...formData };
    delete updatedData.username;
    try {
      await updateProfile(updatedData);
      setMessage("Successfully updated your profile!");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="ProfileForm">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert message={error} alertClass="danger" />}
        {message && <Alert message={message} alertClass="success" />}
        <div className="mb-3">
          <label className="form-label">
            Username
            <input
              disabled
              type="text"
              className="form-control"
              placeholder="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            First Name
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Last Name
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Email
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
