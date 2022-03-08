import React from 'react';
import Header from './Header';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      btmHabilitado: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target: { value } }) {
    const MIN_LENGHT = 2;
    if (value.length >= MIN_LENGHT) {
      this.setState({ btmHabilitado: false });
    }
  }

  render() {
    const { btmHabilitado } = this.state;
    const { onInputChange } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="boxSearch">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btmHabilitado }
          >
            Procurar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
