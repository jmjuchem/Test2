import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useGameStore } from '../store/gameStore';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { inventory } = useGameStore();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>⚽ FutCards</Text>
        <Text style={styles.subtitle}>Jogo de Futebol de Cartas</Text>
      </View>

      {/* Moedas */}
      <View style={styles.currencyContainer}>
        <View style={styles.currencyBox}>
          <Text style={styles.currencyLabel}>Moedas do Jogo</Text>
          <Text style={styles.currencyValue}>
            {inventory.currency.gameCoins}
          </Text>
        </View>
        <View style={styles.currencyBox}>
          <Text style={styles.currencyLabel}>Moedas Especiais</Text>
          <Text style={styles.currencyValue}>
            {inventory.currency.specialCoins}
          </Text>
        </View>
      </View>

      {/* Menu Principal */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Play')}
        >
          <Text style={styles.menuButtonText}>🎮 Jogar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Collection')}
        >
          <Text style={styles.menuButtonText}>🃏 Coleção</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Chests')}
        >
          <Text style={styles.menuButtonText}>📦 Baús ({inventory.chests.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Shop')}
        >
          <Text style={styles.menuButtonText}>🛍️ Loja</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('PremiumShop')}
        >
          <Text style={styles.menuButtonText}>💳 Loja Premium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Deck')}
        >
          <Text style={styles.menuButtonText}>📋 Meu Deck</Text>
        </TouchableOpacity>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Estatísticas</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total de Cartas:</Text>
          <Text style={styles.statValue}>{inventory.cards.length}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Equipamentos:</Text>
          <Text style={styles.statValue}>{inventory.equipment.length}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Cartas no Deck:</Text>
          <Text style={styles.statValue}>{inventory.deck.length}/10</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00ff00',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#999999',
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  currencyBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#333333',
  },
  currencyLabel: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 8,
  },
  currencyValue: {
    color: '#00ff00',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuButton: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  statsTitle: {
    color: '#00ff00',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  statLabel: {
    color: '#999999',
    fontSize: 14,
  },
  statValue: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
