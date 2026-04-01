import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedTimerProps {
  duration: number; // em segundos
  onTimeUp?: () => void;
  size?: 'small' | 'medium' | 'large';
  showWarning?: boolean; // mostrar aviso quando < 5s
}

export const AnimatedTimer: React.FC<AnimatedTimerProps> = ({
  duration,
  onTimeUp,
  size = 'medium',
  showWarning = true,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const colorAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  // Animação de aviso quando tempo está baixo
  useEffect(() => {
    if (timeLeft <= 5 && showWarning) {
      setIsWarning(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      setIsWarning(false);
      scaleAnim.setValue(1);
    }
  }, [timeLeft, showWarning, scaleAnim]);

  const sizeStyles = {
    small: { fontSize: 24, width: 60, height: 60 },
    medium: { fontSize: 36, width: 100, height: 100 },
    large: { fontSize: 48, width: 140, height: 140 },
  };

  const currentStyle = sizeStyles[size];
  const percentage = timeLeft / duration;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: currentStyle.width,
          height: currentStyle.height,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={
          isWarning
            ? ['#EF4444', '#DC2626']
            : ['#3B82F6', '#1E40AF']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.timerCircle,
          {
            width: currentStyle.width,
            height: currentStyle.height,
          },
        ]}
      >
        {/* Progresso circular */}
        <View
          style={[
            styles.progressRing,
            {
              width: currentStyle.width - 4,
              height: currentStyle.height - 4,
              borderWidth: size === 'small' ? 2 : size === 'medium' ? 3 : 4,
              borderColor: isWarning ? '#FCA5A5' : '#93C5FD',
            },
          ]}
        />

        {/* Texto do tempo */}
        <Text
          style={[
            styles.timerText,
            {
              fontSize: currentStyle.fontSize,
              color: isWarning ? '#FEE2E2' : '#FFFFFF',
            },
          ]}
        >
          {timeLeft}
        </Text>

        {/* Barra de progresso inferior */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${percentage * 100}%`,
                backgroundColor: isWarning ? '#EF4444' : '#10B981',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCircle: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  progressRing: {
    position: 'absolute',
    borderRadius: 100,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  timerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderBottomLeftRadius: 100,
  },
});
