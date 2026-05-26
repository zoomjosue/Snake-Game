import { useState, useCallback, useEffect, useRef } from 'react';
import useGameLoop from './useGameLoop';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: 15, y: 10 };
const LEVELS = [
  { name: 'F\u00e1cil', speed: 200 },
  { name: 'Normal', speed: 130 },
  { name: 'Dif\u00edcil', speed: 80 },
];

const randomFood = (snake) => {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
};

const useSnakeGame = () => {
  const [gameState, setGameState] = useState('start');
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(LEVELS[1].speed);

  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(null);
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  const moveSnake = useCallback(() => {
    const dir = nextDirectionRef.current ?? directionRef.current;
    const prev = snakeRef.current;

    directionRef.current = dir;
    setDirection(dir);

    const head = prev[0];
    const newHead = { x: head.x + dir.x, y: head.y + dir.y };
    const currentFood = foodRef.current;
    const ateFood = newHead.x === currentFood.x && newHead.y === currentFood.y;

    if (
      newHead.x < 0 || newHead.x >= BOARD_SIZE ||
      newHead.y < 0 || newHead.y >= BOARD_SIZE
    ) {
      setGameState('gameover');
      return;
    }

    const bodyToCheck = ateFood ? prev : prev.slice(0, -1);
    if (bodyToCheck.some((s) => s.x === newHead.x && s.y === newHead.y)) {
      setGameState('gameover');
      return;
    }

    const newSnake = [newHead, ...prev];

    if (!ateFood) {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    setSnake(newSnake);

    if (ateFood) {
      setScore((s) => {
        const next = s + 10;
        setHighScore((h) => Math.max(h, next));
        if (next % 50 === 0) {
          setSpeed((sp) => Math.max(50, sp - 15));
        }
        return next;
      });

      const nextFood = randomFood(newSnake);
      foodRef.current = nextFood;
      setFood(nextFood);
    }
  }, []);

  useGameLoop(moveSnake, speed, gameState === 'playing');

  useEffect(() => {
    const handleKey = (e) => {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const newDir = map[e.key];
      if (!newDir) return;

      const cur = directionRef.current;
      if (newDir.x === -cur.x && newDir.y === -cur.y) return;

      nextDirectionRef.current = newDir;
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const startGame = useCallback((selectedLevel) => {
    const lvl = selectedLevel ?? level;
    const initSnake = [...INITIAL_SNAKE];
    const dir = INITIAL_DIRECTION;
    const initialFood = randomFood(initSnake);

    setLevel(lvl);
    setSpeed(LEVELS[lvl].speed);
    snakeRef.current = initSnake;
    setSnake(initSnake);
    setDirection(dir);
    directionRef.current = dir;
    nextDirectionRef.current = null;
    foodRef.current = initialFood;
    setFood(initialFood);
    setScore(0);
    setGameState('playing');
  }, [level]);

  const resetGame = useCallback(() => {
    snakeRef.current = INITIAL_SNAKE;
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    foodRef.current = INITIAL_FOOD;
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionRef.current = null;
    setScore(0);
    setGameState('start');
  }, []);

  return {
    snake,
    food,
    score,
    highScore,
    gameState,
    level,
    levels: LEVELS,
    boardSize: BOARD_SIZE,
    startGame,
    resetGame,
    direction,
  };
};

export default useSnakeGame;
