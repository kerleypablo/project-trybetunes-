import React from 'react';
import Header from './Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
      </div>
    );
  }
}

export default Profile;
