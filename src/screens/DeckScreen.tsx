import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useGameStore } from '../store/gameStore';
import { CardComponent } from '../components/CardComponent';
import { Card } from '../types/game';

interface DeckScreenProps {
  navigation: any;
}

export const DeckScreen: React.FC<DeckScreenProps> = ({ navigation }) => {
  const { inventory } = useGameStore();
  const [selectedCards, setSelectedCards] = useState<Card[]>(
    inventory.deck || []
  );

  const hasGoalkeeper = selectedCards.some((c) => c.type === 'goalkeeper');
  const canAddCard = selectedCards.length < 10;

  const handleCardPress = (card: Card) => {
    if (selectedCards.find((c) => c.id === card.id)) {
      // Remove card
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else {
      // Add card
      if (selectedCards.length < 10) {
        setSelectedCards([...selectedCards, card]);
      } else {
        Alert.alert('Limite atingido', 'Você pode adicionar no máximo 10 cartas');
      }
    }
  };

  const handleSaveDeck = () => {
    if (selectedCards.length === 0) {
      Alert.alert('Deck vazio', 'Adicione pelo menos uma carta ao seu deck');
      return;
    }

    if (!hasGoalkeeper) {
      Alert.alert(
        'Goleiro obrigatório',
        'Você precisa adicionar um goleiro ao seu deck'
      );
      return;
    }

    // Salvar deck
    Alert.alert('Sucesso', 'Deck salvo com sucesso!');
  };

  return (
    <View style={styles.container}>
      {/* Info do Deck */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Cartas no Deck</Text>
          <Text style={styles.infoValue}>{selectedCards.length}/10</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Goleiro</Text>
          <Text style={styles.infoValue}>
            {hasGoalkeeper ? '✓' : '✗'}
          </Text>
        </View>
      </View>

      {/* Deck Atual */}
      {selectedCards.length > 0 && (
        <View style={styles.currentDeckContainer}>
          <Text style={styles.sectionTitle}>Seu Deck</Text>
          <FlatList
            data={selectedCards}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.deckCardItem}
                onPress={() => handleCardPress(item)}
              >
                <Text style={styles.deckCardName}>{item.name}</Text>
                <Text style={styles.deckCardType}>
                  {item.type === 'player' ? '⚽' : '🥅'}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Cartas Disponíveis */}
      <View style={styles.availableContainer}>
        <Text style={styles.sectionTitle}>Cartas Disponíveis</Text>
        <FlatList
          data={inventory.cards.filter(
            (c) => !selectedCards.find((sc) => sc.id === c.id)
          )}
          renderItem={({ item }) => (
            <CardComponent
              card={item}
              selected={selectedCards.some((c) => c.id === item.id)}
              onPress={() => handleCardPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={true}
        />
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          selectedCards.length === 0 && styles.saveButtonDisabled,
        ]}
        onPress={handleSaveDeck}
        disabled={selectedCards.length === 0}
      >
        <Text style={styles.saveButtonText}>Salvar Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  infoLabel: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: '#00ff00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentDeckContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  sectionTitle: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  deckCardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#0a0a0a',
    borderRadius: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#333333',
  },
  deckCardName: {
    color: '#ffffff',
    fontSize: 12,
    flex: 1,
  },
  deckCardType: {
    fontSize: 16,
  },
  availableContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#00ff00',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#666666',
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
