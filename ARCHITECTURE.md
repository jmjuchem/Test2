# Arquitetura do FutCards

## Visão Geral

FutCards é um aplicativo móvel de jogo de futebol com cartas, desenvolvido com React Native e Expo. A arquitetura segue padrões modernos de desenvolvimento mobile com separação clara de responsabilidades.

## Estrutura de Camadas

### 1. Apresentação (Screens)
- **HomeScreen:** Tela inicial com menu principal
- **CollectionScreen:** Visualização e filtro de cartas
- **DeckScreen:** Seleção e gerenciamento de deck
- **ShopScreen:** Loja de equipamentos
- **PremiumShopScreen:** Loja com pagamento real
- **ChestsScreen:** Gerenciamento de baús
- **MatchScreen:** Tela de partida em tempo real

### 2. Componentes Reutilizáveis
- **CardComponent:** Exibição de cartas com atributos
- **TimerComponent:** Contador regressivo para turnos
- **MatchFieldComponent:** Campo de jogo com cartas
- **CurrencyDisplay:** Exibição de moedas

### 3. Gerenciamento de Estado (Store)
Utiliza **Zustand** para gerenciamento global:
- Inventário do jogador
- Estado da partida
- Configurações
- Histórico de partidas

### 4. Lógica de Negócio (Services)
- **MatchService:** Lógica de turnos, ações e pontuação
- **CardService:** Evolução e upgrade de cartas
- **EquipmentService:** Gerenciamento de equipamentos
- **ChestService:** Abertura e recompensas de baús
- **PaymentService:** Integração com Stripe

### 5. Tipos (TypeScript)
Definições de tipos para:
- Cartas e atributos
- Equipamentos
- Moedas
- Estado de partida
- Ações do jogo

## Fluxo de Dados

```
User Interaction
    ↓
Screen Component
    ↓
Zustand Store / Service
    ↓
Update State
    ↓
Re-render Component
```

## Ciclo de Vida de uma Partida

1. **Seleção de Deck:** Jogador escolhe 10 cartas
2. **Escalação:** 20 segundos para escolher 3 cartas iniciais
3. **Sorteio:** Sistema define quem começa
4. **Turnos (1-8):**
   - Jogador tem 8 segundos para fazer ação
   - Se não agir: ação aleatória
   - 3 ações aleatórias consecutivas = desistência
5. **Turnos 3 e 5:** Adição obrigatória + troca opcional
6. **Turno 8:** Fim do jogo
7. **Penalidades:** Se empate, cobranças automáticas

## Atributos e Cálculos

### Poder de Ação
```
Power = Atributo Base + Bônus de Equipamento + Modificadores
```

### Resultado de Ação
```
if (Ataque > Defesa) {
  Resultado = Sucesso
} else {
  Resultado = Falha
}
```

### Pontuação
- Chute bem-sucedido = +1 gol
- Defesa bem-sucedida = -1 gol do adversário

## Integração com Backend

### Endpoints Necessários
- `POST /auth/login` - Autenticação
- `GET /user/inventory` - Carregar inventário
- `POST /match/create` - Criar partida
- `POST /match/action` - Enviar ação
- `GET /match/state` - Estado atual
- `POST /payment/create` - Iniciar pagamento

### Sincronização
- Estado local com Zustand
- Sincronização com backend via axios
- Websocket para multiplayer em tempo real

## Integração de Pagamento

### Stripe Integration
1. Cliente seleciona item na Loja Premium
2. Cria Payment Intent no backend
3. Apresenta Stripe Payment Sheet
4. Processa pagamento
5. Webhook confirma e adiciona itens

## Performance

### Otimizações
- Lazy loading de cartas
- Memoização de componentes
- Virtualização de listas
- Cache de imagens

### Limites
- Máximo 10 cartas por deck
- Máximo 4 baús simultâneos
- Máximo 3 equipamentos por carta

## Segurança

### Dados Sensíveis
- Tokens armazenados em AsyncStorage com encriptação
- Validação de ações no backend
- Rate limiting em endpoints críticos

### Transações
- Todas as compras validadas no backend
- Confirmação de pagamento antes de adicionar itens
- Auditoria de transações

## Próximas Fases

### Fase 2: Multiplayer
- Matchmaking
- Chat em tempo real
- Ranking global

### Fase 3: Eventos
- Torneios
- Desafios diários
- Recompensas sazonais

### Fase 4: Social
- Amigos
- Guildas
- Troca de cartas

## Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| expo | ^55.0.9 | Framework |
| react-native | ^0.84.1 | Mobile |
| zustand | ^4.4.0 | Estado |
| axios | ^1.6.0 | HTTP |
| @react-navigation | ^6.x | Navegação |

## Contribuição

Ao adicionar novas funcionalidades:
1. Criar tipos em `src/types/`
2. Implementar lógica em `src/services/`
3. Criar componentes em `src/components/`
4. Adicionar telas em `src/screens/`
5. Atualizar store se necessário
6. Documentar mudanças
