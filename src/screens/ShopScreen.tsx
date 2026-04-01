import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useGameStore } from '../store/gameStore';

interface ShopScreenProps {
  navigation: any;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'equipment' | 'coins' | 'chest';
  quality?: string;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'eq1',
    name: 'Chuteira de Ouro',
    description: '+5 Chute',
    price: 500,
    type: 'equipment',
    quality: 'rare',
  },
  {
    id: 'eq2',
    name: 'Luvas Premium',
    description: '+3 Habilidade com Mãos',
    price: 300,
    type: 'equipment',
    quality: 'uncommon',
  },
  {
    id: 'eq3',
    name: 'Protetor de Canela',
    description: '+4 Defesa',
    price: 400,
    type: 'equipment',
    quality: 'rare',
  },
  {
    id: 'coins1',
    name: '1000 Moedas',
    description: 'Pacote de moedas do jogo',
    price: 100,
    type: 'coins',
  },
  {
    id: 'coins2',
    name: '5000 Moedas',
    description: 'Pacote grande de moedas',
    price: 400,
    type: 'coins',
  },
  {
    id: 'chest1',
    name: 'Baú Comum',
    description: 'Contém cartas e moedas',
    price: 200,
    type: 'chest',
    quality: 'common',
  },
  {
    id: 'chest2',
    name: 'Baú Raro',
    description: 'Mais recompensas',
    price: 800,
    type: 'chest',
    quality: 'rare',
  },
];

export const ShopScreen: React.FC<ShopScreenProps> = ({ navigation }) => {
  const { inventory, addCurrency } = useGameStore();

  const handleBuy = (item: ShopItem) => {
    if (inventory.currency.gameCoins < item.price) {
      Alert.alert(
        'Moedas insuficientes',
        `Você precisa de ${item.price} moedas`
      );
      return;
    }

    // Simular compra
    addCurrency(-item.price, 0);
    Alert.alert('Compra realizada', `Você comprou ${item.name}!`);
  };

  const renderItem = (item: ShopItem) => (
    <View key={item.id} style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        {item.quality && (
          <Text style={styles.itemQuality}>{item.quality.toUpperCase()}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => handleBuy(item)}
      >
        <Text style={styles.buyButtonText}>{item.price}</Text>
        <Text style={styles.buyButtonCoin}>🪙</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Loja de Equipamentos</Text>
        <Text style={styles.subtitle}>Compre com moedas do jogo</Text>
      </View>

      {/* Saldo */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Seu Saldo:</Text>
        <Text style={styles.balanceValue}>
          {inventory.currency.gameCoins} 🪙
        </Text>
      </View>

      {/* Equipamentos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipamentos</Text>
        {SHOP_ITEMS.filter((item) => item.type === 'equipment').map(
          renderItem
        )}
      </View>

      {/* Moedas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pacotes de Moedas</Text>
        {SHOP_ITEMS.filter((item) => item.type === 'coins').map(renderItem)}
      </View>

      {/* Baús */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Baús</Text>
        {SHOP_ITEMS.filter((item) => item.type === 'chest').map(renderItem)}
      </View>
    </ScrollView>
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
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  balanceLabel: {
    color: '#999999',
    fontSize: 14,
  },
  balanceValue: {
    color: '#00ff00',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#00ff00',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 4,
  },
  itemQuality: {
    color: '#00ff00',
    fontSize: 10,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#00ff00',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buyButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buyButtonCoin: {
    fontSize: 14,
  },
});
