import { Card, Match, MatchAction } from '../types/game';

export class MatchService {
  /**
   * Calcula o poder de uma ação baseado nos atributos da carta
   */
  static calculateActionPower(card: Card, actionType: string): number {
    const attrs = card.attributes as any;
    let power = 0;

    switch (actionType) {
      case 'shoot':
        power = attrs.chute || 0;
        break;
      case 'pass':
        power = attrs.ataque || 0;
        break;
      case 'defend':
        power = attrs.defesa || 0;
        break;
      case 'dribble':
        power = (attrs.ataque || 0) + (attrs.forca || 0) / 2;
        break;
    }

    // Adiciona bônus de equipamentos
    if (card.equipment && card.equipment.length > 0) {
      card.equipment.forEach((eq) => {
        const bonus = eq.bonus as any;
        if (bonus[actionType === 'shoot' ? 'chute' : 'ataque']) {
          power += bonus[actionType === 'shoot' ? 'chute' : 'ataque'];
        }
      });
    }

    return power;
  }

  /**
   * Resolve uma ação entre duas cartas
   */
  static resolveAction(
    attackingCard: Card,
    defendingCard: Card | undefined,
    actionType: string
  ): MatchAction {
    const attackPower = this.calculateActionPower(attackingCard, actionType);
    let defensePower = 0;

    if (defendingCard) {
      defensePower = this.calculateActionPower(defendingCard, 'defend');
    }

    const result = attackPower > defensePower ? 'success' : 'fail';

    return {
      type: actionType as any,
      card: attackingCard,
      targetCard: defendingCard,
      result: result === 'success' && defendingCard ? 'blocked' : result,
    };
  }

  /**
   * Gera uma ação aleatória
   */
  static generateRandomAction(card: Card): MatchAction {
    const actionTypes = ['shoot', 'pass', 'defend', 'dribble'];
    const randomAction =
      actionTypes[Math.floor(Math.random() * actionTypes.length)];

    return {
      type: randomAction as any,
      card,
      result: Math.random() > 0.5 ? 'success' : 'fail',
    };
  }

  /**
   * Calcula o placar baseado nas ações da partida
   */
  static calculateScore(actions: MatchAction[]): { player1: number; player2: number } {
    let player1Score = 0;
    let player2Score = 0;

    actions.forEach((action) => {
      if (action.type === 'shoot' && action.result === 'success') {
        // Incrementa o placar do jogador que fez o gol
        player1Score += 1; // Isso deveria ser mais dinâmico
      }
    });

    return { player1: player1Score, player2: player2Score };
  }

  /**
   * Verifica se a partida deve terminar
   */
  static shouldMatchEnd(match: Match): boolean {
    return match.currentTurn >= 8;
  }

  /**
   * Valida se o jogador pode fazer uma ação
   */
  static canPlayerAct(
    match: Match,
    playerId: string
  ): boolean {
    const isCurrentPlayer =
      (match.currentPlayer === 'player1' && match.player1.id === playerId) ||
      (match.currentPlayer === 'player2' && match.player2.id === playerId);

    return isCurrentPlayer && match.status === 'playing';
  }

  /**
   * Alterna o turno
   */
  static nextTurn(match: Match): Match {
    const nextPlayer = match.currentPlayer === 'player1' ? 'player2' : 'player1';
    let nextTurn = match.currentTurn;

    if (match.currentPlayer === 'player2') {
      nextTurn += 1;
    }

    return {
      ...match,
      currentPlayer: nextPlayer,
      currentTurn: nextTurn,
    };
  }

  /**
   * Verifica se é necessário adicionar uma carta (turnos 3 e 5)
   */
  static shouldAddCard(turn: number): boolean {
    return turn === 3 || turn === 5;
  }

  /**
   * Verifica se é necessário fazer penalidades
   */
  static shouldGoPenalties(match: Match): boolean {
    return (
      match.currentTurn >= 8 &&
      match.player1.score === match.player2.score
    );
  }
}
