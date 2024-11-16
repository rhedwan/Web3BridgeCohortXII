import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(6);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>("medium");

  const difficultyAttempts = {
    easy: 8,
    medium: 6,
    hard: 4
  };

  const difficultyLabels = {
    easy: "Easy (8 attempts)",
    medium: "Medium (6 attempts)",
    hard: "Hard (4 attempts)"
  };

  const generateNewNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const startNewGame = (diff: string = difficulty) => {
    setSecretNumber(generateNewNumber());
    setGuess("");
    setMessage("Make a guess between 1 and 100!");
    setAttempts(difficultyAttempts[diff as keyof typeof difficultyAttempts]);
    setGameOver(false);
    setDifficulty(diff);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = () => {
    const numberGuess = parseInt(guess);

    if (isNaN(numberGuess) || numberGuess < 1 || numberGuess > 100) {
      setMessage("Please enter a valid number between 1 and 100!");
      return;
    }

    const newAttempts = attempts - 1;
    setAttempts(newAttempts);

    if (numberGuess === secretNumber) {
      setMessage(`Congratulations! You won! The number was ${secretNumber}`);
      setGameOver(true);
    } else if (newAttempts === 0) {
      setMessage(`Game Over! The number was ${secretNumber}`);
      setGameOver(true);
    } else if (numberGuess < secretNumber) {
      setMessage(`Too low! ${newAttempts} attempts remaining`);
    } else {
      setMessage(`Too high! ${newAttempts} attempts remaining`);
    }
    setGuess("");
  };

  return (
    <div className="App">
      <h1>Number Guesser Game</h1>
      <div className="game-info">
        <p className="current-difficulty">
          Current Difficulty: {difficultyLabels[difficulty as keyof typeof difficultyLabels]}
        </p>
      </div>
      <div className="difficulty">
        <button
          onClick={() => startNewGame("easy")}
          className={difficulty === "easy" ? "active" : ""}
        >
          Easy
        </button>
        <button
          onClick={() => startNewGame("medium")}
          className={difficulty === "medium" ? "active" : ""}
        >
          Medium
        </button>
        <button
          onClick={() => startNewGame("hard")}
          className={difficulty === "hard" ? "active" : ""}
        >
          Hard
        </button>
      </div>
      <p>{message}</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver}
        min="1"
        max="100"
      />
      <button onClick={handleGuess} disabled={gameOver}>
        Submit Guess
      </button>
      {gameOver && (
        <button onClick={() => startNewGame()}>Play Again</button>
      )}
    </div>
  );
}
