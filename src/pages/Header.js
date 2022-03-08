import React from 'react';
import './Header.css';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div className="header" data-testid="header-component">
        <img src="" alt="logo" />
        <div className="user">
          { loading
            ? <Loading />
            : (<p data-testid="header-user-name">{ userName }</p>) }
        </div>
      </div>
    );
  }
}

export default Header;
