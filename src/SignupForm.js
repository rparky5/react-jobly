import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

/** Signup form component
 *
 * Props:
 * - signup: fn passed down from parent to sign user up
 *
 * State:
 * - error: any errors that occur while trying to signup
 * - formData: controlled user form inputs
 *
 * RoutesList -> SignupForm
 */

export default function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(
    {
      username:'',
      password:'',
      firstName:'',
      lastName:'',
      email:''
  });

  // update formData state on change
  function handleChange(evt) {
    setFormData(formData => ({
      ...formData,
      [evt.target.name]: evt.target.value
    }))
  }

  // handle form submit. sign user up and navigate to homepage
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  }



  return (
    <div className='SignupForm'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert message={error} alertClass="danger" />}
        <div className="mb-3">
          <label className="form-label">Username
            <input
              required
              type="text"
              className="form-control"
              placeholder="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Password
            <input
              required
              type="password"
              className="form-control"
              placeholder="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">First Name
            <input
              required
              type="text"
              className="form-control"
              placeholder="First Name"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name
            <input
              required
              type="text"
              className="form-control"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Email
            <input
              required
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange} />
          </label>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
