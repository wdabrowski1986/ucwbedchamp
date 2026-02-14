

import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import GameEngine from './GameEngine.jsx';
import { MOVE_DETAILS } from './moveDetails';
import useMobile from './hooks/useMobile';
import { GAME_MODES } from './gameData';

const ALL_MOVE_NAMES = Object.keys(MOVE_DETAILS);

const MODE_PREVIEWS = [
  { key: 'quick', title: 'Quick Match', blurb: 'Three minutes. Fast hands. First to submit wins. 🔥', accent: '#ff4d6d' },
  { key: 'best3', title: 'Best of 3', blurb: 'Three rounds of bodies and pleasure. Momentum is everything.', accent: '#ffb347' },
  { key: 'endurance', title: 'Endurance Match', blurb: 'Fifteen minutes of sweat and skin. Outlast them or break.', accent: '#9dffad' },
  { key: 'ironwoman', title: 'Iron Woman', blurb: 'Clothes come off at 5/10/15 min. Scream I Quit or keep going. 🥵', accent: '#ff89c2' },
  { key: 'suddendeath', title: 'Sudden Death', blurb: 'Finishers only. Land one — they answer or lose. Pure shootout. 😈', accent: '#fcd34d' },
  { key: 'practice', title: 'Practice Mode', blurb: 'No stakes. Just exploring each other\'s moves. 😏', accent: '#93c5fd' },
  { key: 'eroticfight', title: 'Erotic Fight', blurb: 'Fifteen minutes. Make each other scream. Most orgasms wins. 💦', accent: '#ff1e56', featured: true },
];

