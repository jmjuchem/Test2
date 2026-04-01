import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { useGameStore } from '../store/gameStore';
import { MatchService } from '../services/matchService';
import { Match, Card } from '../types/game';

interface MatchScreenProps {
  navigation: any;
  route: any;
}

export const MatchScreen: React.FC<MatchScreenProps> = ({
  navigation,
  route,
}) => {
  const { currentMatch, updateMatchState, endMatch } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(8);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [randomActionCount, setRandomActionCount] = useState(0);

  // Timer para turno
  useEffect(() => {
    if (!currentMatch || currentMatch.status !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Tempo esgotado - ação aleatória
          handleRandomAction();
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentMatch]);

  const handleRandomAction = () => {
    if (!currentMatch) return;

    const player =
      currentMatch.currentPlayer === 'player1'
        ? currentMatch.player1
        : currentMatch.player2;

    if (player.fieldCards.length === 0) return;

    const randomCard =
      player.fieldCards[
        Math.floor(Math.random() * player.fieldCards.length)
      ];
    MatchService.generateRandomAction(randomCard);

    setRandomActionCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        // Desistência automática
        Alert.alert(
          'Desistência',
          `${player.name} desistiu por inatividade!`
        );
        const winner =
          currentMatch.currentPlayer === 'player1' ? 'player2' : 'player1';
        endMatch(winner);
      }
      return newCount;
    });

    advanceTurn();
  };

  const handleAction = (action: string, card: Card) => {
    if (!currentMatch) return;

    const opponent =
      currentMatch.currentPlayer === 'player1'
        ? currentMatch.player2
        : currentMatch.player1;

    const result = MatchService.resolveAction(
      card,
      opponent.fieldCards[0],
      action
    );

    // Atualizar placar se foi gol
    if (action === 'shoot' && result.result === 'success') {
      const updatedMatch = {
        ...currentMatch,
        [currentMatch.currentPlayer === 'player1'
          ? 'player1'
          : 'player2']: {
          ...player,
          score: player.score + 1,
        },
      };
      updateMatchState(updatedMatch);
    }

    setRandomActionCount(0);
    setSelectedCard(null);
    setSelectedAction(null);
    setTimeLeft(8);

    advanceTurn();
  };

  const advanceTurn = () => {
    if (!currentMatch) return;

    const nextMatch = MatchService.nextTurn(currentMatch);

    // Verificar se deve adicionar carta (turnos 3 e 5)
    if (MatchService.shouldAddCard(nextMatch.currentTurn)) {
      Alert.alert(
        'Adicione uma Carta',
        'Você pode adicionar uma carta ao campo'
      );
    }

    // Verificar se partida acabou
    if (MatchService.shouldMatchEnd(nextMatch)) {
      if (MatchService.shouldGoPenalties(nextMatch)) {
        nextMatch.status = 'penalties';
      } else {
        const winner =
          nextMatch.player1.score > nextMatch.player2.score
            ? 'player1'
            : 'player2';
        endMatch(winner);
        return;
      }
    }

    updateMatchState(nextMatch);
  };

  if (!currentMatch) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhuma partida em andamento</Text>
      </View>
    );
  }

  const player =
    currentMatch.currentPlayer === 'player1'
      ? currentMatch.player1
      : currentMatch.player2;
  const opponent =
    currentMatch.currentPlayer === 'player1'
      ? currentMatch.player2
      : currentMatch.player1;

  const actionTypes = ['shoot', 'pass', 'defend', 'dribble'];

  return (
    <View style={styles.container}>
      {/* Placar */}
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.playerName}>{currentMatch.player1.name}</Text>
          <Text style={styles.score}>{currentMatch.player1.score}</Text>
        </View>
        <Text style={styles.separator}>vs</Text>
        <View style={styles.scoreBox}>
          <Text style={styles.playerName}>{currentMatch.player2.name}</Text>
          <Text style={styles.score}>{currentMatch.player2.score}</Text>
        </View>
      </View>

      {/* Turno e Timer */}
      <View style={styles.turnContainer}>
        <Text style={styles.turnText}>Turno {currentMatch.currentTurn}/8</Text>
        <View
          style={[
            styles.timerContainer,
            timeLeft <= 3 && styles.timerWarning,
          ]}
        >
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      </View>

      {/* Campo */}
      <View style={styles.fieldContainer}>
        <View style={styles.fieldSide}>
          <Text style={styles.fieldLabel}>Seu Time</Text>
          <FlatList
            data={player.fieldCards}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.fieldCard,
                  selectedCard?.id === item.id && styles.fieldCardSelected,
                ]}
                onPress={() => setSelectedCard(item)}
              >
                <Text style={styles.fieldCardName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.fieldDivider} />

        <View style={styles.fieldSide}>
          <Text style={styles.fieldLabel}>Time Adversário</Text>
          <FlatList
            data={opponent.fieldCards}
            renderItem={({ item }) => (
              <View style={styles.fieldCard}>
                <Text style={styles.fieldCardName}>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </View>

      {/* Ações */}
      {selectedCard && (
        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Escolha uma ação:</Text>
          <View style={styles.actionButtons}>
            {actionTypes.map((action) => (
              <TouchableOpacity
                key={action}
                style={styles.actionButton}
                onPress={() => handleAction(action, selectedCard)}
              >
                <Text style={styles.actionButtonText}>
                  {action === 'shoot'
                    ? '⚽ Chute'
                    : action === 'pass'
                    ? '📤 Passe'
                    : action === 'defend'
                    ? '🛡️ Defesa'
                    : '🏃 Dribla'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Informações */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Ações aleatórias: {randomActionCount}/3
        </Text>
        <Text style={styles.infoText}>
          Status: {currentMatch.status.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
  },
  scoreBox: {
    flex: 1,
    alignItems: 'center',
  },
  playerName: {
    color: '#00ff00',
    fontSize: 12,
    marginBottom: 4,
  },
  score: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  separator: {
    color: '#999999',
    fontSize: 16,
    marginHorizontal: 16,
  },
  turnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
  },
  turnText: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timerContainer: {
    backgroundColor: '#00ff00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  timerWarning: {
    backgroundColor: '#ff0000',
  },
  timerText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  fieldSide: {
    flex: 1,
  },
  fieldLabel: {
    color: '#00ff00',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fieldCard: {
    backgroundColor: '#0a0a0a',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  fieldCardSelected: {
    borderColor: '#00ff00',
    backgroundColor: '#1a3a1a',
  },
  fieldCardName: {
    color: '#ffffff',
    fontSize: 12,
  },
  fieldDivider: {
    width: 1,
    backgroundColor: '#333333',
    marginHorizontal: 8,
  },
  actionsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  actionsTitle: {
    color: '#00ff00',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#00ff00',
    padding: 12,
    borderRadius: 4,
  },
  actionButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  infoText: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 4,
  },
});
