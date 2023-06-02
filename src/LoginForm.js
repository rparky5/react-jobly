import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

/** Login form component
 *
 * Props:
 * - login: fn passed down from parent to log user in
 *
 * State:
 * - formData: controlled user form inputs
 * - error: any errors that occur while trying to log in
 *
 * RoutesList -> LoginForm
 */

export default function LoginForm({ login }) {
  const [formData, setFormData] = useState({username:'', password:''});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // update formData state on change
  function handleChange(evt) {
    setFormData(formData => ({
      ...formData,
      [evt.target.name]: evt.target.value
    }))
  }

  // handle form submit. log user in then navigate to homepage
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className='LoginForm'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert message={error} alertClass="danger" />}
        <div className="mb-3">
          <label className="form-label">Username
            <input
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
              type="password"
              className="form-control"
              placeholder="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange} />
          </label>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
