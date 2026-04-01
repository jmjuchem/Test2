import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useGameStore } from '../store/gameStore';
import { CardComponent } from '../components/CardComponent';
import { Quality } from '../types/game';

interface CollectionScreenProps {
  navigation: any;
}

export const CollectionScreen: React.FC<CollectionScreenProps> = ({
  navigation,
}) => {
  const { inventory } = useGameStore();
  const [selectedQuality, setSelectedQuality] = useState<Quality | 'all'>(
    'all'
  );
  const [selectedType, setSelectedType] = useState<'all' | 'player' | 'goalkeeper'>(
    'all'
  );

  const qualities: (Quality | 'all')[] = [
    'all',
    'common',
    'uncommon',
    'rare',
    'epic',
    'legendary',
  ];

  const filteredCards = inventory.cards.filter((card) => {
    const qualityMatch =
      selectedQuality === 'all' || card.quality === selectedQuality;
    const typeMatch = selectedType === 'all' || card.type === selectedType;
    return qualityMatch && typeMatch;
  });

  return (
    <View style={styles.container}>
      {/* Filtros */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Qualidade:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {qualities.map((quality) => (
            <TouchableOpacity
              key={quality}
              style={[
                styles.filterButton,
                selectedQuality === quality && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedQuality(quality)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedQuality === quality &&
                    styles.filterButtonTextActive,
                ]}
              >
                {quality === 'all' ? 'Todas' : quality.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filtro de Tipo */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Tipo:</Text>
        <View style={styles.typeFilterContainer}>
          {['all', 'player', 'goalkeeper'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                selectedType === type && styles.filterButtonActive,
              ]}
              onPress={() =>
                setSelectedType(type as 'all' | 'player' | 'goalkeeper')
              }
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedType === type && styles.filterButtonTextActive,
                ]}
              >
                {type === 'all'
                  ? 'Todos'
                  : type === 'player'
                  ? 'Jogadores'
                  : 'Goleiros'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Lista de Cartas */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {filteredCards.length} cartas encontradas
        </Text>
      </View>

      <FlatList
        data={filteredCards}
        renderItem={({ item }) => (
          <CardComponent
            card={item}
            showDetails={true}
            onPress={() => {
              navigation.navigate('CardDetail', { cardId: item.id });
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  filterLabel: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 8,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#333333',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#00ff00',
  },
  filterButtonText: {
    color: '#999999',
    fontSize: 12,
  },
  filterButtonTextActive: {
    color: '#000000',
    fontWeight: 'bold',
  },
  typeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0a0a0a',
  },
  statsText: {
    color: '#00ff00',
    fontSize: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
});
