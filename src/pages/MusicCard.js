import PropTypes from 'prop-types';
import React from 'react';
import './MusicCard.css';

class MusicCard extends React.Component {
  render() {
    const { music } = this.props;
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
        <input type="checkbox" value={ music.trackId } />
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape(),
}.isRequired;

export default MusicCard;
