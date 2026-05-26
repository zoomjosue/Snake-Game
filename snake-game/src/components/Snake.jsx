import PropTypes from 'prop-types';

const Snake = ({ snake, cellSize }) => {
  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;
        const style = {
          position: 'absolute',
          left: segment.x * cellSize,
          top: segment.y * cellSize,
          width: cellSize,
          height: cellSize,
          borderRadius: isHead ? '6px' : '4px',
          backgroundColor: isHead ? 'var(--snake-head)' : 'var(--snake-body)',
          boxShadow: isHead ? '0 0 8px var(--snake-glow)' : 'none',
          transition: 'left 0.05s linear, top 0.05s linear',
          zIndex: isHead ? 2 : 1,
          opacity: 1 - (index / snake.length) * 0.4,
        };

        return (
          <div
            key={`seg-${index}`}
            className={`snake-segment ${isHead ? 'snake-head' : ''}`}
            style={style}
          />
        );
      })}
    </>
  );
};

Snake.propTypes = {
  snake: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
  ).isRequired,
  cellSize: PropTypes.number.isRequired,
};

export default Snake;
