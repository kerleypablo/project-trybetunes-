import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      artista: '',
      album: '',
      imagemalbum: '',
      loading: false,
    };
    this.musicRequest = this.musicRequest.bind(this);
  }

  componentDidMount() {
    this.musicRequest();
  }

  async musicRequest() {
    const { match } = this.props;
    this.setState({
      loading: true,
    });
    const musics = await getMusics(match.params.id);
    this.setState({
      musicas: musics,
      artista: musics[0].artistName,
      album: musics[0].collectionName,
      imagemalbum: musics[0].artworkUrl100,
      loading: false,
    });
  }

  render() {
    const { artista, album, imagemalbum, musicas, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <section>
            <div className="albumcard">
              <img alt={ album } src={ imagemalbum } />
              <p data-testid="album-name">{ album }</p>
              <p data-testid="artist-name">{ artista }</p>
            </div>
            <div>
              {
                musicas.map((music, i) => (
                  i !== 0 && (
                    <MusicCard music={ music } key={ music.trackId } />
                  )))
              }
            </div>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
