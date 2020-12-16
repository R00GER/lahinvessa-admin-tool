import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, TextField, Button } from '@material-ui/core/';
import loginService from './services/login';

const Login = ({ handleUser }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const history = useHistory();

  const handleCredentials = (e) => {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await loginService.login(credentials);

    if (response.role === 'admin') {
      handleUser(response);
      history.push('/admin');
    }
  };

  return (
    <div
      className="login-container"
      style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Paper style={{ padding: '3rem' }}>
        <form onSubmit={submit} noValidate autoComplete="off">
          <div>
            <TextField
              name="email"
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={credentials.email}
              onChange={(e) => handleCredentials(e)}
            />
            <TextField
              name="password"
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={credentials.password}
              onChange={(e) => handleCredentials(e)}
            />
          </div>
          <div className="bottom">
            <div
              className="buttons-container"
              style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}
            >
              <Button type="submit" variant="outlined" color="primary">
                Login
              </Button>
              <Button variant="outlined" color="primary">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
