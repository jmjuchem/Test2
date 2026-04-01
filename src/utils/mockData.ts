import { Card, Equipment, Chest, PlayerInventory } from '../types/game';

// Cartas de exemplo
export const MOCK_CARDS: Card[] = [
  {
    id: 'card_1',
    name: 'Cristiano Ronaldo',
    type: 'player',
    quality: 'legendary',
    level: 1,
    copies: 1,
    attributes: {
      chute: 95,
      ataque: 92,
      defesa: 35,
      forca: 88,
      salto: 85,
      estamina: 88,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=CR7',
  },
  {
    id: 'card_2',
    name: 'Lionel Messi',
    type: 'player',
    quality: 'legendary',
    level: 1,
    copies: 1,
    attributes: {
      chute: 94,
      ataque: 93,
      defesa: 38,
      forca: 75,
      salto: 69,
      estamina: 90,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=Messi',
  },
  {
    id: 'card_3',
    name: 'Neymar Jr',
    type: 'player',
    quality: 'epic',
    level: 1,
    copies: 2,
    attributes: {
      chute: 84,
      ataque: 87,
      defesa: 40,
      forca: 78,
      salto: 72,
      estamina: 85,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=Neymar',
  },
  {
    id: 'card_4',
    name: 'Vinícius Jr',
    type: 'player',
    quality: 'epic',
    level: 1,
    copies: 1,
    attributes: {
      chute: 82,
      ataque: 85,
      defesa: 42,
      forca: 80,
      salto: 75,
      estamina: 88,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=Vinicius',
  },
  {
    id: 'card_5',
    name: 'Rodri',
    type: 'player',
    quality: 'epic',
    level: 1,
    copies: 1,
    attributes: {
      chute: 76,
      ataque: 75,
      defesa: 88,
      forca: 82,
      salto: 78,
      estamina: 92,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=Rodri',
  },
  {
    id: 'card_6',
    name: 'Alisson',
    type: 'goalkeeper',
    quality: 'epic',
    level: 1,
    copies: 1,
    attributes: {
      habilidadeComMaos: 89,
      agilidade: 85,
      salto: 82,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=Alisson',
  },
  {
    id: 'card_7',
    name: 'Ederson',
    type: 'goalkeeper',
    quality: 'rare',
    level: 1,
    copies: 1,
    attributes: {
      habilidadeComMaos: 85,
      agilidade: 87,
      salto: 80,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=Ederson',
  },
  {
    id: 'card_8',
    name: 'João Félix',
    type: 'player',
    quality: 'rare',
    level: 1,
    copies: 1,
    attributes: {
      chute: 80,
      ataque: 82,
      defesa: 45,
      forca: 76,
      salto: 74,
      estamina: 83,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=Joao',
  },
];

// Equipamentos de exemplo
export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: 'eq_1',
    name: 'Chuteira de Ouro',
    quality: 'rare',
    level: 1,
    bonus: {
      chute: 5,
      forca: 2,
    },
  },
  {
    id: 'eq_2',
    name: 'Luvas Premium',
    quality: 'uncommon',
    level: 1,
    bonus: {
      habilidadeComMaos: 3,
      agilidade: 2,
    },
  },
  {
    id: 'eq_3',
    name: 'Protetor de Canela',
    quality: 'rare',
    level: 1,
    bonus: {
      defesa: 4,
      forca: 3,
    },
  },
  {
    id: 'eq_4',
    name: 'Fita de Pulso',
    quality: 'common',
    level: 1,
    bonus: {
      forca: 2,
      estamina: 1,
    },
  },
];

// Baús de exemplo
export const MOCK_CHESTS: Chest[] = [
  {
    id: 'chest_1',
    quality: 'common',
    openTime: 30,
    rewards: {
      cards: [MOCK_CARDS[7]],
      gameCoins: 500,
      specialCoins: 0,
    },
  },
  {
    id: 'chest_2',
    quality: 'rare',
    openTime: 120,
    rewards: {
      cards: [MOCK_CARDS[3], MOCK_CARDS[4]],
      gameCoins: 2000,
      specialCoins: 50,
    },
  },
];

// Inventário de exemplo
export const MOCK_INVENTORY: PlayerInventory = {
  cards: MOCK_CARDS.slice(0, 5),
  equipment: MOCK_EQUIPMENT.slice(0, 2),
  currency: {
    gameCoins: 5000,
    specialCoins: 100,
  },
  chests: MOCK_CHESTS,
  deck: MOCK_CARDS.slice(0, 3),
};

// Nomes de jogadores
export const PLAYER_NAMES = [
  'Cristiano',
  'Messi',
  'Neymar',
  'Vinícius',
  'Rodri',
  'Haaland',
  'Mbappé',
  'Benzema',
  'Lewandowski',
  'Salah',
];

// Função para gerar nome aleatório
export function getRandomPlayerName(): string {
  return PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)];
}

// Função para gerar ID único
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Função para gerar carta aleatória
export function generateRandomCard(): Card {
  const qualities: Array<'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'> = [
    'common',
    'uncommon',
    'rare',
    'epic',
    'legendary',
  ];
  const quality = qualities[Math.floor(Math.random() * qualities.length)];
  const isGoalkeeper = Math.random() > 0.8;

  if (isGoalkeeper) {
    return {
      id: generateId('card'),
      name: `Goleiro ${getRandomPlayerName()}`,
      type: 'goalkeeper',
      quality,
      level: 1,
      copies: 1,
      attributes: {
        habilidadeComMaos: Math.floor(Math.random() * 40) + 60,
        agilidade: Math.floor(Math.random() * 40) + 60,
        salto: Math.floor(Math.random() * 40) + 60,
      },
      equipment: [],
      image: 'https://via.placeholder.com/120x150?text=Goleiro',
    };
  }

  return {
    id: generateId('card'),
    name: getRandomPlayerName(),
    type: 'player',
    quality,
    level: 1,
    copies: 1,
    attributes: {
      chute: Math.floor(Math.random() * 40) + 60,
      ataque: Math.floor(Math.random() * 40) + 60,
      defesa: Math.floor(Math.random() * 40) + 40,
      forca: Math.floor(Math.random() * 40) + 60,
      salto: Math.floor(Math.random() * 40) + 60,
      estamina: Math.floor(Math.random() * 40) + 60,
    },
    equipment: [],
    image: 'https://via.placeholder.com/120x150?text=Jogador',
  };
}

// Função para gerar equipamento aleatório
export function generateRandomEquipment(): Equipment {
  const qualities: Array<'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'> = [
    'common',
    'uncommon',
    'rare',
    'epic',
    'legendary',
  ];
  const names = [
    'Chuteira',
    'Luvas',
    'Protetor',
    'Fita',
    'Cinto',
    'Meia',
    'Caneleira',
  ];

  const quality = qualities[Math.floor(Math.random() * qualities.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const bonusMultiplier = quality === 'legendary' ? 5 : quality === 'epic' ? 4 : quality === 'rare' ? 3 : quality === 'uncommon' ? 2 : 1;

  return {
    id: generateId('eq'),
    name: `${name} ${quality}`,
    quality,
    level: 1,
    bonus: {
      chute: Math.floor(Math.random() * 3) * bonusMultiplier,
      ataque: Math.floor(Math.random() * 3) * bonusMultiplier,
      defesa: Math.floor(Math.random() * 3) * bonusMultiplier,
      forca: Math.floor(Math.random() * 3) * bonusMultiplier,
      salto: Math.floor(Math.random() * 3) * bonusMultiplier,
      estamina: Math.floor(Math.random() * 3) * bonusMultiplier,
    },
  };
}
