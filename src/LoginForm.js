import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

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

  // handle form submit
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
        {error && <p>{error}</p>}
        <label>Username
          <input
            type="text"
            placeholder="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange} />
        </label>
        <label>Password
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}
