import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btmHabilitado: true,
      logado: false,
      loading: false,
      name: '',
    };
    this.SaveUser = this.SaveUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target: { value } }) {
    const MIN_LENGHT = 3;
    if (value.length >= MIN_LENGHT) {
      this.setState({ btmHabilitado: false, name: value });
    }
  }

  async SaveUser() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ logado: true });
  }

  render() {
    const { btmHabilitado, logado, loading } = this.state;
    const { SaveUser, onInputChange } = this;
    return (
      <div className="loginbox" data-testid="page-login">
        { loading ? <Loading /> : (
          <form>
            <p>LOGIN</p>
            <input
              name="name"
              id="login-name"
              type="text"
              onChange={ onInputChange }
              data-testid="login-name-input"
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              onClick={ SaveUser }
              disabled={ btmHabilitado }
            >
              Entrar
            </button>
          </form>
        )}
        {logado ? <Redirect to="./search" /> : ''}
      </div>
    );
  }
}

export default Login;
