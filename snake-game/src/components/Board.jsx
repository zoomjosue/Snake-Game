import PropTypes from 'prop-types';
import Snake from './Snake';
import Food from './Food';

const CELL_SIZE = 28;

const Board = ({ snake, food, boardSize, showPieces }) => {
  const boardPx = boardSize * CELL_SIZE;

  const boardStyle = {
    position: 'relative',
    width: boardPx,
    height: boardPx,
    backgroundColor: 'var(--board-bg)',
    border: '2px solid var(--board-border)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 40px var(--board-glow)',
  };

  // Draw grid lines via CSS background
  const gridStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(var(--grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
    `,
    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
    pointerEvents: 'none',
  };

  return (
    <div className="board" style={boardStyle}>
      <div style={gridStyle} />
      {showPieces && (
        <>
          <Snake snake={snake} cellSize={CELL_SIZE} />
          <Food food={food} cellSize={CELL_SIZE} />
        </>
      )}
    </div>
  );
};

Board.propTypes = {
  snake: PropTypes.array.isRequired,
  food: PropTypes.object.isRequired,
  boardSize: PropTypes.number.isRequired,
  showPieces: PropTypes.bool,
};

Board.defaultProps = {
  showPieces: true,
};

export default Board;
