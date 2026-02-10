import React, { useState, useEffect } from 'react';

function EroticFight() {
  const [wayneScore, setWayneScore] = useState(0);
  const [cindyScore, setCindyScore] = useState(0);
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [winner, setWinner] = useState(null);
  const [tiebreaker, setTiebreaker] = useState(false);
  const [tiebreakerWinner, setTiebreakerWinner] = useState(null);

  useEffect(() => {
    if (timer > 0 && !winner) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !winner) {
      if (wayneScore > cindyScore) {
        setWinner('Wayne');
      } else if (cindyScore > wayneScore) {
        setWinner('Cindy');
      } else {
        setTiebreaker(true);
      }
    }
  }, [timer, winner, wayneScore, cindyScore]);

  const handleWayne = () => {
    if (!winner && !tiebreaker) {
      setWayneScore(wayneScore + 1);
    } else if (tiebreaker && !tiebreakerWinner) {
      setTiebreakerWinner('Wayne');
    }
  };

  const handleCindy = () => {
    if (!winner && !tiebreaker) {
      setCindyScore(cindyScore + 1);
    } else if (tiebreaker && !tiebreakerWinner) {
      setTiebreakerWinner('Cindy');
    }
  };

  useEffect(() => {
    if (tiebreakerWinner) {
      setWinner(tiebreakerWinner);
    }
  }, [tiebreakerWinner]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Erotic Fight Mode</h2>
      <div style={{ fontSize: '2em', marginBottom: '20px' }}>Time: {formatTime(timer)}</div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleWayne} disabled={!!winner}>+1 Wayne</button>
        <span style={{ margin: '0 20px' }}>Wayne: {wayneScore}</span>
        <span style={{ margin: '0 20px' }}>Cindy: {cindyScore}</span>
        <button onClick={handleCindy} disabled={!!winner}>+1 Cindy</button>
      </div>
      {winner && (
        <div style={{ fontSize: '1.5em', color: 'green' }}>
          Winner: {winner}
        </div>
      )}
      {tiebreaker && !winner && (
        <div style={{ color: 'red' }}>
          Tie! Next point wins.
        </div>
      )}
    </div>
  );
}

export default EroticFight;
