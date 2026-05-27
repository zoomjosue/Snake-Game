import PropTypes from 'prop-types';

const Score = ({ score, highScore }) => {
  return (
    <div className="score-container">
      <div className="score-item">
        <span className="score-label">PUNTAJE</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-divider" />
      <div className="score-item">
        <span className="score-label">RÉCORD</span>
        <span className="score-value high">{highScore}</span>
      </div>
    </div>
  );
};

Score.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

export default Score;
