import React, { useState } from 'react';
import './App.css';

function App() {
  const [flag, setFlag] = useState(1);
  const [count, setCount] = useState(1);
  const [player, setPlayer] = useState('O');
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [namesEntered, setNamesEntered] = useState(false);

  function Checkwin() {
    const winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let c = [];
    for (let i = 0; i <= 8; i++) {
      c.push(document.getElementById(`cell${i}`).innerHTML);
    }

    for (let x of winCombo) {
      if (x.every(index => c[index] === player)) {
        const winnerName = player === 'X' ? playerX : playerO;
        document.getElementById('result').innerHTML = `${winnerName} wins!`;
        setFlag(0); 
        return;
      }
    }

    if (count === 9 && flag === 1) {
      document.getElementById('result').innerHTML = "It's a draw!";
      setFlag(0);
    }
  }

  function Add(index) {
    if (!namesEntered) {
      alert('Please enter both player names before starting the game!');
      return;
    }

    if (flag === 1) {
      const cell = document.getElementById(index);
      if (cell.innerHTML === '') {
        cell.innerHTML = player;
        setCount(count + 1);
        Checkwin();
        setPlayer(player === 'X' ? 'O' : 'X');
      } else {
        alert('Cell already occupied!');
      }
    }
  }

  function restartGame() {
    setFlag(1);
    setCount(1);
    setPlayer('O');
    setNamesEntered(false);
    for (let i = 0; i <= 8; i++) {
      document.getElementById(`cell${i}`).innerHTML = '';
    }
    document.getElementById('result').innerHTML = '';
  }

  function handleStartGame() {
    if (playerX.trim() === '' || playerO.trim() === '') {
      alert('Please enter both player names before starting the game!');
    } else {
      setNamesEntered(true);
    }
  }

  return (
    <div className="main">
      <h1 className="heading">Tic-Tac-Toe</h1>
      <div className="game">
        <div className="sidebar">
          <h2>Enter Player Names</h2>
          <label>
            Player X:
            <input
              type="text"
              value={playerX}
              onChange={e => setPlayerX(e.target.value)}
              placeholder="Enter Player X Name"
            />
          </label>
          <label>
            Player O:
            <input
              type="text"
              value={playerO}
              onChange={e => setPlayerO(e.target.value)}
              placeholder="Enter Player O Name"
            />
          </label>
          <button className="start-button" onClick={handleStartGame}>
            Start Game
          </button>
        </div>

        <div className="board-container">
          <div className="container">
            {[...Array(9).keys()].map(i => (
              <div
                className="box"
                id={`cell${i}`}
                key={i}
                onClick={() => Add(`cell${i}`)}
              ></div>
            ))}
          </div>
          <button className="restart-button" onClick={restartGame}>
            Restart
          </button>
        </div>

        <div className="result-container">
          <h2 id="turn">
            Turn: {namesEntered ? (player === 'X' ? playerX : playerO) : ''}
          </h2>
          <h2 id="result"></h2>
        </div>
      </div>
    </div>
  );
}

export default App;
