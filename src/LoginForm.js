import {useState} from 'react';

export default function LoginForm({ login }) {
  const [formData, setFormData] = useState({username:'', password:''});

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
    login(formData);
  }

  return (
    <div className='LoginForm'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
            type="text"
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
