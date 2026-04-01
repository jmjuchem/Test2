// Tipos de atributos
export interface PlayerAttributes {
  chute: number;
  ataque: number;
  defesa: number;
  forca: number;
  salto: number;
  estamina: number;
}

export interface GoalkeeperAttributes {
  habilidadeComMaos: number;
  agilidade: number;
  salto: number;
}

// Qualidades
export type Quality = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// Tipos de cartas
export type CardType = 'player' | 'goalkeeper';

// Interface de Carta
export interface Card {
  id: string;
  name: string;
  type: CardType;
  quality: Quality;
  level: number;
  copies: number;
  attributes: PlayerAttributes | GoalkeeperAttributes;
  equipment: Equipment[];
  image: string;
}

// Interface de Equipamento
export interface Equipment {
  id: string;
  name: string;
  quality: Quality;
  level: number;
  bonus: {
    chute?: number;
    ataque?: number;
    defesa?: number;
    forca?: number;
    salto?: number;
    estamina?: number;
    habilidadeComMaos?: number;
    agilidade?: number;
  };
}

// Moedas
export interface Currency {
  gameCoins: number;
  specialCoins: number;
}

// Baú
export interface Chest {
  id: string;
  quality: Quality;
  openTime: number; // em segundos
  rewards: {
    cards: Card[];
    gameCoins: number;
    specialCoins: number;
  };
}

// Inventário do jogador
export interface PlayerInventory {
  cards: Card[];
  equipment: Equipment[];
  currency: Currency;
  chests: Chest[];
  deck: Card[];
}

// Estado da partida
export interface Match {
  id: string;
  player1: {
    id: string;
    name: string;
    selectedCards: Card[];
    fieldCards: Card[];
    goalkeeper: Card;
    score: number;
  };
  player2: {
    id: string;
    name: string;
    selectedCards: Card[];
    fieldCards: Card[];
    goalkeeper: Card;
    score: number;
  };
  currentTurn: number;
  currentPlayer: 'player1' | 'player2';
  status: 'selection' | 'playing' | 'finished' | 'penalties';
  winner?: 'player1' | 'player2' | 'draw';
}

// Ação de partida
export interface MatchAction {
  type: 'shoot' | 'pass' | 'defend' | 'dribble';
  card: Card;
  targetCard?: Card;
  result: 'success' | 'fail' | 'blocked';
}