function MainMenu({ onSelectMode, onOpenMoveSettings }) {
  const isMobile = useMobile(900);

  const formatDuration = secs => {
    if (secs === null || typeof secs === 'undefined') return 'No timer';
    const minutes = Math.floor(secs / 60);
    return minutes ? `${minutes} min` : `${secs}s`;
  };

  const modeCards = MODE_PREVIEWS.map(card => {
    const config = GAME_MODES[card.key] || {};
    return {
      ...card,
      timer: formatDuration(config.duration),
      rounds: config.rounds ? `${config.rounds} rounds` : 'Single fall',
      winCondition: config.winCondition,
    };
  });

  const heroStats = [
    { label: 'Sexy Moves', value: ALL_MOVE_NAMES.length, detail: 'ways to dominate, tease & pleasure' },
    { label: 'Match Types', value: MODE_PREVIEWS.length, detail: 'pick your kink, set the mood' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#040004',
        backgroundImage: 'linear-gradient(180deg, rgba(2,0,8,0.92), rgba(5,0,6,0.85)), url(/images/ring-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        color: '#fef5ff',
        fontFamily: '"Cinzel", "Playfair Display", serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '32px 18px 48px' : '60px 5vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '70vw',
          height: '70vw',
          background: 'radial-gradient(circle, rgba(255,30,86,0.35), transparent 65%)',
          top: '-20%',
          left: '-10%',
          filter: 'blur(40px)',
          opacity: 0.75,
          animation: 'menuAurora 18s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(147,197,253,0.3), transparent 70%)',
          bottom: '-25%',
          right: '-5%',
          filter: 'blur(50px)',
          opacity: 0.6,
          animation: 'menuAurora 22s ease-in-out infinite reverse',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(300deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
            gap: isMobile ? '24px' : '42px',
            alignItems: 'stretch',
          }}
        >
          <section
            style={{
              background: 'linear-gradient(160deg, rgba(7,0,12,0.92), rgba(34,0,28,0.72))',
              border: '1px solid rgba(255,30,86,0.55)',
              borderRadius: 28,
              padding: isMobile ? '28px 22px' : '38px',
              boxShadow: '0 40px 85px rgba(0,0,0,0.55)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 20% 20%, rgba(255,91,141,0.18), transparent 55%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? 16 : 20,
              }}
            >
              <div
                style={{
                  alignSelf: 'flex-start',
                  fontSize: isMobile ? '0.85em' : '0.95em',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#ff89c2',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 999,
                  padding: '0.35em 1.4em',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                UCW BedChamp • The Bedroom Arena 🔥
              </div>
              <div style={{ fontSize: isMobile ? '2.4em' : '3.3em', lineHeight: 1.05, fontWeight: 700 }}>
                The Bed Is Your Arena
                <span style={{ color: '#ff1e56', display: 'block' }}>Bodies. Pleasure. Domination.</span>
              </div>
              <p
                style={{
                  fontSize: isMobile ? '1.05em' : '1.2em',
                  color: '#f6ddff',
                  letterSpacing: '0.02em',
                  margin: 0,
                }}
              >
                Strip, wrestle, and make each other submit. Every move is a tease. Every pin is a promise. Who breaks first?
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
                  gap: 14,
                  marginTop: 6,
                }}
              >
                {heroStats.map(stat => (
                  <div
                    key={stat.label}
                    style={{
                      border: '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 20,
                      padding: '18px 20px',
                      background: 'rgba(0,0,0,0.25)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <div style={{ fontSize: '0.85em', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c2a6ff', marginBottom: 6 }}>{stat.label}</div>
                    <div style={{ fontSize: '2em', fontWeight: 700 }}>{stat.value}</div>
                    <div style={{ fontSize: '0.95em', color: '#f3d3ff' }}>{stat.detail}</div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 12,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={onOpenMoveSettings}
                  style={{
                    flex: isMobile ? 'unset' : 1,
                    fontSize: isMobile ? '1.05em' : '1.15em',
                    padding: '0.85em 1.8em',
                    borderRadius: 18,
                    border: 'none',
                    background: 'linear-gradient(120deg, #ff1e56, #9b003c)',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 18px 32px rgba(255,30,86,0.35)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Customize Your Arsenal 💅
                </button>
                <div
                  style={{
                    flex: 1,
                    borderRadius: 18,
                    border: '1px dashed rgba(255,255,255,0.25)',
                    padding: '0.85em 1.4em',
                    fontSize: '0.95em',
                    color: '#f8e1ff',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  Pick which moves you want tonight. Enable the filthy ones. 😈
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              background: 'linear-gradient(160deg, rgba(6,0,9,0.92), rgba(12,0,18,0.8))',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 28,
              padding: isMobile ? '26px 22px' : '34px',
              boxShadow: '0 40px 75px rgba(0,0,0,0.55)',
            }}
          >
            <div style={{ marginBottom: isMobile ? 18 : 24 }}>
              <div style={{ fontSize: isMobile ? '1em' : '1.1em', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9aa5ff' }}>What are you in the mood for?</div>
              <div style={{ fontSize: isMobile ? '1.8em' : '2.2em', fontWeight: 600 }}>Pick a match. Read the rules. Then get in bed.</div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {modeCards.map(card => (
                <button
                  key={card.key}
                  onClick={() => onSelectMode(card.key)}
                  style={{
                    border: `1px solid ${card.accent}55`,
                    borderRadius: 22,
                    padding: '18px 20px',
                    background: 'rgba(255,255,255,0.02)',
                    color: '#fdf5ff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: '1.3em', fontWeight: 600 }}>{card.title}</span>
                    {card.featured && (
                      <span
                        style={{
                          fontSize: '0.75em',
                          textTransform: 'uppercase',
                          letterSpacing: '0.2em',
                          color: card.accent,
                          border: `1px solid ${card.accent}66`,
                          borderRadius: 999,
                          padding: '0.18em 0.8em',
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.98em', color: '#d9c8ff' }}>{card.blurb}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#f8e1ff', opacity: 0.8 }}>
                    <span>Timer: {card.timer}</span>
                    <span>{card.rounds}</span>
                  </div>
                  {card.winCondition && (
                    <div style={{ fontSize: '0.85em', color: '#bfc2ff', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8 }}>
                      {card.winCondition}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>
        <div
          style={{
            marginTop: isMobile ? 28 : 36,
            textAlign: 'center',
            fontSize: '0.95em',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#9a8cff',
          }}
        >
          UCW BedChamp • For couples who like it rough 💋
        </div>
      </div>
    </div>
  );
}


function MoveSettingsModal({ enabledMoves, setEnabledMoves, onClose }) {
  const [showMoveModal, setShowMoveModal] = React.useState(null);
  const isMobile = useMobile(768);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      padding: isMobile ? '16px' : 0,
    }}>
      <div style={{
        background: '#222', color: '#fff', padding: isMobile ? 24 : 36, borderRadius: isMobile ? 14 : 16, minWidth: isMobile ? 'auto' : 380,
        width: isMobile ? '90vw' : 'auto', maxWidth: 600, maxHeight: isMobile ? '80vh' : 650, overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)', border: '2px solid #646cff',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, fontSize: isMobile ? '1.4em' : '2em', letterSpacing: '0.03em' }}>Move Settings</h2>
        <ul style={{ columns: isMobile ? 1 : 2, maxHeight: isMobile ? '52vh' : 420, overflowY: 'auto', padding: 0, margin: 0 }}>
          {ALL_MOVE_NAMES.map(move => (
            <li key={move} style={{ listStyle: 'none', marginBottom: 14, width: '100%' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', cursor: 'pointer', borderRadius: 6, padding: 0, transition: 'background 0.2s' }}
                onClick={() => setShowMoveModal(move)}
              >
                <input
                  type="checkbox"
                  checked={enabledMoves.includes(move)}
                  onChange={e => {
                    if (e.target.checked) {
                      setEnabledMoves(moves => [...moves, move]);
                    } else {
                      setEnabledMoves(moves => moves.filter(m => m !== move));
                    }
                  }}
                  style={{ width: 20, height: 20 }}
                  onClick={e => e.stopPropagation()}
                />
                {MOVE_DETAILS[move]?.image && (
                  <img src={`/images/${MOVE_DETAILS[move].image}`} alt={move} style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: 6, marginRight: 8, border: '1.5px solid #646cff', background: '#fff' }} />
                )}
                <span style={{ fontWeight: 600, fontSize: '1.13em', letterSpacing: '0.01em', flex: 1 }}>{move}</span>
                <span style={{ fontSize: 18, marginLeft: 4 }}>ℹ️</span>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 32, textAlign: 'right' }}>
          <button onClick={onClose} style={{ fontSize: isMobile ? '1em' : '1.15em', padding: isMobile ? '0.6em 1.6em' : '0.7em 2em', borderRadius: 10, background: 'linear-gradient(90deg, #646cff 0%, #b5179e 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '0.04em' }}>Close</button>
        </div>
      </div>
      {showMoveModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
          <div style={{ background: '#fff', color: '#222', padding: isMobile ? 20 : 32, borderRadius: 16, minWidth: isMobile ? 'auto' : 320, width: isMobile ? '85vw' : 'min(400px, 90vw)', boxShadow: '0 8px 32px rgba(0,0,0,0.35)', border: '2px solid #646cff', textAlign: 'center' }}>
            <h3 style={{ fontSize: isMobile ? '1.25em' : '1.5em', marginBottom: 12 }}>{showMoveModal}</h3>
            {MOVE_DETAILS[showMoveModal]?.image && (
              <img src={`/images/${MOVE_DETAILS[showMoveModal].image}`} alt={showMoveModal} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '2px solid #646cff', background: '#fff', marginBottom: 12 }} />
            )}
            <div style={{ color: '#444', fontSize: isMobile ? '1em' : '1.08em', marginBottom: 18 }}>{MOVE_DETAILS[showMoveModal]?.description}</div>
            <button onClick={() => setShowMoveModal(null)} style={{ fontSize: isMobile ? '1em' : '1.08em', padding: '0.5em 1.5em', borderRadius: 8, background: '#646cff', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: isMobile ? '100%' : 'auto' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ModeRulesModal({ modeKey, onConfirm, onCancel }) {
  const config = GAME_MODES[modeKey];
  const isMobile = useMobile(768);
  if (!config) return null;

  const formatDuration = secs => {
    if (secs === null) return 'No timer';
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return seconds ? `${minutes}m ${seconds}s` : `${minutes} min`;
  };

  const stats = [
    { label: 'Rounds', value: config.rounds },
    { label: 'Timer', value: formatDuration(config.duration) },
    { label: 'Starting HP', value: config.startingHp ? `${config.startingHp} HP` : 'Standard' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.78)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1500,
        padding: isMobile ? '16px' : 0,
      }}
    >
      <div
        style={{
          background: 'linear-gradient(160deg, #140014, #030008)',
          color: '#f7e1ff',
          padding: isMobile ? '24px' : '36px',
          borderRadius: isMobile ? 16 : 22,
          width: isMobile ? '92vw' : 'min(520px, 90vw)',
          boxShadow: '0 25px 55px rgba(0,0,0,0.55)',
          border: '2px solid #b5179e',
          textAlign: 'left',
          position: 'relative',
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: isMobile ? 16 : 20,
            fontSize: isMobile ? '1.8em' : '2.2em',
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}
        >
          {config.name}
        </h2>
        <div
          style={{
            fontSize: isMobile ? '1.05em' : '1.2em',
            marginBottom: isMobile ? 18 : 24,
            color: '#ffd6ff',
          }}
        >
          {config.winCondition}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: isMobile ? 20 : 28 }}>
          {stats.map(stat => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: isMobile ? '1em' : '1.1em',
                padding: '0.4em 0.2em',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span style={{ color: '#ff79c6', letterSpacing: '0.03em' }}>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row' }}>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              fontSize: isMobile ? '1.05em' : '1.15em',
              padding: isMobile ? '0.7em 1em' : '0.8em 1.2em',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(120deg, #ff007f, #c21807)',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 12px 24px rgba(255,0,128,0.35)',
            }}
          >
            Let's Do This 🔥
          </button>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              fontSize: isMobile ? '1.05em' : '1.15em',
              padding: isMobile ? '0.7em 1em' : '0.8em 1.2em',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.05)',
              color: '#f7e1ff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Not Yet
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState(null);
  const [enabledMoves, setEnabledMoves] = useState(() => Object.keys(MOVE_DETAILS));
  const [showMoveSettings, setShowMoveSettings] = useState(false);
  const [pendingMode, setPendingMode] = useState(null);
  const [showModeRules, setShowModeRules] = useState(false);

  const handleModeIntent = modeKey => {
    setPendingMode(modeKey);
    setShowModeRules(true);
  };

  const confirmModeSelection = () => {
    if (!pendingMode) return;
    setMode(pendingMode);
    setShowModeRules(false);
    setPendingMode(null);
  };

  const cancelModeSelection = () => {
    setPendingMode(null);
    setShowModeRules(false);
  };

  return (
    <div>
      {!mode && (
        <>
          <MainMenu
            onSelectMode={handleModeIntent}
            onOpenMoveSettings={() => setShowMoveSettings(true)}
          />
          {showMoveSettings && (
            <MoveSettingsModal
              enabledMoves={enabledMoves}
              setEnabledMoves={setEnabledMoves}
              onClose={() => setShowMoveSettings(false)}
            />
          )}
          {showModeRules && pendingMode && (
            <ModeRulesModal
              modeKey={pendingMode}
              onConfirm={confirmModeSelection}
              onCancel={cancelModeSelection}
            />
          )}
        </>
      )}
      {mode === 'eroticfight' && <GameEngine modeKey="eroticfight" enabledMoves={enabledMoves} />}
      {mode && mode !== 'eroticfight' && <GameEngine modeKey={mode} enabledMoves={enabledMoves} />}
    </div>
  );
}

export default App;




