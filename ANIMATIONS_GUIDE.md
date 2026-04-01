# Guia de Animações e UI - FutCards

Documentação completa sobre animações, transições e melhorias de UI para o FutCards.

## 🎨 Paleta de Cores

### Cores Primárias
- **Verde (Sucesso):** #10B981
- **Azul (Primário):** #3B82F6
- **Roxo (Premium):** #8B5CF6
- **Vermelho (Erro):** #EF4444

### Cores Secundárias
- **Ouro (Lendário):** #FBBF24
- **Prata (Épico):** #D1D5DB
- **Bronze (Raro):** #D97706
- **Cinza (Comum):** #6B7280

### Cores Neutras
- **Fundo Escuro:** #1F2937
- **Fundo Claro:** #F9FAFB
- **Texto Primário:** #111827
- **Texto Secundário:** #6B7280

## ✨ Animações Principais

### 1. Transição de Tela

```typescript
// Fade In/Out
const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 300,
};

const fadeOut = {
  from: { opacity: 1 },
  to: { opacity: 0 },
  duration: 300,
};
```

### 2. Flip de Carta

```typescript
// Animação de virada de carta
const cardFlip = {
  from: { rotateY: 0 },
  to: { rotateY: 180 },
  duration: 600,
  perspective: 1000,
};
```

### 3. Bounce de Botão

```typescript
// Efeito de bounce ao pressionar
const buttonBounce = {
  from: { scale: 1 },
  to: [
    { scale: 0.95, duration: 100 },
    { scale: 1, duration: 100 },
  ],
};
```

### 4. Slide de Menu

```typescript
// Menu deslizando da lateral
const slideInMenu = {
  from: { translateX: -300 },
  to: { translateX: 0 },
  duration: 400,
  easing: 'easeOut',
};
```

### 5. Pulse de Notificação

```typescript
// Pulsação para notificações
const pulse = {
  from: { scale: 1 },
  to: [
    { scale: 1.1, duration: 500 },
    { scale: 1, duration: 500 },
  ],
  repeat: Infinity,
};
```

### 6. Shake de Erro

```typescript
// Tremor para indicar erro
const shake = {
  from: { translateX: 0 },
  to: [
    { translateX: -10, duration: 100 },
    { translateX: 10, duration: 100 },
    { translateX: -10, duration: 100 },
    { translateX: 0, duration: 100 },
  ],
};
```

### 7. Gol (Animação Especial)

```typescript
// Animação de gol
const goalAnimation = {
  steps: [
    // 1. Câmera zoom
    { type: 'zoom', from: 1, to: 1.2, duration: 300 },
    // 2. Bola voa para o gol
    { type: 'move', from: 'center', to: 'goal', duration: 500 },
    // 3. Explosão de confete
    { type: 'confetti', duration: 1000 },
    // 4. Placar atualiza
    { type: 'score-update', duration: 300 },
  ],
};
```

## 🎬 Transições de Tela

### Tela Inicial → Seleção de Deck

```typescript
// Fade out da tela inicial
// Slide in do deck selector
// Duração total: 600ms
```

### Deck → Escalação

```typescript
// Zoom in na tela de escalação
// Fade in das cartas
// Timer começa a contar (20s)
```

### Escalação → Partida

```typescript
// Transição suave com fade
// Zoom in no campo
// Animação de sorteio (quem começa)
// Duração: 1000ms
```

## 🃏 Animações de Cartas

### Hover (Desktop/Tablet)

```typescript
// Ao passar o mouse
const cardHover = {
  scale: 1.05,
  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  duration: 200,
};
```

### Press (Mobile)

```typescript
// Ao tocar/pressionar
const cardPress = {
  scale: 0.95,
  duration: 100,
};
```

### Seleção

```typescript
// Quando carta é selecionada
const cardSelect = {
  scale: 1.1,
  borderColor: '#3B82F6',
  borderWidth: 3,
  duration: 300,
};
```

### Entrada na Tela

```typescript
// Quando carta aparece
const cardEnter = {
  from: { opacity: 0, translateY: 20 },
  to: { opacity: 1, translateY: 0 },
  duration: 400,
  stagger: 100, // Cada carta 100ms depois
};
```

## 🎯 Animações de Ação

### Chute

```typescript
// Animação de chute
const shootAnimation = {
  steps: [
    { type: 'wind-up', duration: 200 }, // Preparo
    { type: 'kick', duration: 300 },     // Chute
    { type: 'follow', duration: 200 },   // Seguimento
  ],
};
```

### Defesa

```typescript
// Animação de defesa
const defendAnimation = {
  steps: [
    { type: 'position', duration: 150 },
    { type: 'block', duration: 300 },
    { type: 'recover', duration: 200 },
  ],
};
```

