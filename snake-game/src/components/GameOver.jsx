import PropTypes from 'prop-types';

const GameOver = ({ score, highScore, onRestart, onMenu }) => {
  const isNewRecord = score > 0 && score === highScore;

  return (
    <div className="overlay">
      <div className="overlay-card gameover-card">
        <div className="gameover-icon" aria-hidden="true">X</div>
        <h2 className="gameover-title">GAME OVER</h2>

        {isNewRecord && (
          <div className="new-record">Nuevo record</div>
        )}

        <div className="final-scores">
          <div className="final-score-item">
            <span>Puntaje</span>
            <strong>{score}</strong>
          </div>
          <div className="final-score-item">
            <span>Record</span>
            <strong className="high">{highScore}</strong>
          </div>
        </div>

        <div className="gameover-buttons">
          <button className="start-btn" onClick={onRestart}>
            Reintentar
          </button>
          <button className="menu-btn" onClick={onMenu}>
            Menu
          </button>
        </div>
      </div>
    </div>
  );
};

GameOver.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  onMenu: PropTypes.func.isRequired,
};

export default GameOver;
