import "/src/app.css";
import Die from "./components/Die";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export default function App() {
  const DICE_COUNT = 10;
  const [dice, setDice] = useState(() => generateDice());
  const gameWon = dice.every(
    (die) => die.isHeld && dice.every((die) => die.value === dice[0].value)
  );
  const actionBtn = useRef(null);

  function generateDice(count = DICE_COUNT) {
    const newDice = [];

    for (let i = 0; i < count; i++) {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      newDice.push({ id: i, value: randomValue, isHeld: false });
    }
    return newDice;
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function roll() {
    if (gameWon) {
      setDice(generateDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6) + 1 }
        )
      );
    }
  }

  useEffect(() => {
    if (gameWon) {
      actionBtn.current.focus();
    }
  }, [gameWon]);

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only"><p>{gameWon ? "You Won!\nPress New Game to restart" : ""}</p></div>
      <div className="game-title">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dice-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            hold={() => hold(die.id)}
          />
        ))}
      </div>

      <button className="roll-dice-btn" onClick={roll} ref={actionBtn}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
