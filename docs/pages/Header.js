import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userName: user.name, loading: false });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <div className="box">
        <header className="header" data-testid="header-component">
          <img src="" alt="logo" />
          <div className="user">
            { loading
              ? <Loading />
              : (<p data-testid="header-user-name">{ userName }</p>) }
          </div>
        </header>
        <div className="links">
          <nav>
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
