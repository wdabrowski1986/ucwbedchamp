

import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import GameEngine from './GameEngine.jsx';
import { MOVE_DETAILS } from './moveDetails';

const ALL_MOVE_NAMES = Object.keys(MOVE_DETAILS);

function MainMenu({ onSelectMode, onOpenMoveSettings }) {
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
        padding: '0',
        margin: '0',
      }}
    >
      <div style={{
        fontSize: '3.2em',
        fontWeight: 'bold',
        color: '#ff007f',
        letterSpacing: '0.08em',
        marginBottom: '30px',
        textShadow: '0 0 16px #b5179e, 0 0 8px #000',
        borderBottom: '2px solid #ff007f',
        paddingBottom: '0.2em',
        width: 'min(90vw, 600px)',
        textAlign: 'center',
      }}>
        <span style={{ fontFamily: '"UnifrakturCook", "Cinzel", serif' }}>Ultimate Couple Wrestling</span>
      </div>
      <div style={{
        fontSize: '2.1em',
        color: '#fff',
        background: 'rgba(30,0,40,0.7)',
        border: '2px solid #b5179e',
        borderRadius: '18px',
        boxShadow: '0 0 24px #b5179e55',
        padding: '0.3em 1.5em',
        marginBottom: '38px',
        fontWeight: 700,
        letterSpacing: '0.04em',
        textAlign: 'center',
      }}>
        Select Game Mode
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '36px', alignItems: 'center' }}>
        <button style={menuBtnStyle} onClick={() => onSelectMode('quick')}>Quick Match</button>
        <button style={menuBtnStyle} onClick={() => onSelectMode('best3')}>Best of 3</button>
        <button style={menuBtnStyle} onClick={() => onSelectMode('endurance')}>Endurance Match</button>
        <button style={menuBtnStyle} onClick={() => onSelectMode('ironwoman')}>Iron Woman</button>
        <button style={menuBtnStyle} onClick={() => onSelectMode('suddendeath')}>Sudden Death</button>
        <button style={menuBtnStyle} onClick={() => onSelectMode('practice')}>Practice Mode</button>
        <button style={{ ...menuBtnStyle, background: 'linear-gradient(120deg, #ff007f 0%, #2d002d 100%)', border: '3px solid #b5179e' }} onClick={() => onSelectMode('eroticfight')}>Erotic Fight</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={onOpenMoveSettings}
          style={{
            fontSize: '1.3em',
            padding: '0.8em 2.5em',
            borderRadius: 12,
            background: 'linear-gradient(90deg, #b5179e 0%, #646cff 100%)',
            color: '#fff',
            border: 'none',
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
        position: 'fixed',
        bottom: '18px',
        right: '24px',
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
const menuBtnStyle = {
  fontSize: '1.5em',
  padding: '0.7em 2.2em',
  borderRadius: '18px',
  background: 'linear-gradient(120deg, #b5179e 0%, #0a001a 100%)',
  color: '#fff',
  border: '3px solid #ff007f',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 0 24px #b5179e99, 0 0 8px #000',
  textShadow: '0 2px 8px #000',
  letterSpacing: '0.04em',
  margin: 0,
  transition: 'transform 0.1s',
};


function MoveSettingsModal({ enabledMoves, setEnabledMoves, onClose }) {
  const [showMoveModal, setShowMoveModal] = React.useState(null);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#222', color: '#fff', padding: 36, borderRadius: 16, minWidth: 380, maxWidth: 600, maxHeight: 650, overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)', border: '2px solid #646cff',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, fontSize: '2em', letterSpacing: '0.03em' }}>Move Settings</h2>
        <ul style={{ columns: 2, maxHeight: 420, overflowY: 'auto', padding: 0, margin: 0 }}>
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
          <button onClick={onClose} style={{ fontSize: '1.15em', padding: '0.7em 2em', borderRadius: 10, background: 'linear-gradient(90deg, #646cff 0%, #b5179e 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '0.04em' }}>Close</button>
        </div>
      </div>
      {showMoveModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
          <div style={{ background: '#fff', color: '#222', padding: 32, borderRadius: 16, minWidth: 320, maxWidth: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.35)', border: '2px solid #646cff', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5em', marginBottom: 12 }}>{showMoveModal}</h3>
            {MOVE_DETAILS[showMoveModal]?.image && (
              <img src={`/images/${MOVE_DETAILS[showMoveModal].image}`} alt={showMoveModal} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '2px solid #646cff', background: '#fff', marginBottom: 12 }} />
            )}
            <div style={{ color: '#444', fontSize: '1.08em', marginBottom: 18 }}>{MOVE_DETAILS[showMoveModal]?.description}</div>
            <button onClick={() => setShowMoveModal(null)} style={{ fontSize: '1.08em', padding: '0.5em 1.5em', borderRadius: 8, background: '#646cff', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Close</button>
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




