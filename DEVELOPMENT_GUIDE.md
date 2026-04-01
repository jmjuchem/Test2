# Guia de Desenvolvimento - FutCards

## Começando

### Instalação

```bash
cd futcards
npm install
```

### Executar em Desenvolvimento

```bash
# Web (para testes rápidos)
npm run web

# Android (requer Android Studio)
npm run android

# iOS (requer Xcode)
npm run ios

# Modo desenvolvimento
npm start
```

## Estrutura do Projeto

```
futcards/
├── app/                    # Componentes principais da aplicação
│   └── index.tsx          # Componente App raiz
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   └── CardComponent.tsx
│   ├── screens/          # Telas da aplicação
│   │   ├── HomeScreen.tsx
│   │   ├── CollectionScreen.tsx
│   │   ├── DeckScreen.tsx
│   │   ├── ShopScreen.tsx
│   │   ├── PremiumShopScreen.tsx
│   │   ├── ChestsScreen.tsx
│   │   └── MatchScreen.tsx
│   ├── services/         # Lógica de negócio
│   │   └── matchService.ts
│   ├── store/            # Gerenciamento de estado (Zustand)
│   │   └── gameStore.ts
│   ├── types/            # Tipos TypeScript
│   │   └── game.ts
│   └── utils/            # Funções utilitárias
├── assets/               # Imagens e recursos
├── package.json          # Dependências
├── tsconfig.json         # Configuração TypeScript
├── app.json              # Configuração Expo
└── README.md             # Documentação

```

## Adicionando Novas Funcionalidades

### 1. Criar uma Nova Tela

**Passo 1:** Criar arquivo em `src/screens/NovaTelaScreen.tsx`

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NovaTelaScreenProps {
  navigation: any;
}

export const NovaTelaScreen: React.FC<NovaTelaScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text>Nova Tela</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
});
```

**Passo 2:** Adicionar à navegação em `app/index.tsx`

```typescript
<Stack.Screen
  name="NovaTela"
  component={NovaTelaScreen}
  options={{ title: 'Nova Tela' }}
/>
```

### 2. Adicionar um Novo Tipo

**Arquivo:** `src/types/game.ts`

```typescript
export interface NovoTipo {
  id: string;
  name: string;
  // ... propriedades
}
```

### 3. Adicionar Ações ao Store

**Arquivo:** `src/store/gameStore.ts`

```typescript
novaAcao: (parametro: string) => void;

// Implementação
novaAcao: (parametro) =>
  set((state) => ({
    // Atualizar estado
  })),
```

### 4. Criar um Novo Serviço

**Arquivo:** `src/services/novoService.ts`

```typescript
export class NovoService {
  static funcao1(): void {
    // Implementação
  }

  static funcao2(param: string): string {
    // Implementação
    return '';
  }
}
```

## Padrões de Código

### Componentes

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MeuComponenteProps {
  titulo: string;
  onPress?: () => void;
}

export const MeuComponente: React.FC<MeuComponenteProps> = ({
  titulo,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  titulo: {
    color: '#ffffff',
    fontSize: 16,
  },
});
```

### Hooks Customizados

```typescript
import { useCallback, useState } from 'react';

export function useMeuHook() {
  const [estado, setEstado] = useState(false);

  const funcao = useCallback(() => {
    setEstado(!estado);
  }, [estado]);

  return { estado, funcao };
}
```

## Temas e Cores

O projeto utiliza um tema escuro com acentos verdes:

| Cor | Código | Uso |
|-----|--------|-----|
| Preto | #0a0a0a | Fundo principal |
| Cinza Escuro | #1a1a1a | Containers |
| Cinza Médio | #333333 | Bordas |
| Cinza Claro | #999999 | Texto secundário |
| Branco | #ffffff | Texto principal |
| Verde | #00ff00 | Acentos, botões |
| Azul | #0099ff | Informações |
| Roxo | #9900ff | Premium |
| Laranja | #ffaa00 | Lendário |

## Debugging

### Console Logs

```typescript
console.log('Mensagem de debug');
console.warn('Aviso');
console.error('Erro');
```

### React DevTools

```bash
npm install -g react-devtools
react-devtools
```

### Expo DevTools

Pressione `d` no terminal durante execução para abrir DevTools.

## Performance

### Otimizações

1. **Memoização de Componentes**
```typescript
import { memo } from 'react';

export const MeuComponente = memo(({ prop }) => {
  return <View>{prop}</View>;
});
```

2. **Lazy Loading**
```typescript
import { lazy, Suspense } from 'react';

const MeuComponente = lazy(() => import('./MeuComponente'));

<Suspense fallback={<Loading />}>
  <MeuComponente />
</Suspense>
```

3. **Virtualização de Listas**
```typescript
<FlatList
  data={dados}
  renderItem={({ item }) => <Item item={item} />}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
/>
```

## Testes

### Estrutura de Testes

```typescript
// src/services/__tests__/matchService.test.ts
import { MatchService } from '../matchService';

describe('MatchService', () => {
  it('deve calcular o poder de ação corretamente', () => {
    const card = { /* ... */ };
    const power = MatchService.calculateActionPower(card, 'shoot');
    expect(power).toBeGreaterThan(0);
  });
});
```

### Executar Testes

```bash
npm test
```

## Build para Produção

### Android

```bash
eas build --platform android
```

### iOS

```bash
eas build --platform ios
```

### Web

```bash
npm run build
```

## Variáveis de Ambiente

Criar arquivo `.env.local`:

```
REACT_APP_API_URL=https://api.futcards.com
REACT_APP_STRIPE_KEY=pk_live_...
REACT_APP_VERSION=1.0.0
```

Acessar em código:

```typescript
const apiUrl = process.env.REACT_APP_API_URL;
```

## Troubleshooting

### Erro: "Cannot find module"

```bash
npm install
npm start -- --reset-cache
```

### Erro: "Port already in use"

```bash
# Encontrar processo
lsof -i :8081

# Matar processo
kill -9 <PID>
```

### Erro: "Metro bundler crashed"

```bash
npm start -- --reset-cache
```

## Recursos Úteis

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Contribuição

1. Criar branch: `git checkout -b feature/nova-feature`
2. Fazer commits: `git commit -am 'Add nova feature'`
3. Push: `git push origin feature/nova-feature`
4. Criar Pull Request

## Checklist de Lançamento

- [ ] Todos os testes passando
- [ ] Sem warnings no console
- [ ] Performance otimizada
- [ ] Documentação atualizada
- [ ] Versão atualizada em `package.json`
- [ ] Build testado em dispositivos reais
- [ ] Privacidade e segurança verificadas
- [ ] Termos de Serviço e Política de Privacidade atualizados
