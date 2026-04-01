# Documentação da API - FutCards

## Visão Geral

Esta documentação descreve os endpoints necessários para integração do aplicativo FutCards com um backend. A API deve ser implementada em Node.js/Express, Python/FastAPI ou similar.

## Autenticação

Todos os endpoints (exceto `/auth/register` e `/auth/login`) requerem um token JWT no header:

```
Authorization: Bearer {token}
```

## Endpoints

### Autenticação

#### POST `/auth/register`
Registra um novo usuário.

**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "token": "string"
}
```

#### POST `/auth/login`
Faz login de um usuário.

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "id": "string",
  "username": "string",
  "token": "string",
  "expiresIn": 86400
}
```

### Inventário

#### GET `/user/inventory`
Retorna o inventário completo do usuário.

**Response (200):**
```json
{
  "cards": [
    {
      "id": "string",
      "name": "string",
      "type": "player|goalkeeper",
      "quality": "common|uncommon|rare|epic|legendary",
      "level": "number",
      "copies": "number",
      "attributes": {},
      "equipment": [],
      "image": "string"
    }
  ],
  "equipment": [],
  "currency": {
    "gameCoins": "number",
    "specialCoins": "number"
  },
  "chests": [],
  "deck": []
}
```

#### POST `/user/inventory/cards`
Adiciona uma carta ao inventário.

**Request:**
```json
{
  "cardId": "string"
}
```

**Response (201):**
```json
{
  "success": true,
  "card": {}
}
```

#### POST `/user/inventory/upgrade-card`
Faz upgrade de uma carta.

**Request:**
```json
{
  "cardId": "string",
  "level": "number"
}
```

**Response (200):**
```json
{
  "success": true,
  "card": {}
}
```

### Partidas

#### POST `/match/create`
Cria uma nova partida.

**Request:**
```json
{
  "deckId": "string",
  "opponentId": "string|null"
}
```

**Response (201):**
```json
{
  "matchId": "string",
  "player1": {},
  "player2": {},
  "status": "selection",
  "createdAt": "timestamp"
}
```

#### GET `/match/:matchId`
Retorna o estado atual de uma partida.

**Response (200):**
```json
{
  "id": "string",
  "player1": {},
  "player2": {},
  "currentTurn": "number",
  "currentPlayer": "player1|player2",
  "status": "selection|playing|finished|penalties",
  "winner": "player1|player2|draw|null"
}
```

#### POST `/match/:matchId/action`
Envia uma ação durante a partida.

**Request:**
```json
{
  "type": "shoot|pass|defend|dribble",
  "cardId": "string",
  "targetCardId": "string|null"
}
```

**Response (200):**
```json
{
  "success": true,
  "result": "success|fail|blocked",
  "newState": {}
}
```

#### POST `/match/:matchId/select-cards`
Seleciona as 3 cartas iniciais (durante escalação).

**Request:**
```json
{
  "cardIds": ["string", "string", "string"]
}
```

**Response (200):**
```json
{
  "success": true,
  "matchState": {}
}
```

#### POST `/match/:matchId/finish`
Finaliza uma partida.

**Request:**
```json
{
  "winner": "player1|player2|draw"
}
```

**Response (200):**
```json
{
  "success": true,
  "rewards": {
    "gameCoins": "number",
    "specialCoins": "number",
    "cards": []
  }
}
```

### Lojas

#### GET `/shop/equipment`
Retorna lista de equipamentos disponíveis.

**Response (200):**
```json
{
  "items": [
    {
      "id": "string",
      "name": "string",
      "quality": "string",
      "price": "number",
      "bonus": {}
    }
  ]
}
```

#### POST `/shop/buy-equipment`
Compra um equipamento.

**Request:**
```json
{
  "equipmentId": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "equipment": {},
  "newBalance": "number"
}
```

#### GET `/shop/chests`
Retorna lista de baús disponíveis.

**Response (200):**
```json
{
  "items": [
    {
      "id": "string",
      "quality": "string",
      "openTime": "number",
      "price": "number",
      "rewards": {}
    }
  ]
}
```

#### POST `/shop/buy-chest`
Compra um baú.

**Request:**
```json
{
  "chestId": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "chest": {},
  "newBalance": "number"
}
```

### Pagamentos (Premium)

#### POST `/payment/create-intent`
Cria um Payment Intent do Stripe.

**Request:**
```json
{
  "packageId": "string",
  "amount": "number"
}
```

**Response (200):**
```json
{
  "clientSecret": "string",
  "publishableKey": "string"
}
```

#### POST `/payment/confirm`
Confirma um pagamento bem-sucedido.

**Request:**
```json
{
  "paymentIntentId": "string",
  "packageId": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "rewards": {
    "gameCoins": "number",
    "specialCoins": "number"
  }
}
```

### Ranking

#### GET `/ranking`
Retorna o ranking global de jogadores.

**Query Parameters:**
- `limit` (opcional): Número de jogadores (padrão: 100)
- `offset` (opcional): Deslocamento (padrão: 0)

**Response (200):**
```json
{
  "players": [
    {
      "rank": "number",
      "username": "string",
      "wins": "number",
      "points": "number"
    }
  ]
}
```

#### GET `/ranking/me`
Retorna a posição do usuário no ranking.

**Response (200):**
```json
{
  "rank": "number",
  "username": "string",
  "wins": "number",
  "points": "number"
}
```

## Códigos de Erro

| Código | Significado |
|--------|------------|
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Não autorizado |
| 404 | Recurso não encontrado |
| 409 | Conflito (ex: já existe) |
| 500 | Erro interno do servidor |

## Exemplo de Integração (TypeScript/Axios)

```typescript
import axios from 'axios';

const API_BASE_URL = 'https://api.futcards.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Exemplo: Fazer login
export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
}

// Exemplo: Obter inventário
export async function getInventory() {
  const response = await api.get('/user/inventory');
  return response.data;
}

// Exemplo: Enviar ação em partida
export async function sendMatchAction(
  matchId: string,
  action: {
    type: string;
    cardId: string;
    targetCardId?: string;
  }
) {
  const response = await api.post(`/match/${matchId}/action`, action);
  return response.data;
}
```

## Webhooks (Stripe)

O backend deve implementar um webhook para processar eventos do Stripe:

```
POST /webhooks/stripe
```

Eventos importantes:
- `payment_intent.succeeded` - Pagamento bem-sucedido
- `payment_intent.payment_failed` - Falha no pagamento

## Rate Limiting

- 100 requisições por minuto por usuário
- 1000 requisições por minuto por IP

## Versionamento

A API utiliza versionamento por URL:
- `/api/v1/...` - Versão 1 (atual)

## Segurança

- Todos os endpoints HTTPS
- Validação de entrada em todos os endpoints
- Rate limiting ativado
- CORS configurado para domínios autorizados
- Tokens JWT com expiração de 24 horas