### Dribla

```typescript
// Animação de dribla
const dribbleAnimation = {
  steps: [
    { type: 'approach', duration: 200 },
    { type: 'feint', duration: 300 },
    { type: 'escape', duration: 200 },
  ],
};
```

## 📊 Animações de UI

### Placar

```typescript
// Quando placar muda
const scoreUpdate = {
  from: { scale: 1 },
  to: [
    { scale: 1.3, duration: 200 },
    { scale: 1, duration: 200 },
  ],
};
```

### Timer

```typescript
// Quando timer está baixo (< 5s)
const timerWarning = {
  color: '#EF4444',
  animation: 'pulse',
  duration: 500,
};
```

### Notificação

```typescript
// Notificação aparecendo
const notificationEnter = {
  from: { translateY: -100, opacity: 0 },
  to: { translateY: 0, opacity: 1 },
  duration: 300,
};

// Notificação saindo
const notificationExit = {
  from: { translateY: 0, opacity: 1 },
  to: { translateY: -100, opacity: 0 },
  duration: 300,
  delay: 3000, // Sai após 3s
};
```

## 🎨 Efeitos Visuais

### Partículas (Confete)

```typescript
// Confete ao marcar gol
const confetti = {
  particles: 50,
  colors: ['#FBBF24', '#3B82F6', '#10B981', '#8B5CF6'],
  duration: 2000,
  gravity: 0.5,
};
```

### Brilho (Glow)

```typescript
// Brilho em cartas lendárias
const legendaryGlow = {
  boxShadow: '0 0 20px #FBBF24',
  animation: 'pulse',
  duration: 2000,
};
```

### Gradiente Animado

```typescript
// Gradiente que se move
const animatedGradient = {
  background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #3B82F6)',
  backgroundSize: '200% 200%',
  animation: 'gradient 3s ease infinite',
};
```

## 📱 Responsividade

### Animações por Tamanho de Tela

```typescript
// Desktop (> 1024px)
const desktopAnimations = {
  cardHover: true,
  parallax: true,
  complexEffects: true,
};

// Tablet (768px - 1024px)
const tabletAnimations = {
  cardHover: true,
  parallax: false,
  complexEffects: false,
};

// Mobile (< 768px)
const mobileAnimations = {
  cardHover: false,
  parallax: false,
  complexEffects: false,
  // Animações mais simples
  duration: 'reduced', // Reduz duração
};
```

## ⚡ Performance

### Otimizações

1. **GPU Acceleration**
   - Usar `transform` e `opacity` em vez de `top/left`
   - Ativar `will-change` para elementos animados

2. **Reduzir Animações**
   - Respeitar `prefers-reduced-motion`
   - Desabilitar em dispositivos baixos

3. **Lazy Loading**
   - Carregar animações sob demanda
   - Unload quando fora da tela

## 🎯 Implementação React Native

### Usando React Native Animated

```typescript
import { Animated, Easing } from 'react-native';

const fadeAnim = new Animated.Value(0);

const fadeIn = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    easing: Easing.in(Easing.ease),
    useNativeDriver: true,
  }).start();
};

return (
  <Animated.View style={{ opacity: fadeAnim }}>
    {/* Conteúdo */}
  </Animated.View>
);
```

### Usando React Native Reanimated

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

const handlePress = () => {
  scale.value = withTiming(1.1, { duration: 200 });
};

return (
  <Animated.View style={animatedStyle} onTouchEnd={handlePress}>
    {/* Conteúdo */}
  </Animated.View>
);
```

## 🎬 Sequências de Animação

### Partida Completa

```
1. Escalação (20s)
   ↓
2. Transição para partida (1s)
   ↓
3. Turno do jogador 1 (8s)
   ↓
4. Animação de ação
   ↓
5. Resultado
   ↓
6. Turno do jogador 2 (8s)
   ↓
7. Repete até turno 8
   ↓
8. Resultado final
   ↓
9. Tela de vitória/derrota
```

## 📚 Bibliotecas Recomendadas

### React Native
- `react-native-reanimated` - Animações de alta performance
- `react-native-gesture-handler` - Gestos e interações
- `lottie-react-native` - Animações Lottie

### Web
- `framer-motion` - Animações declarativas
- `react-spring` - Animações baseadas em física
- `gsap` - Animações avançadas

## 🚀 Próximas Melhorias

- [ ] Animações de partida em tempo real
- [ ] Efeitos de som sincronizados
- [ ] Haptic feedback (vibração)
- [ ] Temas customizáveis
- [ ] Modo escuro/claro com transição
- [ ] Animações de carregamento
- [ ] Transições de página personalizadas
