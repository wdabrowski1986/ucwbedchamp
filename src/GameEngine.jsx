import React, { useState, useEffect } from 'react';
import { PLAYER_WAYNE, PLAYER_CINDY, GAME_MODES, CLOTHING_LAYERS } from './gameData';
import { MOVE_DETAILS } from './moveDetails';
import useMobile from './hooks/useMobile';
const MOVES = [
  // General Moves
  { name: 'Domination Mount', type: 'Physical', damage: 20, cost: 15, accuracy: 85, special: '' },
  { name: 'Possessive Body Lock', type: 'Challenge', damage: 25, cost: 20, accuracy: 80, special: '15 sec timer' },
  { name: 'The Bulldozer', type: 'Strike', damage: 15, cost: 10, accuracy: 90, special: '' },
  { name: 'Belly Strike', type: 'Strike', damage: 18, cost: 12, accuracy: 88, special: '' },
  { name: 'Chest Strike', type: 'Strike', damage: 17, cost: 11, accuracy: 89, special: '' },
  { name: 'Rear End Strike', type: 'Strike', damage: 19, cost: 13, accuracy: 87, special: '' },
  { name: 'Thigh Strike', type: 'Strike', damage: 16, cost: 10, accuracy: 90, special: '' },
  { name: '69 Lockdown', type: 'Physical', damage: 30, cost: 25, accuracy: 75, special: 'IRL Challenge (20s)' },
  { name: 'Grapevine Exposure', type: 'Physical', damage: 15, cost: 15, accuracy: 90, special: '' },
  { name: 'The Display', type: 'Sensual', damage: -10, cost: 5, accuracy: 95, special: 'Healing' },
  // Cindy's Moves
  { name: 'Amazon Straddle', type: 'Strike', damage: 25, cost: 20, accuracy: 90, special: '', character: 'Cindy' },
  { name: 'Sole Worship', type: 'Sensual', damage: -10, cost: 5, accuracy: 100, special: 'Healing', character: 'Cindy' },
  { name: 'Suffocation by Curves', type: 'Smother', damage: 35, cost: 30, accuracy: 85, special: 'IRL Challenge (20s)', character: 'Cindy' },
  { name: 'Goddess Scissors', type: 'Challenge', damage: 40, cost: 35, accuracy: 80, special: 'IRL Challenge (15s)', character: 'Cindy' },
  { name: 'Ball Breaker', type: 'Strike', damage: 20, cost: 20, accuracy: 90, special: '', character: 'Cindy' },
  { name: 'Queen’s Throne', type: 'Smother', damage: 45, cost: 40, accuracy: 75, special: 'IRL Challenge (20s)', character: 'Cindy' },
  // Wayne's Moves
  { name: 'The Stockade', type: 'Challenge', damage: 23, cost: 15, accuracy: 85, special: 'IRL Challenge (20s)', character: 'Wayne' },
  { name: 'Thigh Spread Pin', type: 'Physical', damage: 30, cost: 15, accuracy: 90, special: 'IRL Challenge (20s)', character: 'Wayne' },
  { name: 'The Lockdown', type: 'Physical', damage: 16, cost: 10, accuracy: 95, special: '', character: 'Wayne' },
  { name: 'Vice Grip', type: 'Strike', damage: 23, cost: 10, accuracy: 90, special: '', character: 'Wayne' },
  { name: 'The Crucifix', type: 'Challenge', damage: 30, cost: 25, accuracy: 80, special: 'IRL Challenge (15s)', character: 'Wayne' },
  { name: 'Atlas Hold', type: 'Physical', damage: 38, cost: 20, accuracy: 85, special: 'IRL Challenge (20s)', character: 'Wayne' },
  { name: 'The Conqueror’s Claim', type: 'Sensual', damage: -10, cost: 10, accuracy: 95, special: 'Healing', character: 'Wayne' },
  // Sensual Relaxation Moves
  { name: 'Deep Kiss', type: 'Sensual', damage: -5, cost: 5, accuracy: 100, special: 'Heal 5 HP, lower cost (60s)' },
  { name: 'The Tease', type: 'Sensual', damage: -5, cost: 5, accuracy: 100, special: 'Heal 5 HP (45s)' },
  { name: 'Body Worship', type: 'Sensual', damage: -10, cost: 5, accuracy: 100, special: 'Heal 10 HP (45s)' },
  { name: 'Heartbeat Check', type: 'Sensual', damage: 0, cost: 0, accuracy: 100, special: 'Bonding (60s)' },
  // Cindy's Finishers (Sudden Death Only)
  { name: 'THE MATRIARCH', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'High mount smother (Sudden Death)', character: 'Cindy' },
  { name: 'THE BLACK WIDOW', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Leg scissors (Sudden Death)', character: 'Cindy' },
  { name: 'ABSOLUTE ZERO', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Full weight face sit (Sudden Death)', character: 'Cindy' },
  { name: 'THE VENUS TRAP', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Full body wrap (Sudden Death)', character: 'Cindy' },
  { name: 'THE GRAVITY WELL', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Inescapable engulfment (Sudden Death)', character: 'Cindy' },
  { name: 'THE SERPENT\'S COIL', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Sinuous full-body squeeze (Sudden Death)', character: 'Cindy' },
  { name: 'THE THRONE OF THORNS', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'High-impact face sit with scratching (Sudden Death)', character: 'Cindy' },
  // Wayne's Finishers (Sudden Death Only)
  { name: 'THE MONOLITH', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Full weight flat pin (Sudden Death)', character: 'Wayne' },
  { name: 'THE ANACONDA', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Side crush (Sudden Death)', character: 'Wayne' },
  { name: 'THE PILLAGER', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Intense multi-point pressure (Sudden Death)', character: 'Wayne' },
  { name: 'THE CRUSHER', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Full body grind pin (Sudden Death)', character: 'Wayne' },
  { name: 'THE CRUCIBLE', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Impactful striking pin (Sudden Death)', character: 'Wayne' },
];

// ...existing code...

function getClothingLayer(hp) {
  for (const layer of CLOTHING_LAYERS) {
    if (hp >= layer.threshold) return layer;
  }
  return CLOTHING_LAYERS[CLOTHING_LAYERS.length - 1];
}


function GameEngine({ modeKey, enabledMoves }) {
          // Helper to format seconds as mm:ss
          function formatTime(secs) {
            const m = Math.floor(secs / 60);
            const s = secs % 60;
            return `${m}:${s.toString().padStart(2, '0')}`;
          }
        // Orgasm counters for erotic fight mode
        const [orgasms, setOrgasms] = useState({ Wayne: 0, Cindy: 0 });
      // Advance to next turn
      function nextTurn() {
        setSubmitted(false);
        setAttacker(prev => (prev === 'Wayne' ? 'Cindy' : 'Wayne'));
        setMove(null);
        setMessage('');
      }
    // Handle move submission
    function handleSubmit() {
      setSubmitted(true);
      // Determine defender
      const defender = attacker === 'Wayne' ? 'Cindy' : 'Wayne';
      // Apply move damage or healing
      if (move && typeof move.damage === 'number' && move.damage !== 0) {
        if (move.damage > 0) {
          // Damage: reduce defender's HP
          if (defender === 'Wayne') {
            setWayne(prev => ({ ...prev, hp: Math.max(0, prev.hp - move.damage) }));
          } else {
            setCindy(prev => ({ ...prev, hp: Math.max(0, prev.hp - move.damage) }));
          }
        } else if (move.damage < 0) {
          // Healing: increase attacker's HP
          if (attacker === 'Wayne') {
            setWayne(prev => ({ ...prev, hp: Math.min(100, prev.hp - move.damage) }));
          } else {
            setCindy(prev => ({ ...prev, hp: Math.min(100, prev.hp - move.damage) }));
          }
        }
      }
      // Prevent sensual and strike moves from causing submissions
      if (move && move.type !== 'Sensual' && move.type !== 'Strike') {
        setSubmissions(sub => ({
          ...sub,
          [attacker]: sub[attacker] + 1
        }));
        setMessage(`${attacker} performed ${move.name} and scored a submission!`);
      } else {
        setMessage(`${attacker} performed ${move ? move.name : 'a move'} (no submission)`);
      }
      setTimeout(nextTurn, 1200);
    }
  const [attacker, setAttacker] = useState(() => (Math.random() < 0.5 ? 'Wayne' : 'Cindy'));
  const [showCoinFlip, setShowCoinFlip] = useState(true);
  const [coinFlipResult, setCoinFlipResult] = useState(attacker);
  useEffect(() => {
    if (showCoinFlip) {
      setTimeout(() => {
        setShowCoinFlip(false);
      }, 2000);
    }
  }, [showCoinFlip]);
  const [showImageModal, setShowImageModal] = useState(null);
  const [strikeTimer, setStrikeTimer] = useState(0);
  const mode = GAME_MODES[modeKey] || GAME_MODES.best3;
  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(modeKey === 'ironwoman' ? 0 : mode.duration);
  const [ironWomanWinner, setIronWomanWinner] = useState(null);
  const [wayne, setWayne] = useState({ ...PLAYER_WAYNE });
  const [cindy, setCindy] = useState({ ...PLAYER_CINDY });
  const [move, setMove] = useState(null);
  // Stamina and submission recharge system removed
  const [finalStand, setFinalStand] = useState(false);
  const [shootoutTurns, setShootoutTurns] = useState({ Wayne: null, Cindy: null });
  const [shootoutStep, setShootoutStep] = useState(0);
  const [suddenDeathWinner, setSuddenDeathWinner] = useState(null);
  const [score, setScore] = useState({ Wayne: 0, Cindy: 0 });
  const [wayneStunned, setWayneStunned] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [submissions, setSubmissions] = useState({ Wayne: 0, Cindy: 0 });
  const isMobile = useMobile(768);

  // Deck system for move selection
  const [moveDeck, setMoveDeck] = useState([]);
  const [usedMoves, setUsedMoves] = useState([]);

  function buildMoveDeck() {
    // Use only enabled moves and filter by attacker
    let filteredMoves = MOVES.filter(m => enabledMoves.includes(m.name));
    if (attacker === 'Wayne') {
      filteredMoves = filteredMoves.filter(m => !m.character || m.character === 'Wayne');
    } else if (attacker === 'Cindy') {
      filteredMoves = filteredMoves.filter(m => !m.character || m.character === 'Cindy');
    }
    // Assign weights: General (Physical/Challenge/Sensual) = 3, Character-specific = 2, Finisher = 1
    let deck = [];
    filteredMoves.forEach(m => {
      let weight = 1;
      if (m.type === 'Finisher') weight = 1;
      else if (['Amazon Straddle', 'Sole Worship', 'Suffocation by Curves', 'Goddess Scissors', 'Ball Breaker', 'Queen’s Throne', 'The Stockade', 'Thigh Spread Pin', 'The Lockdown', 'Vice Grip', 'The Crucifix', 'Atlas Hold', 'The Conqueror’s Claim'].includes(m.name)) weight = 2;
      else weight = 3;
      for (let i = 0; i < weight; i++) deck.push(m);
    });
    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  useEffect(() => {
    setMoveDeck(buildMoveDeck());
    setUsedMoves([]);
  }, [enabledMoves, modeKey, attacker]);

  function randomMove() {
    if (moveDeck.length === 0) return null;

    let pool = moveDeck;
    if (modeKey === 'suddendeath') {
      const finishers = moveDeck.filter(m => m.type === 'Finisher');
      if (finishers.length === 0) return null;
      pool = finishers;
    } else if (modeKey === 'quick') {
      const nonSensualMoves = moveDeck.filter(m => m.type !== 'Sensual');
      if (nonSensualMoves.length === 0) return null;
      pool = nonSensualMoves;
    }

    let history = usedMoves;
    let available = pool.filter(m => !history.includes(m.name));
    if (available.length === 0) {
      history = [];
      available = pool;
    }

    if (history.length > 0) {
      const lastMove = history[history.length - 1];
      const filtered = available.filter(m => m.name !== lastMove);
      if (filtered.length > 0) {
        available = filtered;
      }
    }

    const idx = Math.floor(Math.random() * available.length);
    const nextMove = available[idx];
    const nextHistory = [...history, nextMove.name];
    setUsedMoves(nextHistory);
    return nextMove;
  }

  useEffect(() => {
    if (moveDeck.length > 0) {
      setMove(randomMove());
    }
  }, [moveDeck, modeKey]);

  useEffect(() => {
    if (modeKey === 'ironwoman' && !ironWomanWinner) {
      const interval = setInterval(() => setTimer(t => t + 1), 1000);
      return () => clearInterval(interval);
    } else if (mode.duration && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, mode.duration, modeKey, ironWomanWinner]);

  // Stamina system removed

  useEffect(() => {
    if (modeKey === 'suddendeath' && (wayne.hp === 0 || cindy.hp === 0) && !finalStand) {
      setFinalStand(true);
      setMessage('Final Stand! Player is completely exposed.');
    }
  }, [wayne.hp, cindy.hp, modeKey, finalStand]);
  // ...existing code...
  // Iron Woman: clothing removed at 5/10/15 min
  let ironWomanClothing = null;
  if (modeKey === 'ironwoman') {
    if (timer < 300) {
      ironWomanClothing = { icon: '👗', status: 'FULLY DRESSED' };
    } else if (timer < 600) {
      ironWomanClothing = { icon: '🎀', status: 'PARTIALLY UNDRESSED' };
    } else if (timer < 900) {
      ironWomanClothing = { icon: '👙', status: 'UNDERWEAR ONLY' };
    } else {
      ironWomanClothing = { icon: '💋', status: 'NUDE' };
    }
  }
  const wayneClothing = modeKey === 'quick' ? null : modeKey === 'ironwoman' ? ironWomanClothing : getClothingLayer(wayne.hp);
  const cindyClothing = modeKey === 'quick' ? null : modeKey === 'ironwoman' ? ironWomanClothing : getClothingLayer(cindy.hp);
  const players = [
    { key: 'Wayne', data: wayne, clothing: wayneClothing, accent: '#4cc9f0' },
    { key: 'Cindy', data: cindy, clothing: cindyClothing, accent: '#ff6b6b' },
  ];
  const attackerPool = MOVES.filter(
    m => enabledMoves.includes(m.name) && (!m.character || m.character === attacker)
  );
  const attackerHasConfiguredMoves = attackerPool.length > 0;
  const deckHasFinisher = moveDeck.some(m => m.type === 'Finisher');
  const deckHasNonSensual = moveDeck.some(m => m.type !== 'Sensual');
  const currentMoveDetails = move ? MOVE_DETAILS[move.name] : null;
  const showTimerBox = modeKey === 'ironwoman' || Boolean(mode.duration);
  const timerBoxLabel = modeKey === 'ironwoman' ? 'Elapsed' : 'Timer';
  const timerBoxValue = showTimerBox
    ? modeKey === 'ironwoman'
      ? formatTime(timer)
      : formatTime(Math.max(timer, 0))
    : '';
  let moveStatusMessage = '';
  if (enabledMoves.length === 0) {
    moveStatusMessage = 'All moves are disabled. Enable at least one move in Move Settings.';
  } else if (!attackerHasConfiguredMoves) {
    moveStatusMessage = `${attacker} has no eligible moves with the current Move Settings.`;
  } else if (modeKey === 'suddendeath' && !deckHasFinisher) {
    moveStatusMessage = 'Sudden Death needs at least one Finisher for the active attacker.';
  } else if (modeKey === 'quick' && !deckHasNonSensual) {
    moveStatusMessage = 'Quick Match blocks Sensual moves. Enable a Physical, Strike, or Challenge move.';
  } else if (moveDeck.length === 0) {
    moveStatusMessage = 'Shuffling move deck...';
  } else if (!move) {
    moveStatusMessage = 'Drawing the next move...';
  }
  const deckSummary = attackerHasConfiguredMoves
    ? `${attackerPool.length} move${attackerPool.length === 1 ? '' : 's'} available for ${attacker}`
    : 'No eligible moves for current attacker.';
  const actionDisabled = submitted || !move || showCoinFlip;

  // Erotic Fight Mode: Only show special UI
  if (modeKey === 'eroticfight') {
    const eroticButtonBase = {
      fontSize: isMobile ? '1.6em' : '2.7em',
      padding: isMobile ? '0.9em 1.4em' : '1.1em 2.7em',
      borderRadius: isMobile ? '18px' : '22px',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 0 32px #ff007f99, 0 0 8px #000',
      textShadow: '0 2px 8px #000',
      transition: 'transform 0.1s',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '360px' : 'none',
    };
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(ellipse at top, #2d002d 0%, #0a001a 100%)',
          color: '#f7e1ff',
          fontFamily: '"Cinzel", "Playfair Display", serif',
          textShadow: '0 2px 12px #000, 0 0 2px #b5179e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          padding: isMobile ? '32px 16px 72px' : '0',
          margin: '0',
        }}
      >
        <div style={{
          fontSize: isMobile ? '2.4em' : '3.2em',
          fontWeight: 'bold',
          color: '#ff007f',
          letterSpacing: '0.08em',
          marginBottom: isMobile ? '22px' : '30px',
          textShadow: '0 0 16px #b5179e, 0 0 8px #000',
          borderBottom: '2px solid #ff007f',
          paddingBottom: '0.2em',
          width: '100%',
          maxWidth: '600px',
        }}>
          <span style={{ fontFamily: '"UnifrakturCook", "Cinzel", serif' }}>Drain Each Other</span>
        </div>
        <div style={{
          fontSize: isMobile ? '1.8em' : '2.7em',
          color: '#fff',
          background: 'rgba(30,0,40,0.7)',
          border: '2px solid #b5179e',
          borderRadius: '18px',
          boxShadow: '0 0 24px #b5179e55',
          padding: isMobile ? '0.25em 1em' : '0.3em 1.5em',
          marginBottom: isMobile ? '28px' : '38px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          width: isMobile ? '100%' : 'auto',
        }}>
          <span style={{ color: '#ff007f', fontWeight: 900 }}>Timer:</span> {formatTime(timer)}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '18px' : '80px',
          marginBottom: isMobile ? '28px' : '38px',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          maxWidth: '700px',
        }}>
          <button
            style={{
              ...eroticButtonBase,
              background: 'linear-gradient(120deg, #ff007f 0%, #2d002d 100%)',
              border: '3px solid #b5179e',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => {
              setScore(s => ({ ...s, Wayne: s.Wayne + 1 }));
              setOrgasms(o => ({ ...o, Cindy: o.Cindy + 1 }));
            }}
          >
            <span style={{ letterSpacing: '0.04em' }}>Wayne +1</span>
          </button>
          <button
            style={{
              ...eroticButtonBase,
              background: 'linear-gradient(120deg, #b5179e 0%, #0a001a 100%)',
              border: '3px solid #ff007f',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => {
              setScore(s => ({ ...s, Cindy: s.Cindy + 1 }));
              setOrgasms(o => ({ ...o, Wayne: o.Wayne + 1 }));
            }}
          >
            <span style={{ letterSpacing: '0.04em' }}>Cindy +1</span>
          </button>
        </div>
        <div style={{
          fontSize: isMobile ? '1.4em' : '2.2em',
          color: '#fff',
          fontWeight: 'bold',
          marginTop: isMobile ? '18px' : '28px',
          background: 'rgba(30,0,40,0.7)',
          border: '2px solid #ff007f',
          borderRadius: '14px',
          padding: '0.2em 1em',
          boxShadow: '0 0 16px #ff007f55',
          width: '100%',
          maxWidth: '420px',
        }}>
          <span style={{ color: '#ff007f', fontWeight: 900 }}>Scoreboard:</span> Wayne {score.Wayne} - Cindy {score.Cindy}
        </div>
        <div style={{
          fontSize: isMobile ? '1.2em' : '1.8em',
          color: '#ff007f',
          fontWeight: 'bold',
          marginTop: isMobile ? '16px' : '22px',
          background: 'rgba(30,0,40,0.7)',
          border: '2px solid #b5179e',
          borderRadius: '14px',
          padding: '0.2em 1em',
          boxShadow: '0 0 16px #b5179e55',
          width: '100%',
          maxWidth: '420px',
        }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>Orgasms:</span> Wayne {orgasms.Wayne} &nbsp;|&nbsp; Cindy {orgasms.Cindy}
        </div>
        <div style={{
          position: isMobile ? 'relative' : 'fixed',
          bottom: isMobile ? 'unset' : '18px',
          right: isMobile ? 'unset' : '24px',
          color: '#b5179e',
          fontSize: '1.1em',
          opacity: 0.7,
          fontFamily: 'monospace',
          marginTop: isMobile ? '36px' : '0',
          textAlign: 'center',
        }}>
          <span>UCW BedChamp &bull; Erotic Wrestling</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #2d002d 0%, #0a001a 100%)',
        color: '#f7e1ff',
        fontFamily: '"Cinzel", "Playfair Display", serif',
        textShadow: '0 2px 12px #000, 0 0 2px #b5179e',
        padding: isMobile ? '32px 16px 72px' : '40px 5vw 80px',
        position: 'relative',
      }}
    >
      {showCoinFlip && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#1a001f',
              border: '2px solid #ff007f',
              borderRadius: 20,
              padding: isMobile ? '24px 28px' : '32px 48px',
              textAlign: 'center',
              boxShadow: '0 0 36px #ff007f66',
            }}
          >
            <div style={{ fontSize: isMobile ? '1.6em' : '2em', fontWeight: 700, marginBottom: 12 }}>Coin Flip</div>
            <div style={{ fontSize: isMobile ? '1.1em' : '1.35em' }}>{coinFlipResult} attacks first!</div>
          </div>
        </div>
      )}
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '10px' : '16px', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: isMobile ? '20px' : '28px', flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ fontSize: isMobile ? '1.8em' : '2.2em', fontWeight: 700 }}>{mode.name}</div>
          <div style={{ fontSize: isMobile ? '1em' : '1.15em', letterSpacing: '0.08em' }}>Round {round}</div>
          {showTimerBox && (
            <div
              style={{
                marginLeft: isMobile ? 0 : 'auto',
                fontSize: isMobile ? '1.1em' : '1.35em',
                border: '2px solid #ff007f',
                borderRadius: 14,
                padding: isMobile ? '0.3em 0.9em' : '0.35em 1.1em',
                background: 'rgba(10,0,30,0.7)',
                width: isMobile ? '100%' : 'auto',
                textAlign: isMobile ? 'left' : 'center',
              }}
            >
              <span style={{ color: '#ff007f', fontWeight: 700 }}>{timerBoxLabel}:</span> {timerBoxValue}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '14px' : '18px', marginBottom: isMobile ? '22px' : '28px', flexDirection: isMobile ? 'column' : 'row' }}>
          <div
            style={{
              flex: isMobile ? '1 1 100%' : '1 1 260px',
              background: 'rgba(10,0,30,0.65)',
              border: '1px solid #ff007f',
              borderRadius: 18,
              padding: isMobile ? '16px 18px' : '18px 20px',
            }}
          >
            <div style={{ fontSize: '1.2em', fontWeight: 700, marginBottom: 6 }}>Scoreboard</div>
            <div style={{ fontSize: '1.4em' }}>Wayne {score.Wayne} &bull; Cindy {score.Cindy}</div>
          </div>
          <div
            style={{
              flex: isMobile ? '1 1 100%' : '1 1 260px',
              background: 'rgba(10,0,30,0.65)',
              border: '1px solid #b5179e',
              borderRadius: 18,
              padding: isMobile ? '16px 18px' : '18px 20px',
            }}
          >
            <div style={{ fontSize: '1.2em', fontWeight: 700, marginBottom: 6 }}>Submissions</div>
            <div style={{ fontSize: '1.4em' }}>Wayne {submissions.Wayne} &bull; Cindy {submissions.Cindy}</div>
          </div>
          <div
            style={{
              flex: isMobile ? '1 1 100%' : '1 1 260px',
              background: 'rgba(10,0,30,0.65)',
              border: '1px solid #646cff',
              borderRadius: 18,
              padding: isMobile ? '16px 18px' : '18px 20px',
            }}
          >
            <div style={{ fontSize: '1.2em', fontWeight: 700, marginBottom: 6 }}>Attacker</div>
            <div style={{ fontSize: '1.3em' }}>{attacker}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '16px' : '24px', marginBottom: isMobile ? '24px' : '30px' }}>
          {players.map(player => {
            const maxHp = player.data.maxHp || 100;
            const hpPercent = Math.max(0, Math.round((player.data.hp / maxHp) * 100));
            return (
              <div
                key={player.key}
                style={{
                  flex: isMobile ? '1 1 100%' : '1 1 320px',
                  width: isMobile ? '100%' : 'auto',
                  background: 'rgba(8,0,24,0.78)',
                  padding: isMobile ? '18px' : '22px',
                  borderRadius: 20,
                  border: `1px solid ${player.accent}`,
                  boxShadow: '0 0 24px rgba(0,0,0,0.45)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontSize: isMobile ? '1.15em' : '1.35em', fontWeight: 700 }}>{player.key}</span>
                  <span
                    style={{
                      fontSize: isMobile ? '0.85em' : '0.92em',
                      letterSpacing: '0.08em',
                      color: attacker === player.key ? '#ff007f' : '#ccc',
                    }}
                  >
                    {attacker === player.key ? 'ATTACKING' : 'DEFENDING'}
                  </span>
                </div>
                <div style={{ height: 16, borderRadius: 999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 10 }}>
                  <div
                    style={{
                      width: `${hpPercent}%`,
                      height: '100%',
                      background: player.accent,
                      transition: 'width 0.35s ease',
                    }}
                  />
                </div>
                <div style={{ fontSize: '1em', marginBottom: 6 }}>HP {player.data.hp} / {maxHp}</div>
                <div style={{ fontSize: '0.95em', color: '#d7d7ff', marginBottom: 6 }}>Stamina {player.data.stamina}</div>
                <div style={{ fontSize: '0.95em', marginBottom: 6 }}>Submissions {submissions[player.key]}</div>
                <div style={{ fontSize: '0.95em', marginBottom: 6 }}>Score {score[player.key]}</div>
                {player.clothing && (
                  <div style={{ marginTop: 8, fontSize: '0.95em' }}>
                    <span style={{ fontSize: '1.2em', marginRight: 6 }}>{player.clothing.icon}</span>
                    {player.clothing.status}
                  </div>
                )}
                {player.key === 'Wayne' && wayneStunned && (
                  <div style={{ marginTop: 8, fontSize: '0.9em', color: '#ffb347' }}>Wayne is stunned!</div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            background: 'rgba(8,0,24,0.78)',
            borderRadius: 24,
            padding: isMobile ? '20px' : '28px',
            border: '1px solid #ff007f',
            marginBottom: isMobile ? '24px' : '28px',
          }}
        >
          <div style={{ fontSize: isMobile ? '1.3em' : '1.6em', fontWeight: 700, marginBottom: 12 }}>Current Move</div>
          {move ? (
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.35em', marginBottom: 6 }}>{move.name}</div>
              <div style={{ fontSize: '1em', color: '#f0caff', marginBottom: 4 }}>Type: {move.type}</div>
              <div style={{ fontSize: '1em', color: '#f0caff', marginBottom: 4 }}>
                Damage {move.damage} &bull; Cost {move.cost} &bull; Accuracy {move.accuracy}%
              </div>
              {move.special && (
                <div style={{ fontSize: '0.95em', color: '#ffe066', marginBottom: 8 }}>Special: {move.special}</div>
              )}
              {currentMoveDetails?.description && (
                <div style={{ fontSize: '0.95em', color: '#d7d7ff', marginBottom: 8 }}>{currentMoveDetails.description}</div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: '1.1em', color: '#f0caff' }}>{moveStatusMessage}</div>
          )}
          {!move && !moveStatusMessage && (
            <div style={{ fontSize: '1.05em', color: '#f0caff', marginTop: 8 }}>Preparing next move...</div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '18px', flexDirection: isMobile ? 'column' : 'row', width: '100%' }}>
            <button
              onClick={handleSubmit}
              disabled={actionDisabled}
              style={{
                flex: '0 0 auto',
                fontSize: '1.1em',
                padding: '0.75em 2.2em',
                borderRadius: 16,
                border: '3px solid #ff007f',
                background: actionDisabled
                  ? 'rgba(255,255,255,0.15)'
                  : 'linear-gradient(120deg, #ff007f 0%, #2d002d 90%)',
                color: '#fff',
                cursor: actionDisabled ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                textShadow: '0 2px 8px #000',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              {submitted ? 'Resolving...' : 'Execute Move'}
            </button>
            <button
              onClick={nextTurn}
              disabled={submitted || showCoinFlip}
              style={{
                flex: '0 0 auto',
                fontSize: '1.05em',
                padding: '0.7em 2em',
                borderRadius: 14,
                border: '2px solid #b5179e',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                cursor: submitted || showCoinFlip ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Force Next Turn
            </button>
            {currentMoveDetails?.image && move && (
              <button
                onClick={() => setShowImageModal({
                  name: move.name,
                  image: currentMoveDetails.image,
                  description: currentMoveDetails.description,
                })}
                style={{
                  flex: '0 0 auto',
                  fontSize: '1.05em',
                  padding: '0.7em 2em',
                  borderRadius: 14,
                  border: '2px solid #646cff',
                  background: 'rgba(100,108,255,0.15)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                View Move Art
              </button>
            )}
          </div>
          <div style={{ marginTop: 14, fontSize: '0.95em', color: '#c9c9ff' }}>{deckSummary}</div>
          {moveStatusMessage && move && (
            <div style={{ marginTop: 6, fontSize: '0.9em', color: '#ffb347' }}>{moveStatusMessage}</div>
          )}
        </div>

        <div
          style={{
            background: 'rgba(10,0,30,0.65)',
            borderRadius: 20,
            padding: isMobile ? '18px' : '22px',
            border: '1px solid #646cff',
            marginBottom: '20px',
            width: '100%',
          }}
        >
          <div style={{ fontSize: isMobile ? '1.1em' : '1.25em', fontWeight: 700, marginBottom: 6 }}>Match Log</div>
          <div style={{ fontSize: '1em', color: message ? '#fff' : '#c9c9ff' }}>
            {message || 'Awaiting the next move...'}
          </div>
          {modeKey === 'suddendeath' && finalStand && (
            <div style={{ marginTop: 10, fontSize: '1em', color: '#ffb347' }}>Final Stand triggered!</div>
          )}
        </div>

        {modeKey === 'suddendeath' && finalStand && (
          <div style={{ fontSize: isMobile ? '1.1em' : '1.35em', color: '#ffaaaa', marginTop: '10px', fontWeight: 'bold', textAlign: 'left', width: '100%' }}>
            Sudden Death Shootout Results:
            <div style={{ fontSize: '0.9em', color: '#f7e1ff', marginTop: '8px' }}>
              Wayne lasted: {shootoutTurns.Wayne || '-'} seconds
            </div>
            <div style={{ fontSize: '0.9em', color: '#f7e1ff' }}>
              Cindy lasted: {shootoutTurns.Cindy || '-'} seconds
            </div>
            <div style={{ fontSize: '1em', marginTop: '8px' }}>
              Winner: {suddenDeathWinner === 'Tie' ? 'It’s a tie!' : suddenDeathWinner || 'Pending'}
            </div>
            <div style={{ marginTop: '18px', fontSize: '0.9em' }}>
              Unique Trophy for Winner:
              <div style={{ margin: '10px 0' }}>
                Choose a reward:
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
                  <li>1. Winner gets a legendary victory photo/video with the loser (full creative control)</li>
                  <li>2. Loser must perform a dramatic entrance or exit for the winner</li>
                  <li>3. Winner receives a personalized trophy or keepsake (physical or digital)</li>
                  <li>4. Loser must give tribute to the winner (Winners Choice)</li>
                  <li>5. Winner can create a new move or rule for future matches</li>
                  <li>6. Loser must grant the winner a wish (within reason)</li>
                  <li>7. Winner gets exclusive bragging rights and a special title until next Sudden Death match</li>
                </ul>
                <div style={{ fontStyle: 'italic', color: '#f0caff' }}>(Pick your favorite or invent your own!)</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showImageModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowImageModal(null)}
        >
          <div
            style={{
              background: '#fff',
              color: '#111',
              padding: isMobile ? '18px' : '24px',
              borderRadius: 18,
              width: isMobile ? 'min(420px, 92vw)' : 'min(420px, 90vw)',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 12, fontSize: '1.4em' }}>{showImageModal.name}</h3>
            {showImageModal.image && (
              <img
                src={`/images/${showImageModal.image}`}
                alt={showImageModal.name}
                style={{ width: '100%', borderRadius: 12, marginBottom: 12 }}
              />
            )}
            {showImageModal.description && (
              <p style={{ fontSize: '0.95em', color: '#333', marginBottom: 16 }}>{showImageModal.description}</p>
            )}
            <button
              onClick={() => setShowImageModal(null)}
              style={{
                fontSize: '1em',
                padding: '0.55em 1.6em',
                borderRadius: 12,
                border: 'none',
                background: '#ff007f',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameEngine;
