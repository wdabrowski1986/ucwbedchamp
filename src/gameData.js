// Player and resource system for Ultimate Couple Wrestling
export const PLAYER_WAYNE = {
  name: 'The Titan',
  stamina: 100,
  maxStamina: 100,
  hp: 100,
  maxHp: 100,
  clothing: 3,
  focusBonus: false,
  loveDrunkTrap: 0,
};

export const PLAYER_CINDY = {
  name: 'The Goddess',
  stamina: 100,
  maxStamina: 100,
  hp: 100,
  maxHp: 100,
  clothing: 3,
  submissionRecharge: false,
  loveDrunkTrap: 0,
};

export const CLOTHING_LAYERS = [
  { layer: 3, threshold: 76, status: 'STILL DRESSED... FOR NOW', icon: '👗' },
  { layer: 2, threshold: 51, status: 'CLOTHES COMING OFF', icon: '🎀' },
  { layer: 1, threshold: 26, status: 'BARELY COVERED', icon: '👙' },
  { layer: 0, threshold: 0, status: 'COMPLETELY NAKED', icon: '💋' },
];

export const GAME_MODES = {
  quick: {
    name: 'Quick Match',
    duration: 180,
    rounds: 1,
    startingHp: 0,
    winCondition: 'Most submissions in 3 min — make them tap fast 🥵',
  },
  best3: {
    name: 'Best of 3',
    duration: 300,
    rounds: 3,
    startingHp: 100,
    winCondition: 'Win 2 out of 3 rounds — dominate the bed 💋',
  },
  endurance: {
    name: 'Endurance Match',
    duration: 900,
    rounds: 1,
    startingHp: 150,
    winCondition: 'Outlast your lover — most endurance wins 💪',
  },
  ironwoman: {
    name: 'Iron Woman',
    duration: null,
    rounds: 1,
    startingHp: 100,
    winCondition: 'Strip match — clothes come off every 5 min. Last one standing wins. 🔥',
  },
  suddendeath: {
    name: 'Sudden Death',
    duration: null,
    rounds: 1,
    startingHp: 100,
    winCondition: 'Finisher shootout — land one, they must answer or you win 😈',
  },
  practice: {
    name: 'Practice Mode',
    duration: null,
    rounds: 1,
    startingHp: 100,
    winCondition: 'No stakes — just enjoy each other 💕',
  },
  eroticfight: {
    name: 'Erotic Fight',
    duration: 900,
    rounds: 1,
    startingHp: 0,
    winCondition: 'Most pleasure points after 15 min — make every move count 🔥',
  },
};
