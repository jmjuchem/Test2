import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useGameStore } from '../store/gameStore';
import { Chest } from '../types/game';

interface ChestsScreenProps {
  navigation: any;
}

const CHEST_OPEN_TIMES = {
  common: 30,
  uncommon: 60,
  rare: 120,
  epic: 300,
  legendary: 600,
};

export const ChestsScreen: React.FC<ChestsScreenProps> = ({ navigation }) => {
  const { inventory, addCurrency, addCard } = useGameStore();
  const [openingChests, setOpeningChests] = useState<{
    [key: string]: number;
  }>({});

  // Timer para baús sendo abertos
  useEffect(() => {
    const timers = Object.keys(openingChests).map((chestId) => {
      return setInterval(() => {
        setOpeningChests((prev) => {
          const newTime = prev[chestId] - 1;
          if (newTime <= 0) {
            // Baú aberto - mostrar recompensas
            const chest = inventory.chests.find((c) => c.id === chestId);
            if (chest) {
              Alert.alert(
                'Baú Aberto!',
                `Você ganhou:\n- ${chest.rewards.gameCoins} moedas\n- ${chest.rewards.specialCoins} moedas especiais\n- ${chest.rewards.cards.length} cartas`
              );
              addCurrency(
                chest.rewards.gameCoins,
                chest.rewards.specialCoins
              );
              chest.rewards.cards.forEach((card) => addCard(card));
            }
            const newOpening = { ...prev };
            delete newOpening[chestId];
            return newOpening;
          }
          return { ...prev, [chestId]: newTime };
        });
      }, 1000);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [openingChests]);

  const handleOpenChest = (chest: Chest) => {
    if (openingChests[chest.id]) {
      Alert.alert('Baú em abertura', 'Este baú já está sendo aberto');
      return;
    }

    setOpeningChests((prev) => ({
      ...prev,
      [chest.id]: chest.openTime,
    }));
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const getQualityColor = (quality: string) => {
    const colors = {
      common: '#999999',
      uncommon: '#00ff00',
      rare: '#0099ff',
      epic: '#9900ff',
      legendary: '#ffaa00',
    };
    return colors[quality as keyof typeof colors] || '#999999';
  };

  const renderChest = (chest: Chest) => {
    const isOpening = openingChests[chest.id];
    const timeLeft = isOpening || 0;

    return (
      <View
        key={chest.id}
        style={[
          styles.chestContainer,
          { borderColor: getQualityColor(chest.quality) },
        ]}
      >
        <View style={styles.chestHeader}>
          <Text style={styles.chestName}>
            📦 Baú {chest.quality.toUpperCase()}
          </Text>
          <Text style={[styles.chestQuality, { color: getQualityColor(chest.quality) }]}>
            {chest.quality}
          </Text>
        </View>

        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardLabel}>Recompensas:</Text>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardText}>
              🪙 {chest.rewards.gameCoins} moedas
            </Text>
          </View>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardText}>
              ⭐ {chest.rewards.specialCoins} especiais
            </Text>
          </View>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardText}>
              🃏 {chest.rewards.cards.length} cartas
            </Text>
          </View>
        </View>

        {isOpening ? (
          <View style={styles.openingContainer}>
            <Text style={styles.openingText}>Abrindo...</Text>
            <Text style={styles.timeLeftText}>{formatTime(timeLeft)}</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      ((chest.openTime - timeLeft) / chest.openTime) * 100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.openButton}
            onPress={() => handleOpenChest(chest)}
          >
            <Text style={styles.openButtonText}>Abrir Baú</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Meus Baús</Text>
        <Text style={styles.subtitle}>
          {inventory.chests.length} baú(s) disponível(is)
        </Text>
      </View>

      {/* Lista de Baús */}
      {inventory.chests.length > 0 ? (
        <FlatList
          data={inventory.chests}
          renderItem={({ item }) => renderChest(item)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você não tem baús</Text>
          <Text style={styles.emptySubtext}>
            Compre baús na loja para ganhar recompensas
          </Text>
        </View>
      )}

      {/* Dica */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Dicas</Text>
        <Text style={styles.tipsText}>
          • Baús de maior qualidade têm recompensas melhores
        </Text>
        <Text style={styles.tipsText}>
          • Você pode abrir até 4 baús simultaneamente
        </Text>
        <Text style={styles.tipsText}>
          • Tempo de abertura varia por qualidade
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    color: '#00ff00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999999',
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chestContainer: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  chestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chestName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chestQuality: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  rewardsContainer: {
    backgroundColor: '#0a0a0a',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  rewardLabel: {
    color: '#00ff00',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  rewardRow: {
    marginBottom: 4,
  },
  rewardText: {
    color: '#999999',
    fontSize: 12,
  },
  openingContainer: {
    alignItems: 'center',
  },
  openingText: {
    color: '#00ff00',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeLeftText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff00',
  },
  openButton: {
    backgroundColor: '#00ff00',
    paddingVertical: 12,
    borderRadius: 4,
  },
  openButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
  },
  tipsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  tipsTitle: {
    color: '#00ff00',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipsText: {
    color: '#999999',
    fontSize: 11,
    marginBottom: 4,
  },
});
