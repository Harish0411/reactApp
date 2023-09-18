import React, { useState, useEffect, useCallback } from "react";
import "./Style.css"

const numRows = 20;
const numCols = 20;

const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([
    { row: 10, col: 10 },
    { row: 10, col: 11 },
  ]);
  const [food, setFood] = useState({ row: 15, col: 15 });
  const [direction, setDirection] = useState(Direction.RIGHT);

  const handleKeyPress = useCallback(
    (event) => {
      const newDirection = event.key.replace("Arrow", "").toUpperCase();
      if (
        (newDirection === Direction.UP && direction !== Direction.DOWN) ||
        (newDirection === Direction.DOWN && direction !== Direction.UP) ||
        (newDirection === Direction.LEFT && direction !== Direction.RIGHT) ||
        (newDirection === Direction.RIGHT && direction !== Direction.LEFT)
      ) {
        setDirection(newDirection);
      }
    },
    [direction]
  );

  useEffect(() => {
    const handleGameOver = () => {
      alert("Game over!");
      setSnake([
        { row: 10, col: 10 },
        { row: 10, col: 11 },
      ]);
      setDirection(Direction.RIGHT);
    };

  

    const handleGameLoop = setInterval(() => {
      // Update snake's position based on the current direction
      // Check for collisions with food or walls
      // Update the snake's position and check for game over conditions
      const newSnake = [...snake];
      const head = newSnake[0];
      let newHead;
  
      switch (direction) {
        case Direction.UP:
          newHead = { row: head.row - 1, col: head.col };
          break;
        case Direction.DOWN:
          newHead = { row: head.row + 1, col: head.col };
          break;
        case Direction.LEFT:
          newHead = { row: head.row, col: head.col - 1 };
          break;
        case Direction.RIGHT:
          newHead = { row: head.row, col: head.col + 1 };
          break;
        default:
          newHead = head;
      }
  
      const isFoodCollision = newHead.row === food.row && newHead.col === food.col;
      const isWallCollision =
        newHead.row < 0 || newHead.row >= numRows || newHead.col < 0 || newHead.col >= numCols;
  
      if (isFoodCollision) {
        // If food is eaten, generate a new food position
        setFood({
          row: Math.floor(Math.random() * numRows),
          col: Math.floor(Math.random() * numCols),
        });
      } else if (isWallCollision || newSnake.some(cell => cell.row === newHead.row && cell.col === newHead.col)) {
        // If wall or snake collision, handle game over
        clearInterval(handleGameLoop);
        alert("Game over!");
        setSnake([
          { row: 10, col: 10 },
          { row: 10, col: 11 },
        ]);
        setDirection(Direction.RIGHT);
        return;
      }
  
      newSnake.unshift(newHead);
      newSnake.pop();
      setSnake(newSnake);
    
    }, 200);

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(handleGameLoop);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);


return (
    <div>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: numCols }).map((_, colIndex) => {
            const isSnakeCell = snake.some(
              (cell) => cell.row === rowIndex && cell.col === colIndex
            );
            const isFoodCell = food.row === rowIndex && food.col === colIndex;
  
            return (
              <div
                key={colIndex}
                className={`cell ${isSnakeCell ? "snake" : ""} ${
                  isFoodCell ? "food" : ""
                }`}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
  
};

export default SnakeGame;
