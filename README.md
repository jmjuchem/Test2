# FutCards - Jogo de Futebol de Cartas

Um jogo móvel estratégico que combina coleção de cartas, simulação de times e partidas em turnos de futebol.

## 🎮 Características Principais

### Sistema de Cartas
- **Jogadores de Campo:** 6 atributos (Chute, Ataque, Defesa, Força, Salto, Estamina)
- **Goleiros:** 3 atributos (Habilidade com Mãos, Agilidade, Salto)
- **5 Qualidades:** Common, Uncommon, Rare, Epic, Legendary
- **Evolução:** Upgrade de nível com cópias + moedas do jogo
- **Equipamentos:** Até 3 itens por carta, com 5 qualidades diferentes

### Sistema de Baús
- 4 espaços para baús
- 5 qualidades diferentes
- Recompensas: Cartas, Moedas do Jogo, Moedas Especiais
- Tempo de abertura varia por qualidade

### Lojas
- **Loja de Equipamentos:** Compra com moedas do jogo
- **Loja Premium:** Pagamento real com cartão de crédito

### Mecânica de Partida
- **Escalação:** 20 segundos para escolher 3 cartas iniciais
- **Sorteio:** Define quem começa
- **Turnos:** 8 segundos por jogada
- **Estrutura:**
  - Turno 3: Troca opcional + Adição obrigatória
  - Turno 5: Troca opcional + Adição obrigatória
  - Turno 8: Fim do jogo
- **Penalidades:** Se empate, cobranças automáticas

## 📁 Estrutura do Projeto

```
futcards/
├── app/                    # Componentes principais
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── screens/          # Telas da aplicação
│   ├── services/         # Lógica de negócio
│   ├── store/            # Gerenciamento de estado (Zustand)
│   ├── types/            # Tipos TypeScript
│   └── utils/            # Funções utilitárias
├── assets/               # Imagens e recursos
└── package.json          # Dependências
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

```bash
cd futcards
npm install
```

### Executar

```bash
# Web
npm run web

# Android
npm run android

# iOS
npm run ios

# Desenvolvimento
npm start
```

## 📦 Dependências Principais

- **expo:** Framework React Native
- **expo-router:** Roteamento
- **react-native:** Framework mobile
- **zustand:** Gerenciamento de estado
- **axios:** HTTP client
- **react-navigation:** Navegação

## 🎯 Próximas Etapas

1. **Implementar Telas:**
   - Tela de Coleção
   - Tela de Baús
   - Tela de Lojas
   - Tela de Partida

2. **Integrar Pagamentos:**
   - Stripe para Loja Premium
   - Processamento seguro de cartão

3. **Backend:**
   - API para sincronização
   - Autenticação de usuários
   - Multiplayer em tempo real

4. **Conteúdo:**
   - Cartas iniciais
   - Equipamentos
   - Baús com recompensas

## 📝 Notas de Desenvolvimento

- Usar TypeScript para type safety
- Componentes funcionais com Hooks
- Zustand para estado global
- Estilos com StyleSheet do React Native

## 📄 Licença

Todos os direitos reservados.
