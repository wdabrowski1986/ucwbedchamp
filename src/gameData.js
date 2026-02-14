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
  { layer: 3, threshold: 76, status: 'FULLY DRESSED', icon: '👗' },
  { layer: 2, threshold: 51, status: 'PARTIALLY UNDRESSED', icon: '🎀' },
  { layer: 1, threshold: 26, status: 'UNDERWEAR ONLY', icon: '👙' },
  { layer: 0, threshold: 0, status: 'EXPOSED', icon: '💋' },
];

export const GAME_MODES = {
  quick: {
    name: 'Quick Match',
    duration: 180,
    rounds: 1,
    startingHp: 0,
    winCondition: 'Most submissions after 3 min',
  },
  best3: {
    name: 'Best of 3',
    duration: 300,
    rounds: 3,
    startingHp: 100,
    winCondition: 'Win 2 out of 3 rounds',
  },
  endurance: {
    name: 'Endurance Match',
    duration: 900,
    rounds: 1,
    startingHp: 150,
    winCondition: 'Highest HP at end',
  },
  ironwoman: {
    name: 'Iron Woman',
    duration: null,
    rounds: 1,
    startingHp: 100,
    winCondition: 'I Quit match: clothing removed at 5/10/15 min, winner is last to quit',
  },
  suddendeath: {
    name: 'Sudden Death',
    duration: null,
    rounds: 1,
    startingHp: 100,
    winCondition: 'Shootout — land a finisher, opponent must answer or lose',
  },
  practice: {
    name: 'Practice Mode',
    duration: null,
    rounds: 1,
    startingHp: 100,
    winCondition: 'Practice only',
  },
  eroticfight: {
    name: 'Erotic Fight',
    duration: 900,
    rounds: 1,
    startingHp: 0,
    winCondition: 'Most points after 15 min',
  },
};
