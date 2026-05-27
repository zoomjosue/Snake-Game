import PropTypes from 'prop-types';

const StartScreen = ({ levels, selectedLevel, onSelectLevel, onStart }) => {
  return (
    <div className="overlay">
      <div className="overlay-card">
        <div className="snake-title">
          <span className="title-snake" aria-hidden="true">S</span>
          <h1>SNAKE</h1>
        </div>
        <p className="subtitle">Elige tu dificultad</p>

        <div className="level-buttons">
          {levels.map((lvl, i) => (
            <button
              key={lvl.name}
              className={`level-btn ${selectedLevel === i ? 'active' : ''}`}
              onClick={() => onSelectLevel(i)}
            >
              {lvl.name}
            </button>
          ))}
        </div>

        <button className="start-btn" onClick={() => onStart(selectedLevel)}>
          JUGAR
        </button>

        <div className="controls-hint">
          <span>Flechas</span> o <span>W A S D</span> para mover
        </div>
      </div>
    </div>
  );
};

StartScreen.propTypes = {
  levels: PropTypes.array.isRequired,
  selectedLevel: PropTypes.number.isRequired,
  onSelectLevel: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
};

export default StartScreen;
