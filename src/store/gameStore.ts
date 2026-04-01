import { create } from 'zustand';
import { Card, Equipment, Currency, PlayerInventory, Match, Chest } from '../types/game';

interface GameStore {
  // Inventário
  inventory: PlayerInventory;
  
  // Partida
  currentMatch: Match | null;
  
  // Ações
  addCard: (card: Card) => void;
  removeCard: (cardId: string) => void;
  addEquipment: (equipment: Equipment) => void;
  upgradeCard: (cardId: string, cost: number) => void;
  equipItem: (cardId: string, equipment: Equipment) => void;
  addCurrency: (gameCoins: number, specialCoins: number) => void;
  addChest: (chest: Chest) => void;
  
  // Partida
  startMatch: (match: Match) => void;
  endMatch: (winner: 'player1' | 'player2' | 'draw') => void;
  updateMatchState: (match: Match) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  inventory: {
    cards: [],
    equipment: [],
    currency: {
      gameCoins: 1000,
      specialCoins: 0,
    },
    chests: [],
    deck: [],
  },
  
  currentMatch: null,
  
  addCard: (card) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        cards: [...state.inventory.cards, card],
      },
    })),
  
  removeCard: (cardId) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        cards: state.inventory.cards.filter((c) => c.id !== cardId),
      },
    })),
  
  addEquipment: (equipment) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        equipment: [...state.inventory.equipment, equipment],
      },
    })),
  
  upgradeCard: (cardId, cost) =>
    set((state) => {
      if (state.inventory.currency.gameCoins < cost) {
        return state;
      }
      
      return {
        inventory: {
          ...state.inventory,
          cards: state.inventory.cards.map((c) =>
            c.id === cardId ? { ...c, level: c.level + 1 } : c
          ),
          currency: {
            ...state.inventory.currency,
            gameCoins: state.inventory.currency.gameCoins - cost,
          },
        },
      };
    }),
  
  equipItem: (cardId, equipment) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        cards: state.inventory.cards.map((c) =>
          c.id === cardId
            ? { ...c, equipment: [...c.equipment, equipment] }
            : c
        ),
      },
    })),
  
  addCurrency: (gameCoins, specialCoins) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        currency: {
          gameCoins: state.inventory.currency.gameCoins + gameCoins,
          specialCoins: state.inventory.currency.specialCoins + specialCoins,
        },
      },
    })),
  
  addChest: (chest) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        chests: [...state.inventory.chests, chest],
      },
    })),
  
  startMatch: (match) =>
    set(() => ({
      currentMatch: match,
    })),
  
  endMatch: (winner) =>
    set((state) => {
      if (!state.currentMatch) return state;
      
      return {
        currentMatch: {
          ...state.currentMatch,
          status: 'finished',
          winner,
        },
      };
    }),
  
  updateMatchState: (match) =>
    set(() => ({
      currentMatch: match,
    })),
}));
