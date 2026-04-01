import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ActionResultProps {
  type: 'success' | 'fail' | 'blocked';
  power: number;
  defensePower: number;
  onAnimationEnd?: () => void;
}

const RESULT_CONFIG = {
  success: {
    icon: '⚽',
    color: '#10B981',
    message: 'GOL!',
    gradient: ['#10B981', '#059669'],
  },
  fail: {
    icon: '❌',
    color: '#EF4444',
    message: 'DEFENDIDO',
    gradient: ['#EF4444', '#DC2626'],
  },
  blocked: {
    icon: '🛡️',
    color: '#8B5CF6',
    message: 'BLOQUEADO',
    gradient: ['#8B5CF6', '#6D28D9'],
  },
};

export const ActionResult: React.FC<ActionResultProps> = ({
  type,
  power,
  defensePower,
  onAnimationEnd,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(1)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Animação de saída após 2 segundos
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationEnd?.();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [scaleAnim, opacityAnim, rotateAnim, onAnimationEnd]);

  const config = RESULT_CONFIG[type];
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const difference = power - defensePower;
  const diffPercentage = Math.abs(difference);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: scaleAnim },
            { rotate: rotation },
          ],
          opacity: opacityAnim,
        },
      ]}
    >
      <LinearGradient
        colors={config.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.resultBox}
      >
        {/* Ícone */}
        <Text style={styles.icon}>{config.icon}</Text>

        {/* Mensagem */}
        <Text style={styles.message}>{config.message}</Text>

        {/* Poderes */}
        <View style={styles.powersContainer}>
          <View style={styles.powerRow}>
            <Text style={styles.powerLabel}>Ataque:</Text>
            <Text style={styles.powerValue}>{Math.round(power)}</Text>
          </View>
          <View style={styles.powerRow}>
            <Text style={styles.powerLabel}>Defesa:</Text>
            <Text style={styles.powerValue}>{Math.round(defensePower)}</Text>
          </View>
          <View style={[styles.powerRow, styles.differencePower]}>
            <Text style={styles.powerLabel}>Diferença:</Text>
            <Text style={styles.powerValue}>
              {difference > 0 ? '+' : ''}{Math.round(difference)}
            </Text>
          </View>
        </View>

        {/* Barra de comparação */}
        <View style={styles.comparisonBar}>
          <View
            style={[
              styles.comparisonFill,
              {
                flex: power,
                backgroundColor: '#10B981',
              },
            ]}
          />
          <View
            style={[
              styles.comparisonFill,
              {
                flex: defensePower,
                backgroundColor: '#EF4444',
              },
            ]}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -100,
    marginTop: -100,
    zIndex: 1000,
  },
  resultBox: {
    width: 200,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  powersContainer: {
    width: '100%',
    marginBottom: 12,
    gap: 6,
  },
  powerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  powerLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  powerValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  differencePower: {
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  comparisonBar: {
    width: '100%',
    height: 8,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  comparisonFill: {
    height: '100%',
  },
});
