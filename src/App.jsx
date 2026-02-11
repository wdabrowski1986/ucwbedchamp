

import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import GameEngine from './GameEngine.jsx';
import { MOVE_DETAILS } from './moveDetails';
import useMobile from './hooks/useMobile';

const ALL_MOVE_NAMES = Object.keys(MOVE_DETAILS);

function MainMenu({ onSelectMode, onOpenMoveSettings }) {
  const isMobile = useMobile(768);
  const buttonStyle = menuBtnStyle(isMobile);

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
        justifyContent: 'center',
        padding: isMobile ? '32px 16px 48px' : '0',
        margin: '0',
        textAlign: 'center',
      }}
    >
      <div style={{
        fontSize: isMobile ? '2.4em' : '3.2em',
        fontWeight: 'bold',
        color: '#ff007f',
        letterSpacing: '0.08em',
        marginBottom: isMobile ? '20px' : '30px',
        textShadow: '0 0 16px #b5179e, 0 0 8px #000',
        borderBottom: '2px solid #ff007f',
        paddingBottom: '0.2em',
        width: isMobile ? '100%' : 'min(90vw, 600px)',
        maxWidth: '600px',
      }}>
        <span style={{ fontFamily: '"UnifrakturCook", "Cinzel", serif' }}>Ultimate Couple Wrestling</span>
      </div>
      <div style={{
        fontSize: isMobile ? '1.6em' : '2.1em',
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
        Select Game Mode
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '16px' : '22px',
          marginBottom: isMobile ? '28px' : '36px',
          width: '100%',
          maxWidth: isMobile ? '420px' : '480px',
        }}
      >
        <button style={buttonStyle} onClick={() => onSelectMode('quick')}>Quick Match</button>
        <button style={buttonStyle} onClick={() => onSelectMode('best3')}>Best of 3</button>
        <button style={buttonStyle} onClick={() => onSelectMode('endurance')}>Endurance Match</button>
        <button style={buttonStyle} onClick={() => onSelectMode('ironwoman')}>Iron Woman</button>
        <button style={buttonStyle} onClick={() => onSelectMode('suddendeath')}>Sudden Death</button>
        <button style={buttonStyle} onClick={() => onSelectMode('practice')}>Practice Mode</button>
        <button
          style={{
            ...buttonStyle,
            background: 'linear-gradient(120deg, #ff007f 0%, #2d002d 100%)',
            border: '3px solid #b5179e',
          }}
          onClick={() => onSelectMode('eroticfight')}
        >
          Erotic Fight
        </button>
      </div>
      <div style={{ marginTop: isMobile ? '12px' : '20px', width: '100%', maxWidth: isMobile ? '360px' : 'auto' }}>
        <button
          onClick={onOpenMoveSettings}
          style={{
            fontSize: isMobile ? '1.05em' : '1.3em',
            padding: isMobile ? '0.7em 1.4em' : '0.8em 2.5em',
            borderRadius: isMobile ? 10 : 12,
            background: 'linear-gradient(90deg, #b5179e 0%, #646cff 100%)',
            color: '#fff',
            border: 'none',
            width: '100%',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 16px #b5179e55',
            letterSpacing: '0.05em',
            transition: 'background 0.2s',
          }}
        >
          ⚙️ Move Settings
        </button>
      </div>
      <div style={{
        position: isMobile ? 'relative' : 'fixed',
        bottom: isMobile ? 'unset' : '18px',
        right: isMobile ? 'unset' : '24px',
        marginTop: isMobile ? '32px' : 0,
        color: '#b5179e',
        fontSize: '1.1em',
        opacity: 0.7,
        fontFamily: 'monospace',
      }}>
        <span>UCW BedChamp &bull; Erotic Wrestling</span>
      </div>
    </div>
  );
}
// Menu button style for dark erotic theme
const menuBtnStyle = isMobile => ({
  fontSize: isMobile ? '1.1em' : '1.5em',
  padding: isMobile ? '0.65em 1.2em' : '0.7em 2.2em',
  borderRadius: isMobile ? '14px' : '18px',
  background: 'linear-gradient(120deg, #b5179e 0%, #0a001a 100%)',
  color: '#fff',
  border: '3px solid #ff007f',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 0 24px #b5179e99, 0 0 8px #000',
  textShadow: '0 2px 8px #000',
  letterSpacing: '0.04em',
  margin: 0,
  width: '100%',
  maxWidth: '100%',
  transition: 'transform 0.1s',
});


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

function App() {
  const [mode, setMode] = useState(null);
  const [enabledMoves, setEnabledMoves] = useState(() => Object.keys(MOVE_DETAILS));
  const [showMoveSettings, setShowMoveSettings] = useState(false);

  return (
    <div>
      {!mode && (
        <>
          <MainMenu
            onSelectMode={setMode}
            onOpenMoveSettings={() => setShowMoveSettings(true)}
          />
          {showMoveSettings && (
            <MoveSettingsModal
              enabledMoves={enabledMoves}
              setEnabledMoves={setEnabledMoves}
              onClose={() => setShowMoveSettings(false)}
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




