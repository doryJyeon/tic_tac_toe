import React, { useState } from 'react'
import Board from './components/Board';
import './App.css'

const App = () => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = useState(0)
  const [xisNest, setXIsNext] = useState(true)
  let status = `Player: ${xisNest ? "X": "O"}`

  // 승자 구하기
  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)

  // 안내 멘트
  const handelStatus = () => {
    const endGame = history.filter(item => item !== null).length > 9 ? true : false
    if(endGame && winner === null) {
      return "Game Over!"
    } else {
      return winner ? `Winner: ${winner}` : `Player: ${xisNest ? "X": "O"}`
    }
  }
  status = handelStatus()

  // 게임 클릭
  const handleClick = i => {
    const newHistory = history.slice(0, stepNumber + 1)
    const newCurrent = history[newHistory.length - 1]
    const newSquares = newCurrent.squares.slice()

    if(calculateWinner(newSquares) || newSquares[i]) {
      return 
    }

    newSquares[i] = xisNest ? "X" : "O"
    setHistory([...newHistory, { squares: newSquares }])
    setXIsNext(pre => !pre)
    setStepNumber(newHistory.length)
  }

  // history button
  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move}`
      : `new start`

    return (
      <li key={move}>
        <button onClick={() => moveTo(move)} className="move-button">{desc}</button>
      </li>
    )
  })

  // move step
  const moveTo = step => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className={`status ${winner && "winner"}`}>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
