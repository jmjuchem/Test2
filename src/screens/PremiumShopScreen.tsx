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

interface PremiumShopScreenProps {
  navigation: any;
}

interface PremiumItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  bonus: string;
  icon: string;
}

const PREMIUM_ITEMS: PremiumItem[] = [
  {
    id: 'starter',
    name: 'Pacote Iniciante',
    description: '500 Moedas Especiais + 5000 Moedas do Jogo',
    price: 9.99,
    currency: 'USD',
    bonus: '+1 Baú Raro',
    icon: '🎁',
  },
  {
    id: 'standard',
    name: 'Pacote Padrão',
    description: '1500 Moedas Especiais + 15000 Moedas do Jogo',
    price: 24.99,
    currency: 'USD',
    bonus: '+3 Baús Épicos',
    icon: '⭐',
  },
  {
    id: 'premium',
    name: 'Pacote Premium',
    description: '3500 Moedas Especiais + 35000 Moedas do Jogo',
    price: 49.99,
    currency: 'USD',
    bonus: '+5 Baús Lendários + Carta Exclusiva',
    icon: '👑',
  },
  {
    id: 'elite',
    name: 'Pacote Elite',
    description: '10000 Moedas Especiais + 100000 Moedas do Jogo',
    price: 99.99,
    currency: 'USD',
    bonus: '+10 Baús Lendários + 3 Cartas Exclusivas',
    icon: '💎',
  },
];

const CARD_PACKS: PremiumItem[] = [
  {
    id: 'cards1',
    name: 'Pacote de 5 Cartas',
    description: 'Cartas aleatórias de qualidade Rara ou superior',
    price: 4.99,
    currency: 'USD',
    bonus: 'Garantido 1 Raro',
    icon: '🃏',
  },
  {
    id: 'cards2',
    name: 'Pacote de 10 Cartas',
    description: 'Cartas aleatórias de qualidade Épica ou superior',
    price: 9.99,
    currency: 'USD',
    bonus: 'Garantido 2 Épicos',
    icon: '🃏🃏',
  },
  {
    id: 'cards3',
    name: 'Pacote Lendário',
    description: 'Cartas garantidas de qualidade Lendária',
    price: 19.99,
    currency: 'USD',
    bonus: 'Garantido 1 Lendário',
    icon: '👑',
  },
];

export const PremiumShopScreen: React.FC<PremiumShopScreenProps> = ({
  navigation,
}) => {
  const { inventory, addCurrency } = useGameStore();
  const [processingPayment, setProcessingPayment] = useState(false);

  const handlePurchase = async (item: PremiumItem) => {
    setProcessingPayment(true);

    try {
      // Simular integração com Stripe
      // Em produção, isso chamaria um backend que processa o pagamento
      Alert.alert(
        'Pagamento',
        `Processando pagamento de $${item.price} para ${item.name}...`
      );

      // Simular sucesso após 2 segundos
      setTimeout(() => {
        // Adicionar recompensas
        let specialCoins = 0;
        let gameCoins = 0;

        if (item.id === 'starter') {
          specialCoins = 500;
          gameCoins = 5000;
        } else if (item.id === 'standard') {
          specialCoins = 1500;
          gameCoins = 15000;
        } else if (item.id === 'premium') {
          specialCoins = 3500;
          gameCoins = 35000;
        } else if (item.id === 'elite') {
          specialCoins = 10000;
          gameCoins = 100000;
        }

        if (specialCoins > 0 || gameCoins > 0) {
          addCurrency(gameCoins, specialCoins);
        }

        setProcessingPayment(false);
        Alert.alert(
          'Sucesso!',
          `Você comprou ${item.name}!\n\nRecompensas adicionadas à sua conta.`
        );
      }, 2000);
    } catch (error) {
      setProcessingPayment(false);
      Alert.alert('Erro', 'Falha ao processar pagamento. Tente novamente.');
    }
  };

  const renderItem = (item: PremiumItem) => (
    <View key={item.id} style={styles.itemContainer}>
      <View style={styles.itemIcon}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.bonusContainer}>
          <Text style={styles.bonusText}>✨ {item.bonus}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.buyButton,
          processingPayment && styles.buyButtonDisabled,
        ]}
        onPress={() => handlePurchase(item)}
        disabled={processingPayment}
      >
        <Text style={styles.buyButtonPrice}>${item.price}</Text>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>💳 Loja Premium</Text>
        <Text style={styles.subtitle}>Pagamento com Cartão de Crédito</Text>
      </View>

      {/* Aviso de Segurança */}
      <View style={styles.securityWarning}>
        <Text style={styles.securityText}>
          🔒 Seus dados de pagamento são processados com segurança via Stripe
        </Text>
      </View>

      {/* Saldo Atual */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Moedas do Jogo</Text>
          <Text style={styles.balanceValue}>
            {inventory.currency.gameCoins}
          </Text>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Moedas Especiais</Text>
          <Text style={styles.balanceValue}>
            {inventory.currency.specialCoins}
          </Text>
        </View>
      </View>

      {/* Pacotes de Moedas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pacotes de Moedas</Text>
        {PREMIUM_ITEMS.map(renderItem)}
      </View>

      {/* Pacotes de Cartas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pacotes de Cartas</Text>
        {CARD_PACKS.map(renderItem)}
      </View>

      {/* Termos */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          Ao comprar, você concorda com nossos Termos de Serviço e Política de
          Privacidade. Todos os pagamentos são processados de forma segura.
        </Text>
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
  securityWarning: {
    backgroundColor: '#1a3a1a',
    borderWidth: 1,
    borderColor: '#00ff00',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
  },
  securityText: {
    color: '#00ff00',
    fontSize: 12,
    textAlign: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  balanceBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  balanceLabel: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 4,
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
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  itemIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 28,
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
    marginBottom: 6,
  },
  bonusContainer: {
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bonusText: {
    color: '#ffaa00',
    fontSize: 11,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#00ff00',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginLeft: 12,
  },
  buyButtonDisabled: {
    backgroundColor: '#666666',
  },
  buyButtonPrice: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buyButtonText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  termsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  termsText: {
    color: '#999999',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
  },
});
