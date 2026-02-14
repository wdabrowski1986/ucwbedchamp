import React, { useState, useEffect, useCallback } from 'react';
import { PLAYER_WAYNE, PLAYER_CINDY, GAME_MODES, CLOTHING_LAYERS } from './gameData';
import { MOVE_DETAILS } from './moveDetails';
import useMobile from './hooks/useMobile';
const MOVES = [
  // General Moves (either player)
  { name: 'Sit On Top', type: 'Physical', damage: 20, cost: 15, accuracy: 85, special: '' },
  { name: 'Bear Hug Hold', type: 'Challenge', damage: 25, cost: 20, accuracy: 80, special: 'Crush them against you until they melt' },
  { name: 'Body Slam', type: 'Strike', damage: 15, cost: 10, accuracy: 90, special: '' },
  { name: 'Belly Tickle', type: 'Strike', damage: 18, cost: 12, accuracy: 88, special: '' },
  { name: 'Chest Poke', type: 'Strike', damage: 17, cost: 11, accuracy: 89, special: '' },
  { name: 'Booty Slap', type: 'Strike', damage: 19, cost: 13, accuracy: 87, special: '' },
  { name: 'Thigh Squeeze', type: 'Strike', damage: 16, cost: 10, accuracy: 90, special: '' },
  { name: '69 Pin', type: 'Physical', damage: 30, cost: 25, accuracy: 75, special: 'Both pinned, both tasting — nobody escapes' },
  { name: 'Leg Tangle', type: 'Physical', damage: 15, cost: 15, accuracy: 90, special: '' },
  { name: 'Slow Dance', type: 'Sensual', damage: -10, cost: 5, accuracy: 95, special: 'Healing' },
  // Cindy's Moves
  { name: 'Lap Sit', type: 'Strike', damage: 25, cost: 20, accuracy: 90, special: '', character: 'Cindy' },
  { name: 'Foot Rub Tease', type: 'Sensual', damage: -10, cost: 5, accuracy: 100, special: 'Healing', character: 'Cindy' },
  { name: 'Thigh Clamp', type: 'Challenge', damage: 40, cost: 35, accuracy: 80, special: 'Lock your thighs around his head and squeeze', character: 'Cindy' },
  { name: 'Below-the-Belt Grab', type: 'Strike', damage: 20, cost: 20, accuracy: 90, special: '', character: 'Cindy' },
  { name: 'Sit On Face', type: 'Smother', damage: 45, cost: 40, accuracy: 75, special: 'Lower yourself onto his face and stay', character: 'Cindy' },
  // Wayne's Moves
  { name: 'Spread & Hold', type: 'Physical', damage: 30, cost: 15, accuracy: 90, special: 'Spread her legs open and keep them there', character: 'Wayne' },
  { name: 'Leg Trap', type: 'Physical', damage: 16, cost: 10, accuracy: 95, special: '', character: 'Wayne' },
  { name: 'Tight Squeeze', type: 'Strike', damage: 23, cost: 10, accuracy: 90, special: '', character: 'Wayne' },
  { name: 'Neck Kiss', type: 'Sensual', damage: -10, cost: 10, accuracy: 95, special: 'Healing', character: 'Wayne' },
  // Sensual Relaxation Moves
  { name: 'Deep Kiss', type: 'Sensual', damage: -5, cost: 5, accuracy: 100, special: 'Kiss deep and slow — no stopping until you both need air' },
  { name: 'Light Touch Tease', type: 'Sensual', damage: -5, cost: 5, accuracy: 100, special: 'Feather-light fingertips across bare skin until they shiver' },
  { name: 'Full Body Massage', type: 'Sensual', damage: -10, cost: 5, accuracy: 100, special: 'Hands-on massage from shoulders to thighs until they moan' },
  { name: 'Heartbeat Listen', type: 'Sensual', damage: 0, cost: 0, accuracy: 100, special: 'Head on bare chest, feel their heartbeat until you both calm down' },
  // Cindy's Erotic Moves
  { name: 'Booty Smother', type: 'Smother', damage: 40, cost: 30, accuracy: 80, special: 'Plant your ass on his face and grind', character: 'Cindy' },
  { name: 'Scissor Stroke', type: 'Challenge', damage: 40, cost: 30, accuracy: 80, special: 'Wrap your legs around him and stroke while you squeeze', character: 'Cindy' },
  { name: 'Pin & Sit', type: 'Smother', damage: 35, cost: 25, accuracy: 80, special: 'Pin his arms and sit on his face', character: 'Cindy' },
  { name: 'Face Drop', type: 'Strike', damage: 25, cost: 15, accuracy: 90, special: 'Drop onto his face — quick and heavy', character: 'Cindy' },
  { name: 'Body Cage', type: 'Physical', damage: 30, cost: 20, accuracy: 85, special: 'Wrap your whole body around him so he cannot move', character: 'Cindy' },
  { name: 'Head Trap Stroke', type: 'Challenge', damage: 45, cost: 35, accuracy: 75, special: 'Trap his head between your thighs and stroke him', character: 'Cindy' },
  { name: 'Squeeze & Press', type: 'Challenge', damage: 40, cost: 30, accuracy: 80, special: 'Squeeze his head with your thighs and press your chest on him', character: 'Cindy' },
  { name: 'Kneeling Smother', type: 'Smother', damage: 30, cost: 20, accuracy: 85, special: 'Kneel over him and press your chest into his face', character: 'Cindy' },
  { name: 'Ride & Stroke', type: 'Challenge', damage: 40, cost: 30, accuracy: 80, special: 'Sit on top of him and stroke while you ride', character: 'Cindy' },
  { name: 'Reverse Sit', type: 'Smother', damage: 40, cost: 30, accuracy: 80, special: 'Sit on his face facing his feet — he sees everything', character: 'Cindy' },
  { name: 'Standing Stroke', type: 'Strike', damage: 25, cost: 15, accuracy: 90, special: 'Stand in front of him and stroke until he shakes', character: 'Cindy' },
  { name: 'Bend Over Stroke', type: 'Challenge', damage: 35, cost: 25, accuracy: 85, special: 'Bend him over and stroke from behind', character: 'Cindy' },
  { name: 'Thigh Ride', type: 'Sensual', damage: 25, cost: 20, accuracy: 85, special: 'Both naked — grind between bare thighs', character: 'Cindy' },
  { name: 'Foot Trap Tease', type: 'Challenge', damage: 30, cost: 20, accuracy: 85, special: 'Trap him with your legs and tease with your feet', character: 'Cindy' },
  { name: 'Wrestling Smother', type: 'Smother', damage: 35, cost: 25, accuracy: 85, special: 'Pin him down wrestling-style and smother with your chest', character: 'Cindy' },
  { name: 'Pin & Taste', type: 'Sensual', damage: 30, cost: 25, accuracy: 85, special: 'Pin him down and use your mouth on him', character: 'Cindy' },
  // Wayne's Erotic Moves
  { name: 'Booty Tease', type: 'Sensual', damage: 15, cost: 10, accuracy: 95, special: 'Tease and caress her ass until she squirms', character: 'Wayne' },
  { name: 'Rear Grind', type: 'Physical', damage: 20, cost: 15, accuracy: 90, special: 'Press against her from behind and grind slow', character: 'Wayne' },
  { name: 'Arch & Suck', type: 'Physical', damage: 35, cost: 25, accuracy: 80, special: 'Bend her back over your knee and suck her chest', character: 'Wayne' },
  { name: 'Standing Thigh Press', type: 'Physical', damage: 25, cost: 15, accuracy: 90, special: 'Press between her thighs while standing', character: 'Wayne' },
  { name: 'Face Bury', type: 'Sensual', damage: 20, cost: 15, accuracy: 90, special: 'Push her onto her back and bury your face between her thighs', character: 'Wayne' },
  { name: 'Wall Press', type: 'Physical', damage: 25, cost: 15, accuracy: 90, special: 'Pin her against the wall with your body and grind', character: 'Wayne' },
  { name: 'Hair Pull Kiss', type: 'Strike', damage: 20, cost: 10, accuracy: 95, special: 'Grab her hair and pull her into a deep kiss', character: 'Wayne' },
  { name: 'Flip & Mount', type: 'Physical', damage: 30, cost: 20, accuracy: 85, special: 'Flip her onto her stomach and lay on top', character: 'Wayne' },
  { name: 'Chest Bite', type: 'Strike', damage: 22, cost: 12, accuracy: 90, special: 'Kiss down her chest and bite just hard enough', character: 'Wayne' },
  { name: 'Over-the-Knee', type: 'Challenge', damage: 28, cost: 20, accuracy: 85, special: 'Pull her across your lap and spank until she begs', character: 'Wayne' },
  { name: 'Hold & Taste', type: 'Sensual', damage: 30, cost: 25, accuracy: 85, special: 'Pin her down and put your mouth on her', character: 'Wayne' },
  { name: 'Whispering Pin', type: 'Sensual', damage: 15, cost: 10, accuracy: 95, special: 'Pin her down and whisper dirty things in her ear', character: 'Wayne' },
  { name: 'Shoulder Bite', type: 'Strike', damage: 18, cost: 10, accuracy: 92, special: 'Kiss her neck then bite her shoulder while gripping her waist', character: 'Wayne' },
  { name: 'Tongue Trail', type: 'Sensual', damage: 20, cost: 15, accuracy: 90, special: 'Drag your tongue slow from her belly up to her neck', character: 'Wayne' },
  { name: 'Pin & Grind', type: 'Physical', damage: 30, cost: 20, accuracy: 85, special: 'Pin her wrists and grind your hips slow against hers', character: 'Wayne' },
  { name: 'Thigh Bite', type: 'Strike', damage: 22, cost: 12, accuracy: 90, special: 'Kiss up her inner thigh and bite where it is soft', character: 'Wayne' },
  // Shared Erotic Moves
  { name: 'Hug & Grind', type: 'Sensual', damage: -15, cost: 5, accuracy: 100, special: 'Both naked — wrap around each other and grind skin-on-skin' },
  // Cindy's Finishers (Sudden Death Only)
  { name: 'SIT & SMOTHER', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Climb on and grind down until he taps', character: 'Cindy' },
  { name: 'THIGH LOCK', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Lock your thighs around him and squeeze until he begs', character: 'Cindy' },
  { name: 'FULL WEIGHT DROP', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Drop every curve onto him — no mercy', character: 'Cindy' },
  { name: 'BODY WRAP', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Wrap every limb around him skin-to-skin', character: 'Cindy' },
  { name: 'TOTAL COVER', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Lay flat on him — every inch covered, nowhere to go', character: 'Cindy' },
  { name: 'SQUEEZE & HOLD', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Coil around him and squeeze until he trembles', character: 'Cindy' },
  { name: 'SIT & SCRATCH', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Mount him and drag your nails down his chest', character: 'Cindy' },
  // Wayne's Finishers (Sudden Death Only)
  { name: 'FULL WEIGHT PIN', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Press every pound onto her — she feels all of you', character: 'Wayne' },
  { name: 'SIDE CRUSH', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Crush her against your body from the side', character: 'Wayne' },
  { name: 'ALL-OVER PRESS', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Pin and press her everywhere — total domination', character: 'Wayne' },
  { name: 'BODY GRIND', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Grind slow against her until she surrenders', character: 'Wayne' },
  { name: 'POWER PIN', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Slam her shoulders down and lean in close until she taps', character: 'Wayne' },
  { name: 'DEVOUR', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Pin her legs open and put your mouth on her until she breaks', character: 'Wayne' },
  { name: 'TOTAL LOCKDOWN', type: 'Finisher', damage: 100, cost: 0, accuracy: 100, special: 'Wrap every limb around her and squeeze until she cannot breathe', character: 'Wayne' },
];

const DUNGEON_THEME = {
  background: 'radial-gradient(circle at 12% -8%, #1a0004 0%, #050104 48%, #000000 100%)',
  velvetGlow: 'radial-gradient(circle at 40% 20%, rgba(229, 9, 20, 0.2), transparent 55%)',
  lattice: 'repeating-linear-gradient(135deg, rgba(255, 36, 46, 0.05) 0 2px, transparent 2px 80px)',
  panel: 'linear-gradient(165deg, rgba(6,0,2,0.95), rgba(26,0,6,0.82))',
  softPanel: 'linear-gradient(160deg, rgba(12,0,4,0.9), rgba(40,0,10,0.72))',
  borderPrimary: 'rgba(229, 9, 20, 0.7)',
  borderSecondary: 'rgba(255, 75, 43, 0.55)',
  glowPrimary: '0 0 32px rgba(229, 9, 20, 0.38)',
  glowSecondary: '0 0 24px rgba(255, 75, 43, 0.35)',
  neonPink: '#ff1e56',
  neonViolet: '#c21807',
  ember: '#ffb347',
  textMuted: '#d9b2b2',
};

const MAX_CLOTHING_LAYER = CLOTHING_LAYERS.reduce(
  (max, layer) => Math.max(max, layer?.layer ?? 0),
  0
);

const SUBMISSION_TYPES = new Set(['Physical', 'Challenge', 'Smother', 'Finisher']);

function getRingName(key) {
  if (key === 'Wayne') return PLAYER_WAYNE?.name || 'Wayne';
  if (key === 'Cindy') return PLAYER_CINDY?.name || 'Cindy';
  if (typeof key === 'string') return key;
  return 'Unknown';
}

const VICTORY_TALES = {
  default: [
    ({ winner, loser }) => `${winner} presses ${loser}'s lips to their thigh and refuses to release until every inch is worshipped.`,
    ({ winner, loser }) => `${winner} straddles the mattress throne while ${loser} kneads tired muscles and murmurs praises.`,
    ({ winner, loser }) => `${winner} knots ${loser} in satin sheets and orders a slow trail of kisses from ankle to hip.`,
    ({ winner, loser }) => `${winner} hooks ${loser}'s wrists overhead and makes them chant devotion between each kiss.`,
    ({ winner, loser }) => `${winner} lounges with one heel on ${loser}'s back, guiding their mouth wherever worship is owed.`,
    ({ winner, loser }) => `${winner} keeps ${loser} kneeling and counts down points while they kiss along every muscle.`,
    ({ winner, loser }) => `${winner} blindfolds ${loser} and demands worship by touch alone until the tremors stop.`,
    ({ winner, loser }) => `${winner} pulls ${loser} into their lap and makes them whisper gratitude for each earned bruise.`,
    ({ winner, loser, scoreLine }) => `${winner} taps the ${scoreLine} scoreboard and commands ${loser} to kiss from toes to lips for every digit.`,
    ({ winner, loser, submissionLine }) => `${winner} makes ${loser} count the ${submissionLine} submission edge with kisses pressed to their arches.`,
  ],
  modes: {
    suddendeath: [
      ({ winner, loser }) => `${winner} freezes ${loser} in the finisher pose and makes them worship the limb that trapped them.`,
      ({ winner, loser }) => `${winner} marches ${loser} around the mattress, forcing kisses on every bruised spot from the choke-out.`,
    ],
    ironwoman: [
      ({ winner, loser }) => `${winner} makes ${loser} recite every Iron Woman minute while kissing sweat-soaked skin.`,
      ({ winner, loser }) => `${winner} seats ${loser} at their feet and demands calf-to-hip worship for surviving the clock.`,
    ],
    eroticfight: [
      ({ winner, loser, scoreLine }) => `${winner} spritzes the scoreboard (${scoreLine}) and makes ${loser} lick every droplet from their torso.`,
      ({ winner, loser }) => `${loser} recites the orgasm tally on their knees while ${winner} steers their mouth wherever they please.`,
    ],
    quick: [
      ({ winner, loser }) => `${winner} snaps fingers and orders ${loser} back to stance so they can worship between sprints.`,
      ({ winner, loser }) => `${winner} keeps ${loser} braced on the posts kissing their knuckles before the next rush.`,
    ],
  },
  finisher: [
    ({ winner, loser }) => `${winner} eases out of the finishing hold just enough to force kisses along the limb that sealed it.`,
    ({ winner, loser }) => `${loser} trembles while ${winner} guides their mouth along the path of the finisher.`,
  ],
};

const DAMAGE_MODIFIERS = {
  default: 0.65,
  Strike: 0.5,
};

function getEffectiveDamage(move, modeKey) {
  void modeKey;
  if (!move || typeof move.damage !== 'number') return 0;
  if (move.type === 'Finisher') return move.damage;

  const modifier = DAMAGE_MODIFIERS[move.type] ?? DAMAGE_MODIFIERS.default ?? 1;
  const scaledMagnitude = Math.max(1, Math.round(Math.abs(move.damage) * modifier));
  return move.damage >= 0 ? scaledMagnitude : -scaledMagnitude;
}

function compareExposureEdge(state) {
  if (!state?.clothingLayers) return null;
  const exposureScores = {
    Wayne: MAX_CLOTHING_LAYER - (state.clothingLayers.Cindy ?? MAX_CLOTHING_LAYER),
    Cindy: MAX_CLOTHING_LAYER - (state.clothingLayers.Wayne ?? MAX_CLOTHING_LAYER),
  };
  return compareMetric(
    exposureScores.Wayne,
    exposureScores.Cindy,
    'Wardrobe Damage',
    ({ winner, loser, winnerValue, loserValue }) => {
      const tiers = Math.abs(winnerValue - loserValue);
      const tierLabel = tiers === 1 ? 'one tier' : `${tiers} tiers`;
      return `${getRingName(winner)} left ${getRingName(loser)} ${tierLabel} more exposed.`;
    }
  );
}

function suddenDeathResolver(state) {
  if (state?.lastResolvedMove && state.lastResolvedMove.by && state.lastResolvedMove.resolved !== false) {
    const winner = state.lastResolvedMove.by;
    return {
      winner,
      method: 'Final Execution',
      detail: `${getRingName(winner)} sealed it with ${state.lastResolvedMove.name}.`,
    };
  }
  return compareDamageEdge(state, 'Damage Edge');
}

function practiceResolver(state) {
  if (!state?.coinFlipResult) return null;
  const winner = state.coinFlipResult;
  return {
    winner,
    method: 'Coach Coin Toss',
    detail: `${getRingName(winner)} keeps bragging rights from the opening flip.`,
  };
}

function eroticFightResolver(state) {
  const pleasure = compareMetric(
    state?.score?.Wayne ?? 0,
    state?.score?.Cindy ?? 0,
    'Pleasure Points',
    ({ winner, loser, winnerValue, loserValue }) => `${getRingName(winner)} piled up ${winnerValue} pleasure points to ${loserValue}.`
  );
  if (pleasure) return pleasure;
  const orgasmPressure = {
    Wayne: state?.orgasms?.Cindy ?? 0,
    Cindy: state?.orgasms?.Wayne ?? 0,
  };
  return compareMetric(
    orgasmPressure.Wayne,
    orgasmPressure.Cindy,
    'Orgasm Count',
    ({ winner, loser, winnerValue, loserValue }) => `${getRingName(winner)} pushed ${getRingName(loser)} to ${winnerValue} orgasms (gave up ${loserValue}).`
  );
}

const MODE_TIEBREAKERS = {
  quick: state => compareSubmissionsEdge(state, 'Submission Edge'),
  best3: state => compareDamageEdge(state, 'Total Damage') || compareSubmissionsEdge(state, 'Submission Edge'),
  endurance: state => compareDamageEdge(state, 'Attrition Edge') || compareSubmissionsEdge(state, 'Submission Edge'),
  ironwoman: state => compareExposureEdge(state) || compareSubmissionsEdge(state, 'Submission Edge'),
  suddendeath: state => suddenDeathResolver(state),
  practice: state => practiceResolver(state),
  eroticfight: state => eroticFightResolver(state),
};

function resolveModeTiebreaker(modeKey, state) {
  const resolver = MODE_TIEBREAKERS[modeKey];
  const resolved = resolver ? resolver(state) : null;
  if (resolved) return resolved;
  return compareSubmissionsEdge(state, 'Submission Edge')
    || compareDamageEdge(state, 'Damage Edge')
    || null;
}

const TIE_TALES = [
  () => 'Both lovers collapse in a knot of limbs — no one owns the bed tonight.',
  () => 'They sprawl side by side and promise to make each other worship harder in the rematch.',
  ({ modeKey }) => modeKey === 'ironwoman'
    ? 'Hours melt away with neither warrior breaking — the clock surrenders instead.'
    : 'The arena lights dim while they agree the next bout decides everything.',
];

const WIN_HEADLINES = [
  ({ winner }) => `${winner} Rules the Bed`,
  ({ winner }) => `${winner}'s Velvet Reign`,
  ({ winner }) => `${winner} Claims the Crimson Crown`,
];

const WIN_SUBHEADINGS = [
  ({ winner, loser }) => `${winner} plants ${loser} between their knees and demands worship as tribute.`,
  ({ winner, loser, scoreLine }) => `${winner} dominates ${loser} ${scoreLine} and makes them whisper praise between every breath.`,
  ({ winner, loser, submissionLine }) => `${winner} rides a ${submissionLine} submission edge and turns ${loser} into a trembling worshipper.`,
];

const TIE_HEADLINES = [
  () => 'Velvet Deadlock',
  () => 'Double Knockout',
  () => 'Devotion Deferred',
];

const TIE_SUBHEADINGS = [
  ({ modeKey }) => modeKey === 'ironwoman'
    ? 'The Iron Woman clock quits before either fighter does.'
    : 'No throne claimed — both lovers collapse before anyone can demand worship.',
  () => 'Sweat, silk, and stalemate — devotion postponed.',
];

function pickTemplate(templates, context) {
  if (!Array.isArray(templates) || templates.length === 0) return '';
  const factory = templates[Math.floor(Math.random() * templates.length)];
  if (typeof factory === 'function') {
    return factory(context);
  }
  return factory || '';
}

function pickVictoryTale(context) {
  const { modeKey, finishingMoveType } = context;
  const pools = [];
  if (finishingMoveType === 'Finisher' && VICTORY_TALES.finisher.length) {
    pools.push(VICTORY_TALES.finisher);
  }
  if (VICTORY_TALES.modes[modeKey]?.length) {
    pools.push(VICTORY_TALES.modes[modeKey]);
  }
  if (VICTORY_TALES.default.length) {
    pools.push(VICTORY_TALES.default);
  }
  const combined = pools.flat();
  if (combined.length === 0) {
    return `${context.winner} keeps ${context.loser} kneeling, demanding worship until the next challenge.`;
  }
  const lineFactory = combined[Math.floor(Math.random() * combined.length)];
  return lineFactory(context);
}

// ...existing code...

function getClothingLayer(hp) {
  for (const layer of CLOTHING_LAYERS) {
    if (hp >= layer.threshold) return layer;
  }
  return CLOTHING_LAYERS[CLOTHING_LAYERS.length - 1];
}

const rollAttacker = () => (Math.random() < 0.5 ? 'Wayne' : 'Cindy');


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
      if (!move || matchWinner) return;
      setSubmitted(true);
      setLastResolvedMove({ name: move.name, type: move.type, by: attacker, resolved: true });
      setLastMoveName(prev => ({ ...prev, [attacker]: move.name }));
      setLastMoveType(prev => ({ ...prev, [attacker]: move.type }));
      if (move.type) {
        setTypeHistory(prev => {
          const history = [...(prev[attacker] || []), move.type].slice(-3);
          return { ...prev, [attacker]: history };
        });
      }
      const defender = attacker === 'Wayne' ? 'Cindy' : 'Wayne';
      const attackerName = getRingName(attacker);
      const defenderName = getRingName(defender);

      // Sudden Death Shootout: no HP damage, purely submission-based
      if (modeKey === 'suddendeath') {
        setSubmissions(sub => ({ ...sub, [attacker]: sub[attacker] + 1 }));
        setScore(s => ({ ...s, [attacker]: (s[attacker] ?? 0) + 1 }));
        if (sdPendingAnswer === null) {
          setSdPendingAnswer(attacker);
          postMatchMessage(`${attackerName} locks in ${move.name} and scores! ${defenderName} must answer!`);
        } else {
          setSdPendingAnswer(null);
          postMatchMessage(`${attackerName} answers with ${move.name}! Scores are even — the shootout continues!`);
        }
        setTimeout(nextTurn, 1200);
        return;
      }

      const damageValue = typeof move.damage === 'number' ? getEffectiveDamage(move, modeKey) : 0;
      let damageMessage = '';

      if (damageValue > 0) {
        if (defender === 'Wayne') {
          setWayne(prev => ({ ...prev, hp: Math.max(0, prev.hp - damageValue) }));
        } else {
          setCindy(prev => ({ ...prev, hp: Math.max(0, prev.hp - damageValue) }));
        }
        damageMessage = `${attackerName} landed ${move.name} for ${damageValue} damage.`;
      } else if (damageValue < 0) {
        const healAmount = Math.abs(damageValue);
        if (attacker === 'Wayne') {
          setWayne(prev => ({ ...prev, hp: Math.min(prev.maxHp || 100, prev.hp + healAmount) }));
        } else {
          setCindy(prev => ({ ...prev, hp: Math.min(prev.maxHp || 100, prev.hp + healAmount) }));
        }
        damageMessage = `${attackerName} used ${move.name} and restored ${healAmount} HP.`;
      }

      const causesSubmission = move.type ? SUBMISSION_TYPES.has(move.type) : false;
      let finalMessage = '';
      if (causesSubmission) {
        setSubmissions(sub => ({
          ...sub,
          [attacker]: sub[attacker] + 1,
        }));
        setScore(scoreboard => ({
          ...scoreboard,
          [attacker]: (scoreboard[attacker] ?? 0) + 1,
        }));
        finalMessage = damageMessage
          ? `${attackerName} performed ${move.name} and scored a submission! ${damageMessage}`
          : `${attackerName} performed ${move.name} and scored a submission!`;
      } else if (damageMessage) {
        finalMessage = damageMessage;
      } else {
        finalMessage = `${attackerName} performed ${move.name}.`;
      }

      postMatchMessage(finalMessage);

      setTimeout(nextTurn, 1200);
    }

    function handleEscape() {
      if (!move || matchWinner) return;
      setSubmitted(true);
      setLastResolvedMove({ name: move.name, type: move.type, resolved: false });
      setLastMoveName(prev => ({ ...prev, [attacker]: move.name }));
      setLastMoveType(prev => ({ ...prev, [attacker]: move.type }));
      if (move.type) {
        setTypeHistory(prev => {
          const history = [...(prev[attacker] || []), move.type].slice(-3);
          return { ...prev, [attacker]: history };
        });
      }
      const defender = attacker === 'Wayne' ? 'Cindy' : 'Wayne';
      const defenderName = getRingName(defender);

      // Sudden Death Shootout: if pending answer and answering player's finisher was escaped, they lose
      if (modeKey === 'suddendeath' && sdPendingAnswer !== null && sdPendingAnswer !== attacker) {
        postMatchMessage(`${defenderName} escapes ${move.name}! ${getRingName(sdPendingAnswer)} wins the shootout!`);
        setSuddenDeathWinner(sdPendingAnswer);
        setTimeout(nextTurn, 1200);
        return;
      }

      postMatchMessage(`${defenderName} escapes ${move.name} — the worship session will have to wait!`);
      setTimeout(nextTurn, 1200);
    }
  const [attacker, setAttacker] = useState(rollAttacker);
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
  const [sdPendingAnswer, setSdPendingAnswer] = useState(null);
  const [score, setScore] = useState({ Wayne: 0, Cindy: 0 });
  const [wayneStunned, setWayneStunned] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [matchLog, setMatchLog] = useState([]);
  const [submissions, setSubmissions] = useState({ Wayne: 0, Cindy: 0 });
  const [matchWinner, setMatchWinner] = useState(null);
  const [victoryQuote, setVictoryQuote] = useState('');
  const [victoryHeading, setVictoryHeading] = useState('');
  const [victorySubheading, setVictorySubheading] = useState('');
  const [lastResolvedMove, setLastResolvedMove] = useState(null);
  const isMobile = useMobile(768);
  const postMatchMessage = useCallback(text => {
    if (!text) return;
    setMessage(text);
    setMatchLog(prev => [...prev, text]);
  }, []);

  // Deck system for move selection
  const [moveDeck, setMoveDeck] = useState([]);
  const [usedMoves, setUsedMoves] = useState({ Wayne: [], Cindy: [] });
  const [lastMoveName, setLastMoveName] = useState({ Wayne: null, Cindy: null });
  const [lastMoveType, setLastMoveType] = useState({ Wayne: null, Cindy: null });
  const [typeHistory, setTypeHistory] = useState({ Wayne: [], Cindy: [] });
  const [recentMoves, setRecentMoves] = useState({ Wayne: [], Cindy: [] });

  const resetMatch = () => {
    const freshAttacker = rollAttacker();
    setAttacker(freshAttacker);
    setCoinFlipResult(freshAttacker);
    setShowCoinFlip(true);
    setShowImageModal(null);
    setStrikeTimer(0);
    setRound(1);
    setTimer(modeKey === 'ironwoman' ? 0 : mode.duration);
    setIronWomanWinner(null);
    setWayne({ ...PLAYER_WAYNE });
    setCindy({ ...PLAYER_CINDY });
    setMove(null);
    setFinalStand(false);
    setShootoutTurns({ Wayne: null, Cindy: null });
    setShootoutStep(0);
    setSuddenDeathWinner(null);
    setSdPendingAnswer(null);
    setScore({ Wayne: 0, Cindy: 0 });
    setOrgasms({ Wayne: 0, Cindy: 0 });
    setWayneStunned(false);
    setSubmitted(false);
    setMessage('');
    setMatchLog([]);
    setSubmissions({ Wayne: 0, Cindy: 0 });
    setMatchWinner(null);
    setVictoryQuote('');
    setVictoryHeading('');
    setVictorySubheading('');
    setLastResolvedMove(null);
    setMoveDeck([]);
    setUsedMoves({ Wayne: [], Cindy: [] });
    setLastMoveName({ Wayne: null, Cindy: null });
    setLastMoveType({ Wayne: null, Cindy: null });
    setTypeHistory({ Wayne: [], Cindy: [] });
    setRecentMoves({ Wayne: [], Cindy: [] });
  };

  function buildMoveDeck() {
    // Use only enabled moves and filter by attacker
    let filteredMoves = MOVES.filter(m => enabledMoves.includes(m.name));
    if (attacker === 'Wayne') {
      filteredMoves = filteredMoves.filter(m => !m.character || m.character === 'Wayne');
    } else if (attacker === 'Cindy') {
      filteredMoves = filteredMoves.filter(m => !m.character || m.character === 'Cindy');
    }
    if (modeKey !== 'suddendeath' && modeKey !== 'ironwoman') {
      filteredMoves = filteredMoves.filter(m => m.type !== 'Finisher');
    }
    // Assign weights: General (Physical/Challenge/Sensual) = 3, Character-specific = 2, Finisher = 1
    let deck = [];
    filteredMoves.forEach(m => {
      let weight = 1;
      if (m.type === 'Finisher') weight = 1;
      else if (['Lap Sit', 'Foot Rub Tease', 'Thigh Clamp', 'Below-the-Belt Grab', 'Sit On Face', 'Spread & Hold', 'Leg Trap', 'Tight Squeeze', 'Neck Kiss', 'Booty Smother', 'Scissor Stroke', 'Pin & Sit', 'Face Drop', 'Body Cage', 'Head Trap Stroke', 'Squeeze & Press', 'Kneeling Smother', 'Ride & Stroke', 'Reverse Sit', 'Standing Stroke', 'Bend Over Stroke', 'Thigh Ride', 'Foot Trap Tease', 'Wrestling Smother', 'Pin & Taste', 'Booty Tease', 'Rear Grind', 'Arch & Suck', 'Standing Thigh Press', 'Face Bury', 'Wall Press', 'Hair Pull Kiss', 'Flip & Mount', 'Chest Bite', 'Over-the-Knee', 'Hold & Taste', 'Whispering Pin', 'Shoulder Bite', 'Tongue Trail', 'Pin & Grind', 'Thigh Bite'].includes(m.name)) weight = 2;
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
  }, [enabledMoves, modeKey, attacker]);

  useEffect(() => {
    setUsedMoves({ Wayne: [], Cindy: [] });
    setLastMoveName({ Wayne: null, Cindy: null });
    setLastMoveType({ Wayne: null, Cindy: null });
    setTypeHistory({ Wayne: [], Cindy: [] });
    setRecentMoves({ Wayne: [], Cindy: [] });
  }, [enabledMoves, modeKey]);

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

    if (lastMoveType[attacker] === 'Strike') {
      const submissionEligible = pool.filter(m => SUBMISSION_TYPES.has(m.type));
      if (submissionEligible.length > 0) {
        pool = submissionEligible;
      }
    }

    const attackerTypeHistory = typeHistory[attacker] || [];
    if (attackerTypeHistory.length >= 2) {
      const lastType = attackerTypeHistory[attackerTypeHistory.length - 1];
      let streak = lastType ? 1 : 0;
      for (let i = attackerTypeHistory.length - 2; i >= 0 && lastType; i -= 1) {
        if (attackerTypeHistory[i] === lastType) {
          streak += 1;
        } else {
          break;
        }
      }
      if (lastType && streak >= 2) {
        const variedPool = pool.filter(m => m.type !== lastType);
        if (variedPool.length > 0) {
          pool = variedPool;
        }
      }
    }

    const recentSequence = recentMoves[attacker] || [];
    if (recentSequence.length > 0) {
      const freshPool = pool.filter(m => !recentSequence.includes(m.name));
      if (freshPool.length > 0) {
        pool = freshPool;
      }
    }

    const uniqueNames = Array.from(new Set(pool.map(m => m.name)));
    const uniqueLimit = uniqueNames.length || 1;
    const shouldCycleDeck = modeKey !== 'quick' && uniqueNames.length > 3;
    let history = shouldCycleDeck ? usedMoves[attacker] || [] : [];
    let available = pool;
    let historyReset = false;

    if (shouldCycleDeck) {
      available = pool.filter(m => !history.includes(m.name));
      if (available.length === 0) {
        history = [];
        available = pool;
        historyReset = true;
      }

      const recentName = history.length > 0 ? history[history.length - 1] : lastMoveName[attacker];
      if (recentName && !historyReset) {
        const filtered = available.filter(m => m.name !== recentName);
        if (filtered.length > 0) {
          available = filtered;
        }
      }
    }

    const previousResolvedMove = lastResolvedMove?.name;
    if (previousResolvedMove && lastResolvedMove?.by !== attacker) {
      const filtered = available.filter(m => m.name !== previousResolvedMove);
      if (filtered.length > 0) {
        available = filtered;
      }
    }

    const idx = Math.floor(Math.random() * available.length);
    const nextMove = available[idx];
    if (shouldCycleDeck) {
      const nextHistory = [...history, nextMove.name];
      const trimmedHistory = nextHistory.slice(-uniqueLimit);
      setUsedMoves(prev => ({ ...prev, [attacker]: trimmedHistory }));
    } else if ((usedMoves[attacker] || []).length) {
      setUsedMoves(prev => ({ ...prev, [attacker]: [] }));
    }
    setRecentMoves(prev => {
      const updated = [...(prev[attacker] || []), nextMove.name].slice(-3);
      return { ...prev, [attacker]: updated };
    });
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
      postMatchMessage('Final Stand! Player is completely exposed.');
    }
  }, [wayne.hp, cindy.hp, modeKey, finalStand, postMatchMessage]);

  useEffect(() => {
    if (matchWinner) return;

    let winner = null;
    if (modeKey === 'suddendeath') {
      if (suddenDeathWinner) winner = suddenDeathWinner;
    } else if (modeKey === 'ironwoman') {
      if (ironWomanWinner) winner = ironWomanWinner;
    } else if (wayne.hp <= 0 && cindy.hp <= 0) {
      winner = 'Tie';
    } else if (wayne.hp <= 0) {
      winner = 'Cindy';
    } else if (cindy.hp <= 0) {
      winner = 'Wayne';
    } else if (mode.duration && timer <= 0) {
      if (modeKey === 'quick') {
        if (submissions.Wayne === submissions.Cindy) {
          winner = 'Tie';
        } else {
          winner = submissions.Wayne > submissions.Cindy ? 'Wayne' : 'Cindy';
        }
      } else if (wayne.hp === cindy.hp) {
        winner = 'Tie';
      } else {
        winner = wayne.hp > cindy.hp ? 'Wayne' : 'Cindy';
      }
    }

    if (winner) {
      let appliedTiebreaker = null;
      if (winner === 'Tie') {
        const tieState = {
          submissions,
          score,
          orgasms,
          damageDealt: {
            Wayne: calculateDamageDealt(cindy.hp, cindy.maxHp ?? PLAYER_CINDY.maxHp),
            Cindy: calculateDamageDealt(wayne.hp, wayne.maxHp ?? PLAYER_WAYNE.maxHp),
          },
          clothingLayers: {
            Wayne: getClothingLayer(wayne.hp)?.layer ?? 0,
            Cindy: getClothingLayer(cindy.hp)?.layer ?? 0,
          },
          coinFlipResult,
          lastResolvedMove,
        };
        appliedTiebreaker = resolveModeTiebreaker(modeKey, tieState);
        if (appliedTiebreaker?.winner) {
          winner = appliedTiebreaker.winner;
        }
      }

      if (winner === 'Tie') {
        const tieContext = { modeKey };
        setVictoryHeading(pickTemplate(TIE_HEADLINES, tieContext));
        setVictorySubheading(pickTemplate(TIE_SUBHEADINGS, tieContext));
        setVictoryQuote(pickTemplate(TIE_TALES, tieContext));
      } else {
        const loser = winner === 'Wayne' ? 'Cindy' : 'Wayne';
        const finishingMoveType = lastResolvedMove?.resolved === false ? undefined : lastResolvedMove?.type;
        const scoreLine = `${score[winner] ?? 0}-${score[loser] ?? 0}`;
        const submissionLine = `${submissions[winner] ?? 0}-${submissions[loser] ?? 0}`;
        const context = {
          winner: getRingName(winner),
          loser: getRingName(loser),
          modeKey,
          finishingMoveType,
          scoreLine,
          submissionLine,
        };
        const worshipLine = winner === 'Wayne'
          ? `${getRingName('Cindy')} worships ${getRingName('Wayne')} in Titan reverence.`
          : `${getRingName('Wayne')} kneels to worship ${getRingName('Cindy')} the Goddess.`;
        const addWorshipTag = base => `${base ? `${base} ` : ''}${worshipLine}`.trim();
        setVictoryHeading(pickTemplate(WIN_HEADLINES, context));
        if (appliedTiebreaker) {
          setVictorySubheading(`${getRingName(winner)} wins via ${appliedTiebreaker.method}.`);
          const baseQuote = pickVictoryTale(context);
          const detail = appliedTiebreaker.detail ? `${appliedTiebreaker.detail} ` : '';
          setVictoryQuote(addWorshipTag(`${detail}${baseQuote}`.trim()));
        } else {
          setVictorySubheading(pickTemplate(WIN_SUBHEADINGS, context));
          setVictoryQuote(addWorshipTag(pickVictoryTale(context)));
        }
      }
      setMatchWinner(winner);
    }
  }, [wayne.hp, cindy.hp, timer, mode.duration, matchWinner, modeKey, lastResolvedMove, score, submissions, coinFlipResult, orgasms, suddenDeathWinner, ironWomanWinner]);
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
    { key: 'Wayne', label: getRingName('Wayne'), data: wayne, clothing: wayneClothing, accent: '#d62828' },
    { key: 'Cindy', label: getRingName('Cindy'), data: cindy, clothing: cindyClothing, accent: '#ff4d6d' },
  ];
  const attackerPool = MOVES.filter(
    m => enabledMoves.includes(m.name) && (!m.character || m.character === attacker)
  );
  const attackerHasConfiguredMoves = attackerPool.length > 0;
  const deckHasFinisher = moveDeck.some(m => m.type === 'Finisher');
  const deckHasNonSensual = moveDeck.some(m => m.type !== 'Sensual');
  const currentMoveDetails = move ? MOVE_DETAILS[move.name] : null;
  const moveImageSrc = currentMoveDetails?.image ? `/images/${currentMoveDetails.image}` : null;
  const isStrikeMove = move?.type === 'Strike';
  const showTimerBox = modeKey === 'ironwoman' || Boolean(mode.duration);
  const timerBoxLabel = modeKey === 'ironwoman' ? 'Elapsed' : 'Timer';
  const timerBoxValue = showTimerBox
    ? modeKey === 'ironwoman'
      ? formatTime(timer)
      : formatTime(Math.max(timer, 0))
    : '';
  const timerDisplay = showTimerBox ? timerBoxValue : 'Open Play';
  let moveStatusMessage = '';
  if (enabledMoves.length === 0) {
    moveStatusMessage = 'All moves are disabled. Enable at least one move in Move Settings.';
  } else if (!attackerHasConfiguredMoves) {
    moveStatusMessage = `${getRingName(attacker)} has no eligible moves with the current Move Settings.`;
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
    ? `${attackerPool.length} move${attackerPool.length === 1 ? '' : 's'} available for ${getRingName(attacker)}`
    : 'No eligible moves for current attacker.';
  const actionDisabled = submitted || !move || showCoinFlip || Boolean(matchWinner);
  const layoutPadding = isMobile ? '28px 14px 90px' : '60px clamp(32px,6vw,96px) 120px';
  const playerCardBase = {
    background: 'linear-gradient(160deg, rgba(8,0,0,0.96), rgba(32,0,6,0.78))',
    borderRadius: 28,
    padding: isMobile ? '20px' : '26px',
    boxShadow: '0 40px 70px rgba(0,0,0,0.6)',
    position: 'relative',
    overflow: 'hidden',
  };
  const primaryButtonBase = {
    flex: '0 0 auto',
    fontSize: isMobile ? '0.95em' : '1.05em',
    padding: isMobile ? '0.8em 1.6em' : '0.75em 2.4em',
    borderRadius: 18,
    fontWeight: 700,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    width: isMobile ? '100%' : 'auto',
    display: 'inline-flex',
    justifyContent: 'center',
  };
  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
    gap: isMobile ? '18px' : '26px',
    alignItems: 'flex-start',
  };
  const stagePanelStyle = {
    position: 'relative',
    borderRadius: isMobile ? 26 : 34,
    padding: isMobile ? '18px 14px' : '26px',
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'linear-gradient(160deg, rgba(4,0,4,0.9), rgba(14,0,10,0.7))',
    boxShadow: '0 45px 90px rgba(0,0,0,0.55)',
    overflow: 'hidden',
  };
  const scorePanelStyle = {
    background: 'linear-gradient(155deg, rgba(10,0,12,0.92), rgba(38,0,20,0.78))',
    border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
    borderRadius: isMobile ? 24 : 32,
    padding: isMobile ? '18px 18px' : '26px 32px',
    boxShadow: '0 35px 80px rgba(0,0,0,0.45)',
    marginBottom: isMobile ? 18 : 28,
  };
  const scoreMetricsRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: isMobile ? '12px' : '20px',
  };
  const scoreMetricStyle = {
    flex: isMobile ? '1 1 100%' : '1 1 calc(33.33% - 14px)',
    borderRadius: 20,
    padding: isMobile ? '14px 16px' : '18px 20px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))',
    backdropFilter: 'blur(10px)',
    minHeight: 92,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  };
  const metricLabelStyle = {
    fontSize: '0.75em',
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: DUNGEON_THEME.textMuted,
  };
  const metricValueStyle = {
    fontSize: isMobile ? '1.35em' : '1.6em',
    fontWeight: 700,
    color: '#fff',
  };
  const columnStackStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '16px' : '22px',
  };
  const attackerBadgeStyle = {
    borderRadius: 20,
    border: `1px solid ${DUNGEON_THEME.borderSecondary}`,
    padding: isMobile ? '10px 14px' : '12px 18px',
    background: 'rgba(255,255,255,0.04)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    letterSpacing: '0.08em',
    fontSize: isMobile ? '0.95em' : '1.05em',
  };
  const victoryLoser = matchWinner === 'Wayne' ? 'Cindy' : matchWinner === 'Cindy' ? 'Wayne' : null;
  const decoratedWinner = matchWinner && matchWinner !== 'Tie' ? getRingName(matchWinner) : matchWinner;
  const decoratedLoser = victoryLoser ? getRingName(victoryLoser) : null;
  const overlayHeading = victoryHeading || (matchWinner === 'Tie'
    ? 'Velvet Deadlock'
    : decoratedWinner
      ? `${decoratedWinner} Rules the Bed`
      : '');
  const overlaySubheading = victorySubheading || (matchWinner === 'Tie'
    ? 'Devotion deferred — both lovers collapse before they can force worship.'
    : decoratedWinner && decoratedLoser
      ? `${decoratedWinner} keeps ${decoratedLoser} kneeling and demanding worship for every bruise.`
      : '');

  // Erotic Fight Mode: Only show special UI
  if (modeKey === 'eroticfight') {
    const eroticButtonBase = {
      fontSize: isMobile ? '1.6em' : '2.6em',
      padding: isMobile ? '0.85em 1.2em' : '1em 2.4em',
      borderRadius: isMobile ? '20px' : '26px',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(255,45,149,0.35)',
      textShadow: '0 2px 8px #000',
      transition: 'transform 0.1s, box-shadow 0.2s',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '360px' : 'none',
      border: '1px solid rgba(255,255,255,0.08)',
    };
    return (
      <div
        style={{
          minHeight: '100vh',
          background: DUNGEON_THEME.background,
          color: '#f7e1ff',
          fontFamily: '"Cinzel", "Playfair Display", serif',
          textShadow: '0 2px 12px #000, 0 0 3px #e50914',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          padding: layoutPadding,
          margin: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: DUNGEON_THEME.velvetGlow,
            opacity: 0.4,
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: DUNGEON_THEME.lattice,
            opacity: 0.18,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '760px' }}>
          <div
            style={{
              fontSize: isMobile ? '2.4em' : '3.3em',
              fontWeight: 'bold',
              color: DUNGEON_THEME.neonPink,
              letterSpacing: '0.12em',
              marginBottom: isMobile ? '24px' : '32px',
              textShadow: '0 0 26px rgba(255,0,128,0.7), 0 0 12px #000',
              borderBottom: `2px solid ${DUNGEON_THEME.borderPrimary}`,
              paddingBottom: '0.2em',
              width: '100%',
              maxWidth: '640px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontFamily: '"UnifrakturCook", "Cinzel", serif' }}>Drain Each Other</span>
          </div>
          <div
            style={{
              fontSize: isMobile ? '1.8em' : '2.5em',
              color: '#fff',
              background: 'linear-gradient(135deg, rgba(20,0,32,0.92), rgba(6,0,12,0.75))',
              border: `1px solid ${DUNGEON_THEME.borderSecondary}`,
              borderRadius: '20px',
              boxShadow: DUNGEON_THEME.glowPrimary,
              padding: isMobile ? '0.35em 1em' : '0.4em 1.6em',
              marginBottom: isMobile ? '28px' : '38px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              width: isMobile ? '100%' : 'auto',
              textAlign: 'center',
            }}
          >
            <span style={{ color: DUNGEON_THEME.neonPink, fontWeight: 900 }}>Timer:</span> {formatTime(timer)}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '18px' : '80px',
              marginBottom: isMobile ? '28px' : '38px',
              flexDirection: isMobile ? 'column' : 'row',
              width: '100%',
              maxWidth: '700px',
            }}
          >
            <button
              style={{
                ...eroticButtonBase,
                background: 'linear-gradient(135deg, #e50914 0%, #3b0004 100%)',
                borderColor: 'rgba(229,9,20,0.45)',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => {
                setScore(s => ({ ...s, Wayne: s.Wayne + 1 }));
                setOrgasms(o => ({ ...o, Cindy: o.Cindy + 1 }));
              }}
            >
              <span style={{ letterSpacing: '0.04em' }}>{getRingName('Wayne')} +1</span>
            </button>
            <button
              style={{
                ...eroticButtonBase,
                background: 'linear-gradient(135deg, #ff4d6d 0%, #160001 100%)',
                borderColor: 'rgba(255,77,109,0.45)',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => {
                setScore(s => ({ ...s, Cindy: s.Cindy + 1 }));
                setOrgasms(o => ({ ...o, Wayne: o.Wayne + 1 }));
              }}
            >
              <span style={{ letterSpacing: '0.04em' }}>{getRingName('Cindy')} +1</span>
            </button>
          </div>
          <div
            style={{
              fontSize: isMobile ? '1.4em' : '2.1em',
              color: '#fff',
              fontWeight: 'bold',
              marginTop: isMobile ? '18px' : '28px',
              background: 'linear-gradient(150deg, rgba(12,0,0,0.85), rgba(48,0,6,0.7))',
              border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
              borderRadius: '18px',
              padding: '0.3em 1.1em',
              boxShadow: DUNGEON_THEME.glowPrimary,
              width: '100%',
              maxWidth: '440px',
            }}
          >
            <span style={{ color: DUNGEON_THEME.neonPink, fontWeight: 900 }}>Scoreboard:</span> {getRingName('Wayne')} {score.Wayne} - {getRingName('Cindy')} {score.Cindy}
          </div>
          <div
            style={{
              fontSize: isMobile ? '1.2em' : '1.8em',
              color: DUNGEON_THEME.neonPink,
              fontWeight: 'bold',
              marginTop: isMobile ? '16px' : '22px',
              background: 'linear-gradient(150deg, rgba(16,0,0,0.9), rgba(60,0,12,0.65))',
              border: `1px solid ${DUNGEON_THEME.borderSecondary}`,
              borderRadius: '18px',
              padding: '0.3em 1.1em',
              boxShadow: DUNGEON_THEME.glowSecondary,
              width: '100%',
              maxWidth: '440px',
            }}
          >
            <span style={{ color: '#fff', fontWeight: 700 }}>Orgasms:</span> {getRingName('Wayne')} {orgasms.Wayne} &nbsp;|&nbsp; {getRingName('Cindy')} {orgasms.Cindy}
          </div>
          <div
            style={{
              position: isMobile ? 'relative' : 'fixed',
              bottom: isMobile ? 'unset' : '24px',
              right: isMobile ? 'unset' : '32px',
              color: DUNGEON_THEME.textMuted,
              fontSize: '1.1em',
              opacity: 0.75,
              fontFamily: 'monospace',
              marginTop: isMobile ? '36px' : '0',
              textAlign: 'center',
            }}
          >
            <span>UCW BedChamp &bull; Erotic Wrestling</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: DUNGEON_THEME.background,
        color: '#fce9ff',
        fontFamily: '"Cinzel", "Playfair Display", serif',
        textShadow: '0 2px 12px #000, 0 0 3px #e50914',
        padding: layoutPadding,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: DUNGEON_THEME.velvetGlow,
          opacity: 0.5,
          filter: 'blur(85px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: DUNGEON_THEME.lattice,
          opacity: 0.2,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
      {showCoinFlip && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(1,0,8,0.92)',
            zIndex: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(24,0,42,0.95), rgba(10,0,18,0.85))',
              border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
              borderRadius: 28,
              padding: isMobile ? '24px 28px' : '32px 48px',
              textAlign: 'center',
              boxShadow: '0 0 45px rgba(255,45,149,0.45)',
            }}
          >
            <div style={{ fontSize: isMobile ? '1.6em' : '2em', fontWeight: 700, marginBottom: 12, color: '#fff' }}>Coin Flip</div>
            <div style={{ fontSize: isMobile ? '1.1em' : '1.35em', color: DUNGEON_THEME.textMuted }}>{getRingName(coinFlipResult)} attacks first!</div>
          </div>
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', width: '100%' }}>
        <div style={scorePanelStyle}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: '0.85em', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#ff9fbb' }}>Velvet Scoreboard</div>
            <div style={{ fontSize: '1em', letterSpacing: '0.18em', color: DUNGEON_THEME.textMuted }}>Round {round}</div>
          </div>
          <div style={scoreMetricsRowStyle}>
            <div style={{ ...scoreMetricStyle, border: `1px solid ${DUNGEON_THEME.borderPrimary}` }}>
              <div style={metricLabelStyle}>Points</div>
              <div style={{ ...metricValueStyle, color: DUNGEON_THEME.neonPink }}>
                {getRingName('Wayne')} {score.Wayne} • {getRingName('Cindy')} {score.Cindy}
              </div>
            </div>
            <div style={scoreMetricStyle}>
              <div style={metricLabelStyle}>Submissions</div>
              <div style={metricValueStyle}>
                {getRingName('Wayne')} {submissions.Wayne} • {getRingName('Cindy')} {submissions.Cindy}
              </div>
            </div>
            <div style={scoreMetricStyle}>
              <div style={metricLabelStyle}>{showTimerBox ? timerBoxLabel : 'Free Flow'}</div>
              <div style={metricValueStyle}>{timerDisplay}</div>
            </div>
          </div>
        </div>

        {modeKey !== 'quick' && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? '10px' : '18px',
              alignItems: isMobile ? 'flex-start' : 'center',
              background: 'linear-gradient(150deg, rgba(8,0,0,0.95), rgba(48,0,8,0.7))',
              borderRadius: 28,
              padding: isMobile ? '14px 16px' : '18px 28px',
              border: `1px solid ${DUNGEON_THEME.borderSecondary}`,
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              marginBottom: isMobile ? '18px' : '26px',
            }}
          >
            <div style={{ fontSize: isMobile ? '1.6em' : '2.4em', fontWeight: 700, letterSpacing: '0.06em' }}>{mode.name}</div>
            <div style={{ fontSize: isMobile ? '0.95em' : '1.15em', letterSpacing: '0.18em', textTransform: 'uppercase', color: DUNGEON_THEME.textMuted }}>
              Round {round}
            </div>
            {showTimerBox && (
              <div
                style={{
                  marginLeft: isMobile ? 0 : 'auto',
                  fontSize: isMobile ? '1em' : '1.25em',
                  border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
                  borderRadius: 18,
                  padding: isMobile ? '0.4em 0.9em' : '0.5em 1.4em',
                  background: 'linear-gradient(120deg, rgba(229,9,20,0.25), rgba(90,0,0,0.8))',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center',
                  boxShadow: DUNGEON_THEME.glowPrimary,
                }}
              >
                <span style={{ color: DUNGEON_THEME.neonPink, fontWeight: 700 }}>{timerBoxLabel}:</span> {timerBoxValue}
              </div>
            )}
          </div>
        )}

        <div style={stagePanelStyle}>
          <div
            style={{
              position: 'absolute',
              width: isMobile ? '220px' : '340px',
              height: isMobile ? '220px' : '340px',
              background: 'radial-gradient(circle, rgba(255,45,149,0.25), transparent 70%)',
              top: '-80px',
              right: '-60px',
              filter: 'blur(20px)',
              opacity: 0.7,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: isMobile ? '280px' : '420px',
              height: isMobile ? '280px' : '420px',
              background: 'radial-gradient(circle, rgba(120,0,255,0.18), transparent 65%)',
              bottom: '-120px',
              left: '-80px',
              filter: 'blur(25px)',
              opacity: 0.8,
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={mainGridStyle}>
              <div style={columnStackStyle}>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: isMobile ? '16px' : '24px' }}>
                  {players.map(player => {
                    const maxHp = player.data.maxHp || 100;
                    const hpPercent = Math.max(0, Math.round((player.data.hp / maxHp) * 100));
                    return (
                      <div
                        key={player.key}
                        style={{
                          flex: isMobile ? '1 1 100%' : '1 1 320px',
                          width: '100%',
                          ...playerCardBase,
                          border: `1px solid ${player.accent}55`,
                          backdropFilter: 'blur(6px)',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(130deg, ${player.accent}22, transparent 65%)`,
                            pointerEvents: 'none',
                          }}
                        />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <span style={{ fontSize: isMobile ? '1.2em' : '1.4em', fontWeight: 700 }}>{player.label}</span>
                            <span
                              style={{
                                fontSize: isMobile ? '0.85em' : '0.95em',
                                letterSpacing: '0.12em',
                                color: attacker === player.key ? DUNGEON_THEME.neonPink : DUNGEON_THEME.textMuted,
                                border: attacker === player.key ? `1px solid ${DUNGEON_THEME.borderPrimary}` : '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 999,
                                padding: '0.3em 1.1em',
                                background: attacker === player.key ? 'rgba(255,45,149,0.08)' : 'rgba(255,255,255,0.04)',
                              }}
                            >
                              {attacker === player.key ? 'ATTACKING' : 'DEFENDING'}
                            </span>
                          </div>
                          <div style={{ height: 18, borderRadius: 999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 12 }}>
                            <div
                              style={{
                                width: `${hpPercent}%`,
                                height: '100%',
                                background: `linear-gradient(90deg, ${player.accent}, ${player.accent}aa)`,
                                transition: 'width 0.35s ease',
                                boxShadow: `0 0 18px ${player.accent}55`,
                              }}
                            />
                          </div>
                          <div style={{ fontSize: '1em', marginBottom: 6 }}>HP {player.data.hp} / {maxHp}</div>
                          <div style={{ fontSize: '0.95em', color: '#d7d7ff', marginBottom: 6 }}>Stamina {player.data.stamina}</div>
                          <div style={{ fontSize: '0.95em', marginBottom: 6 }}>Submissions {submissions[player.key]}</div>
                          <div style={{ fontSize: '0.95em', marginBottom: 6 }}>Score {score[player.key]}</div>
                          {player.clothing && (
                            <div style={{ marginTop: 8, fontSize: '0.95em', color: DUNGEON_THEME.textMuted }}>
                              <span style={{ fontSize: '1.2em', marginRight: 6 }}>{player.clothing.icon}</span>
                              {player.clothing.status}
                            </div>
                          )}
                          {player.key === 'Wayne' && wayneStunned && (
                            <div style={{ marginTop: 8, fontSize: '0.9em', color: DUNGEON_THEME.ember }}>{getRingName('Wayne')} is stunned!</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {modeKey === 'suddendeath' && (
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: '0.95em',
                      color: sdPendingAnswer ? DUNGEON_THEME.ember : '#f0caff',
                      fontWeight: sdPendingAnswer ? 700 : 400,
                    }}
                  >
                    {sdPendingAnswer
                      ? `${getRingName(sdPendingAnswer)} scored! ${getRingName(sdPendingAnswer === 'Wayne' ? 'Cindy' : 'Wayne')} must answer!`
                      : submissions.Wayne === 0 && submissions.Cindy === 0
                        ? 'Shootout — first finisher submission starts the challenge.'
                        : 'Scores are even. Next submission starts a new challenge.'}
                  </div>
                )}
              </div>

              <div style={columnStackStyle}>
                <div style={attackerBadgeStyle}>
                  <span style={{ fontSize: '0.85em', letterSpacing: '0.2em', textTransform: 'uppercase', color: DUNGEON_THEME.textMuted }}>Attacking</span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{getRingName(attacker)}</span>
                </div>
                <div
                  style={{
                    background: DUNGEON_THEME.panel,
                    borderRadius: 26,
                    padding: isMobile ? '22px' : '30px',
                    border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
                    boxShadow: '0 45px 80px rgba(0,0,0,0.45)',
                  }}
                >
                  <div style={{ fontSize: isMobile ? '1.3em' : '1.6em', fontWeight: 700, marginBottom: 12 }}>Current Move</div>
                  {move ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '16px' : '28px',
                        alignItems: 'stretch',
                      }}
                    >
                      <div style={{ textAlign: 'left', flex: '2 1 320px' }}>
                        <div style={{ fontSize: '1.35em', marginBottom: 6, color: '#fff' }}>{move.name}</div>
                        <div style={{ fontSize: '1em', color: '#f0caff', marginBottom: 4 }}>Type: {move.type}</div>
                        <div style={{ fontSize: '1em', color: '#f0caff', marginBottom: 4 }}>
                          Damage {move.damage} &bull; Cost {move.cost} &bull; Accuracy {move.accuracy}%
                        </div>
                        {move.special && (
                          <div style={{ fontSize: '0.95em', color: DUNGEON_THEME.ember, marginBottom: 8 }}>Special: {move.special}</div>
                        )}
                        {currentMoveDetails?.description && (
                          <div style={{ fontSize: '0.95em', color: '#d7d7ff', marginBottom: 8 }}>{currentMoveDetails.description}</div>
                        )}
                      </div>
                      <div style={{ flex: '1 1 220px' }}>
                        {moveImageSrc ? (
                          <div
                            onClick={() => setShowImageModal({
                              name: move.name,
                              image: currentMoveDetails.image,
                              description: currentMoveDetails.description,
                            })}
                            style={{
                              borderRadius: 18,
                              overflow: 'hidden',
                              border: '1px solid rgba(255,255,255,0.12)',
                              boxShadow: '0 25px 45px rgba(0,0,0,0.4)',
                              cursor: 'pointer',
                              position: 'relative',
                            }}
                          >
                            <img
                              src={moveImageSrc}
                              alt={`${move.name} illustration`}
                              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '6px 10px',
                                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.65) 100%)',
                                fontSize: '0.85em',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                              }}
                            >
                              Tap to enlarge
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              borderRadius: 18,
                              border: '1px dashed rgba(255,255,255,0.2)',
                              padding: '32px 18px',
                              textAlign: 'center',
                              color: DUNGEON_THEME.textMuted,
                              fontSize: '0.95em',
                            }}
                          >
                            Move art coming soon.
                          </div>
                        )}
                      </div>
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
                        ...primaryButtonBase,
                        border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
                        background: actionDisabled
                          ? 'rgba(255,255,255,0.08)'
                          : 'linear-gradient(120deg, #e50914 0%, #3f0005 100%)',
                        color: '#fff',
                        cursor: actionDisabled ? 'not-allowed' : 'pointer',
                        boxShadow: actionDisabled ? 'none' : '0 25px 55px rgba(229,9,20,0.38)',
                      }}
                    >
                      {submitted ? 'Resolving...' : isStrikeMove ? 'Next Move' : 'Submit Move'}
                    </button>
                    {!isStrikeMove && (
                      <button
                        onClick={handleEscape}
                        disabled={actionDisabled}
                        style={{
                          ...primaryButtonBase,
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: actionDisabled
                            ? 'rgba(255,255,255,0.04)'
                            : 'linear-gradient(120deg, rgba(255,255,255,0.08), rgba(0,0,0,0.55))',
                          color: '#fff',
                          cursor: actionDisabled ? 'not-allowed' : 'pointer',
                          boxShadow: actionDisabled ? 'none' : '0 15px 35px rgba(0,0,0,0.45)',
                        }}
                      >
                        Escape Move
                      </button>
                    )}
                    <button
                      onClick={nextTurn}
                      disabled={submitted || showCoinFlip || Boolean(matchWinner)}
                      style={{
                        ...primaryButtonBase,
                        border: `1px solid ${DUNGEON_THEME.borderSecondary}`,
                        background: 'rgba(255,255,255,0.06)',
                        color: '#fff',
                        cursor: submitted || showCoinFlip || matchWinner ? 'not-allowed' : 'pointer',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.35)',
                      }}
                    >
                      Force Next Turn
                    </button>
                  </div>
                  {modeKey === 'ironwoman' && !matchWinner && (
                    <div style={{ display: 'flex', gap: '14px', marginTop: '14px', flexDirection: isMobile ? 'column' : 'row', width: '100%' }}>
                      <button
                        onClick={() => {
                          setIronWomanWinner('Cindy');
                          postMatchMessage(`${getRingName('Wayne')} screams I QUIT! ${getRingName('Cindy')} wins the Iron Woman!`);
                        }}
                        style={{
                          ...primaryButtonBase,
                          flex: 1,
                          border: '1px solid rgba(229,9,20,0.5)',
                          background: 'linear-gradient(120deg, #8b0000 0%, #2a0000 100%)',
                          color: '#fff',
                          cursor: 'pointer',
                          boxShadow: '0 15px 35px rgba(139,0,0,0.35)',
                          fontSize: isMobile ? '0.95em' : '1.05em',
                        }}
                      >
                        {getRingName('Wayne')} Quits
                      </button>
                      <button
                        onClick={() => {
                          setIronWomanWinner('Wayne');
                          postMatchMessage(`${getRingName('Cindy')} screams I QUIT! ${getRingName('Wayne')} wins the Iron Woman!`);
                        }}
                        style={{
                          ...primaryButtonBase,
                          flex: 1,
                          border: '1px solid rgba(255,77,109,0.5)',
                          background: 'linear-gradient(120deg, #8b004a 0%, #2a0015 100%)',
                          color: '#fff',
                          cursor: 'pointer',
                          boxShadow: '0 15px 35px rgba(139,0,74,0.35)',
                          fontSize: isMobile ? '0.95em' : '1.05em',
                        }}
                      >
                        {getRingName('Cindy')} Quits
                      </button>
                    </div>
                  )}
                  {isStrikeMove && (
                    <div style={{ marginTop: 6, fontSize: '0.9em', color: DUNGEON_THEME.ember }}>
                      Strikes cannot be escaped — tap Next Move to resolve the blow.
                    </div>
                  )}
                  <div style={{ marginTop: 14, fontSize: '0.95em', color: DUNGEON_THEME.textMuted }}>{deckSummary}</div>
                  {moveStatusMessage && move && (
                    <div style={{ marginTop: 6, fontSize: '0.9em', color: DUNGEON_THEME.ember }}>{moveStatusMessage}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {modeKey === 'suddendeath' && (
          <div
            style={{
              background: 'linear-gradient(160deg, rgba(24,0,0,0.92), rgba(58,0,8,0.78))',
              borderRadius: 26,
              padding: isMobile ? '18px' : '26px',
              border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
              color: '#ffcfdf',
              boxShadow: '0 35px 65px rgba(0,0,0,0.45)',
            }}
          >
            <div style={{ fontSize: isMobile ? '1.1em' : '1.35em', fontWeight: 'bold', marginBottom: 12 }}>Sudden Death Shootout</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
              <div style={{ fontSize: '1em', color: '#f7e1ff' }}>
                {getRingName('Wayne')}: {submissions.Wayne} submission{submissions.Wayne !== 1 ? 's' : ''}
              </div>
              <div style={{ fontSize: '1em', color: '#f7e1ff' }}>
                {getRingName('Cindy')}: {submissions.Cindy} submission{submissions.Cindy !== 1 ? 's' : ''}
              </div>
            </div>
            <div style={{ fontSize: '1em', marginBottom: 10, color: sdPendingAnswer ? DUNGEON_THEME.ember : '#f0caff', fontWeight: sdPendingAnswer ? 700 : 400 }}>
              {sdPendingAnswer
                ? `${getRingName(sdPendingAnswer)} scored! ${getRingName(sdPendingAnswer === 'Wayne' ? 'Cindy' : 'Wayne')} must answer or lose!`
                : submissions.Wayne === 0 && submissions.Cindy === 0
                  ? 'Waiting for the first finisher submission...'
                  : 'Even — next submission starts a new challenge.'}
            </div>
            <div style={{ fontSize: '0.9em', color: DUNGEON_THEME.textMuted, fontStyle: 'italic' }}>
              Land a finisher → opponent must answer with one of their own. Fail to answer? You lose.
            </div>
          </div>
        )}
      </div>

      {matchWinner && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2,0,6,0.88)',
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '20px' : '32px',
            backdropFilter: 'blur(6px)',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              width: isMobile ? '100%' : 'min(540px, 90vw)',
              background: 'linear-gradient(160deg, rgba(11,0,13,0.95), rgba(40,0,12,0.85))',
              borderRadius: 30,
              border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
              padding: isMobile ? '28px 22px' : '36px 32px',
              textAlign: 'center',
              boxShadow: '0 40px 90px rgba(0,0,0,0.65)',
              position: 'relative',
              color: '#ffe9ff',
              maxHeight: isMobile ? '90vh' : '85vh',
              overflowY: 'auto',
            }}
          >
            <img
              src="/images/belt.png"
              alt="Bed Championship Belt"
              style={{
                width: isMobile ? '65%' : '320px',
                maxWidth: '100%',
                display: 'block',
                margin: '0 auto 18px',
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
              }}
            />
            <div style={{ fontSize: isMobile ? '0.95em' : '1.05em', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#ff9fbb', marginBottom: 12 }}>Bed Champion Crowned</div>
            <div style={{ fontSize: isMobile ? '2em' : '2.6em', fontWeight: 700, marginBottom: 8 }}>{overlayHeading}</div>
            <div style={{ fontSize: isMobile ? '1.05em' : '1.2em', color: '#ffd6ff', marginBottom: 18 }}>{overlaySubheading}</div>
            <div style={{ fontSize: '0.95em', color: '#fdd5ff', marginBottom: 20 }}>{victoryQuote}</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                fontSize: '0.95em',
                background: 'rgba(0,0,0,0.25)',
                borderRadius: 18,
                padding: '14px 18px',
                border: '1px solid rgba(255,255,255,0.12)',
                marginBottom: 24,
              }}
            >
              <div>{getRingName('Wayne')} HP {Math.max(0, wayne.hp)} • {getRingName('Cindy')} HP {Math.max(0, cindy.hp)}</div>
              <div>Submissions — {getRingName('Wayne')} {submissions.Wayne} / {getRingName('Cindy')} {submissions.Cindy}</div>
            </div>
            {matchLog.length > 0 && (
              <div
                style={{
                  maxHeight: isMobile ? '200px' : '240px',
                  overflowY: 'auto',
                  textAlign: 'left',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 18,
                  padding: '14px 18px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  marginBottom: 24,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Match Log</div>
                <ol style={{ margin: 0, paddingLeft: '1.4em', fontSize: '0.95em', color: '#ffe9ff' }}>
                  {matchLog.map((entry, idx) => (
                    <li key={`${entry}-${idx}`} style={{ marginBottom: 6 }}>
                      {entry}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 10 : 16,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <button
                onClick={resetMatch}
                style={{
                  fontSize: isMobile ? '1.05em' : '1.15em',
                  padding: '0.75em 1.8em',
                  borderRadius: 18,
                  border: 'none',
                  background: 'linear-gradient(120deg, #ff1e56, #7a001d)',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 20px 40px rgba(255,30,86,0.35)',
                  letterSpacing: '0.04em',
                  flex: '1 1 auto',
                }}
              >
                Rematch
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.reload();
                  }
                }}
                style={{
                  fontSize: isMobile ? '1em' : '1.05em',
                  padding: '0.7em 1.6em',
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.35)',
                  background: 'transparent',
                  color: '#ffe9ff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                  flex: isMobile ? '1 1 auto' : '0 0 auto',
                }}
              >
                Reload App
              </button>
            </div>
          </div>
        </div>
      )}

      {!matchWinner && showImageModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setShowImageModal(null)}
        >
          <div
            style={{
              background: 'linear-gradient(150deg, rgba(12,0,0,0.95), rgba(34,0,6,0.88))',
              color: '#fce9ff',
              padding: isMobile ? '18px' : '24px',
              borderRadius: 22,
              width: isMobile ? 'min(420px, 92vw)' : 'min(420px, 90vw)',
              textAlign: 'center',
              boxShadow: '0 20px 55px rgba(0,0,0,0.55)',
              border: `1px solid ${DUNGEON_THEME.borderPrimary}`,
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 12, fontSize: '1.4em', color: '#fff' }}>{showImageModal.name}</h3>
            {showImageModal.image && (
              <img
                src={`/images/${showImageModal.image}`}
                alt={showImageModal.name}
                style={{ width: '100%', borderRadius: 14, marginBottom: 12, border: '1px solid rgba(255,255,255,0.1)' }}
              />
            )}
            {showImageModal.description && (
              <p style={{ fontSize: '0.95em', color: DUNGEON_THEME.textMuted, marginBottom: 16 }}>{showImageModal.description}</p>
            )}
            <button
              onClick={() => setShowImageModal(null)}
              style={{
                fontSize: '1em',
                padding: '0.55em 1.6em',
                borderRadius: 14,
                border: 'none',
                background: 'linear-gradient(120deg, #e50914, #7c0505)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                width: isMobile ? '100%' : 'auto',
                boxShadow: '0 18px 30px rgba(229,9,20,0.35)',
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
