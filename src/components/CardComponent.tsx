import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from '../types/game';

interface CardComponentProps {
  card: Card;
  onPress?: () => void;
  selected?: boolean;
  showDetails?: boolean;
}

const qualityColors = {
  common: '#999999',
  uncommon: '#00ff00',
  rare: '#0099ff',
  epic: '#9900ff',
  legendary: '#ffaa00',
};

export const CardComponent: React.FC<CardComponentProps> = ({
  card,
  onPress,
  selected,
  showDetails,
}) => {
  const isPlayer = card.type === 'player';
  const attributes = card.attributes as any;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: qualityColors[card.quality] },
        selected && styles.selected,
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{card.name}</Text>
        <Text style={[styles.quality, { color: qualityColors[card.quality] }]}>
          {card.quality.toUpperCase()}
        </Text>
      </View>

      <Image
        source={{ uri: card.image }}
        style={styles.image}
        defaultSource={require('../assets/placeholder.png')}
      />

      <View style={styles.levelContainer}>
        <Text style={styles.level}>Nível {card.level}</Text>
      </View>

      {showDetails && (
        <View style={styles.attributesContainer}>
          {isPlayer ? (
            <>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Chute:</Text>
                <Text style={styles.attributeValue}>{attributes.chute}</Text>
              </View>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Ataque:</Text>
                <Text style={styles.attributeValue}>{attributes.ataque}</Text>
              </View>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Defesa:</Text>
                <Text style={styles.attributeValue}>{attributes.defesa}</Text>
              </View>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Força:</Text>
                <Text style={styles.attributeValue}>{attributes.forca}</Text>
              </View>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Salto:</Text>
                <Text style={styles.attributeValue}>{attributes.salto}</Text>
              </View>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Estamina:</Text>
                <Text style={styles.attributeValue}>{attributes.estamina}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Mãos:</Text>
                <Text style={styles.attributeValue}>
                  {attributes.habilidadeComMaos}
                </Text>
              </View>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Agilidade:</Text>
                <Text style={styles.attributeValue}>{attributes.agilidade}</Text>
              </View>
              <View style={styles.attributeRow}>
                <Text style={styles.attributeLabel}>Salto:</Text>
                <Text style={styles.attributeValue}>{attributes.salto}</Text>
              </View>
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#1a1a1a',
    margin: 8,
    width: 120,
  },
  selected: {
    borderColor: '#00ff00',
    backgroundColor: '#2a2a2a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
  quality: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    marginBottom: 8,
  },
  levelContainer: {
    backgroundColor: '#333333',
    padding: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  level: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
  },
  attributesContainer: {
    backgroundColor: '#0a0a0a',
    padding: 4,
    borderRadius: 4,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  attributeLabel: {
    color: '#999999',
    fontSize: 9,
  },
  attributeValue: {
    color: '#00ff00',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
