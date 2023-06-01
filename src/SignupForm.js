import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignupForm({ signup }) {
  const navigate = useNavigate();
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

  // handle form submit
  async function handleSubmit(evt) {
    evt.preventDefault();
    await signup(formData);
    navigate("/");
  }

  return (
    <div className='SignupForm'>
      <h2>Signup</h2>
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
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={formData.password}
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
