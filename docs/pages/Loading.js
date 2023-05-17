import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="carregando" data-testid="page-album">
        Carregando...
      </div>
    );
  }
}

export default Loading;
