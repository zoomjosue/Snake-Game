import PropTypes from 'prop-types';

const Food = ({ food, cellSize }) => {
  const style = {
    position: 'absolute',
    left: food.x * cellSize,
    top: food.y * cellSize,
    width: cellSize,
    height: cellSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'foodPulse 0.8s ease-in-out infinite alternate',
  };

  return (
    <div className="food" style={style} aria-label="Comida">
      <span className="food-core" />
    </div>
  );
};

Food.propTypes = {
  food: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }).isRequired,
  cellSize: PropTypes.number.isRequired,
};

export default Food;
