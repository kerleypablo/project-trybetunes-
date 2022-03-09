import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btmHabilitado: true,
      search: '',
      albuns: [],
      loading: false,
      artistName: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.SearchAlbum = this.SearchAlbum.bind(this);
  }

  onInputChange({ target }) {
    const MIN_LENGHT = 2;
    this.setState({ [target.name]: target.value });
    if (target.value.length >= MIN_LENGHT) {
      this.setState({ btmHabilitado: false });
    }
  }

  async SearchAlbum() {
    const { artistName } = this.state;
    this.setState({ search: artistName });
    this.setState({
      loading: true,
      btmHabilitado: true,
      pesquisado: true,
      artistName: '',
    });
    const album = await searchAlbumsAPI(artistName);
    this.setState({
      btmHabilitado: false,
      loading: false,
      albuns: album,
    });
  }

  render() {
    const { btmHabilitado, search, loading, albuns, artistName, pesquisado } = this.state;
    const { onInputChange, SearchAlbum } = this;
    let result = '';

    if (loading) {
      result = <Loading />;
    } else if (!loading && albuns.length <= 0 && pesquisado) {
      result = <p>Nenhum álbum foi encontrado</p>;
    } else if (!loading && albuns.length > 0) {
      result = (
        <div className="boxCard">
          <p className="TituloArtista">
            {`Resultado de álbuns de: ${search}`}
          </p>
          {albuns.map((colection) => (
            <div key={ colection.collectionId } className="cardColections">
              <Link
                key={ colection.collectionId }
                to={ `/album/${colection.collectionId}` }
                data-testid={ `link-to-album-${colection.collectionId}` }
                className="card"
              />
              <img
                alt={ colection.artistName }
                src={ colection.artworkUrl100 }
                className="igmCard"
              />
              <div className="infoCard">
                <p className="albumArtista">{ colection.collectionName }</p>
                <p className="nomeArtista">{ colection.artistName }</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div data-testid="page-search">
        <Header />
        <div className="boxSearch">
          <input
            type="text"
            data-testid="search-artist-input"
            name="artistName"
            value={ artistName }
            onChange={ onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btmHabilitado }
            onClick={ SearchAlbum }
          >
            Procurar
          </button>
        </div>
        <section>
          { result }
        </section>
      </div>
    );
  }
}

export default Search;
