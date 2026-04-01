import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedCardProps {
  id: string;
  name: string;
  type: 'player' | 'goalkeeper';
  quality: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  attributes: any;
  image?: string;
  onPress?: (id: string) => void;
  selected?: boolean;
}

const QUALITY_COLORS = {
  common: ['#6B7280', '#4B5563'],
  uncommon: ['#10B981', '#059669'],
  rare: ['#D97706', '#B45309'],
  epic: ['#8B5CF6', '#6D28D9'],
  legendary: ['#FBBF24', '#D97706'],
};

const QUALITY_BORDER = {
  common: '#9CA3AF',
  uncommon: '#10B981',
  rare: '#D97706',
  epic: '#8B5CF6',
  legendary: '#FBBF24',
};

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  id,
  name,
  type,
  quality,
  attributes,
  image,
  onPress,
  selected,
}) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const [opacityAnim] = React.useState(new Animated.Value(1));

  const handlePress = () => {
    // Animação de press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.(id);
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
    opacity: opacityAnim,
  };

  const borderColor = QUALITY_BORDER[quality];
  const [gradStart, gradEnd] = QUALITY_COLORS[quality];

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={[gradStart, gradEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.card,
          {
            borderColor: borderColor,
            borderWidth: selected ? 3 : 2,
            opacity: selected ? 1 : 0.8,
          },
        ]}
      >
        {/* Imagem */}
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>{name.charAt(0)}</Text>
        </View>

        {/* Informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.quality}>{quality.toUpperCase()}</Text>
          <Text style={styles.type}>{type === 'player' ? '⚽' : '🥅'}</Text>
        </View>

        {/* Atributos */}
        <View style={styles.attributesContainer}>
          {type === 'player' ? (
            <>
              <AttributeBar label="CHT" value={attributes.chute} />
              <AttributeBar label="ATQ" value={attributes.ataque} />
              <AttributeBar label="DEF" value={attributes.defesa} />
            </>
          ) : (
            <>
              <AttributeBar label="MÃO" value={attributes.habilidadeComMaos} />
              <AttributeBar label="AGI" value={attributes.agilidade} />
              <AttributeBar label="SAL" value={attributes.salto} />
            </>
          )}
        </View>

        {/* Badge de seleção */}
        {selected && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedText}>✓</Text>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

interface AttributeBarProps {
  label: string;
  value: number;
}

const AttributeBar: React.FC<AttributeBarProps> = ({ label, value }) => {
  const percentage = Math.min(value / 100, 1);

  return (
    <View style={styles.attributeRow}>
      <Text style={styles.attributeLabel}>{label}</Text>
      <View style={styles.attributeBarContainer}>
        <View
          style={[
            styles.attributeBarFill,
            { width: `${percentage * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.attributeValue}>{Math.round(value)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  card: {
    width: 120,
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imagePlaceholder: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  quality: {
    fontSize: 10,
    color: '#D1D5DB',
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
  },
  attributesContainer: {
    gap: 4,
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  attributeLabel: {
    fontSize: 9,
    color: '#D1D5DB',
    width: 20,
  },
  attributeBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  attributeBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  attributeValue: {
    fontSize: 9,
    color: '#D1D5DB',
    width: 20,
    textAlign: 'right',
  },
  selectedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
