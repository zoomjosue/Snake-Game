import { useState } from 'react';
import useSnakeGame from './hooks/useSnakeGame';
import Board from './components/Board';
import Score from './components/Score';
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import './App.css';

const App = () => {
  const {
    snake,
    food,
    score,
    highScore,
    gameState,
    level,
    levels,
    boardSize,
    startGame,
    resetGame,
  } = useSnakeGame();

  const [selectedLevel, setSelectedLevel] = useState(1);

  return (
    <div className="app">
      <div className="game-wrapper">
        <header className="game-header">
          <div className="header-title">
            <span className="header-mark" aria-hidden="true">S</span>
            SNAKE
          </div>
          <Score score={score} highScore={highScore} />
        </header>

        <div className="board-container">
          <Board
            snake={snake}
            food={food}
            boardSize={boardSize}
            showPieces={gameState !== 'start'}
          />

          {gameState === 'start' && (
            <StartScreen
              levels={levels}
              selectedLevel={selectedLevel}
              onSelectLevel={setSelectedLevel}
              onStart={startGame}
            />
          )}

          {gameState === 'gameover' && (
            <GameOver
              score={score}
              highScore={highScore}
              onRestart={() => startGame(level)}
              onMenu={resetGame}
            />
          )}
        </div>

        <footer className="game-footer">
          {gameState === 'playing' && (
            <span className="playing-hint">Usa las flechas o WASD para mover</span>
          )}
          {gameState !== 'playing' && (
            <span className="playing-hint">Presiona JUGAR para comenzar</span>
          )}
        </footer>
      </div>
    </div>
  );
};

export default App;
