import PropTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = ({
      checked: false,
      loading: false,
    });
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.addRemoveSong = this.addRemoveSong.bind(this);
  }

  onCheckBoxChange({ target }) {
    this.setState({ checked: target.checked }, () => this.addRemoveSong());
  }

  async addRemoveSong() {
    const { music } = this.props;
    const { checked } = this.state;
    this.setState({ loading: true });
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ loading: false });
  }

  render() {
    const { checked, loading } = this.state;
    const { music } = this.props;
    const { onCheckBoxChange } = this;
    return (
      <div className="cardMusic">
        <p>{ music.trackName }</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
        </audio>
        <label htmlFor={ music.trackId }>
          <input
            type="checkbox"
            name="Favorita"
            value={ music.trackId }
            data-testid={ `checkbox-music-${music.trackId}` }
            id={ music.trackId }
            checked={ checked }
            onChange={ onCheckBoxChange }
          />
        </label>
        { loading ? <Loading /> : '' }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape(),
}.isRequired;

export default MusicCard;
