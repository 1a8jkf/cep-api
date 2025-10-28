# cep-api
API de Consulta de CEP – Node.js  
**Desafio Técnico – Egadnet**

Esta é uma API RESTful desenvolvida em Node.js que recebe um CEP via requisição POST, consulta o serviço ViaCEP e retorna as informações de endereço correspondentes.  
O projeto inclui **autenticação JWT**, **validação de entrada**, **lint configurado** e uma **camada de cache** (Redis ou fallback in-memory).

---

## Funcionalidades

- Autenticação JWT (token obrigatório em cada requisição)  
- Validação de CEP (formato `00000-000` ou `00000000`)  
- Cache automático (respostas armazenadas por 5 minutos)  
- Consulta em tempo real ao ViaCEP  
- Código limpo e padronizado (ESLint)  
- Documentação clara e exemplo de requisição (cURL/Postman)

---

## Instalação e Configuração

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/cep-api.git
cd cep-api
````

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
JWT_SECRET=sua_chave_jwt
CACHE_TTL=300
REDIS_URL=redis://localhost:6379
```

> Caso não possua Redis instalado, o cache funcionará automaticamente em memória local.

---

## Execução do Projeto

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Ambiente de produção

```bash
npm start
```

---

## Testando a API

Para testar, **inicie o servidor em um terminal** com `npm run dev` e use outro terminal para executar as requisições (exemplo no PowerShell):

```powershell
$headers = @{
    "Authorization" = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZSIsImlhdCI6MTc2MTY1ODcxMiwiZXhwIjoxNzYxNjg3NTEyfQ.CyIs6v0FGXFPV0VTjm8Q47VlSVK9jOl0EHnsFyCdG70"
    "Content-Type"  = "application/json"
}

$body = @{
    cep = "84015280"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/cep -Method POST -Headers $headers -Body $body
```

* Substitua `"cep"` pelo CEP que deseja consultar.
* A primeira vez que consultar, `fromCache` será `false`.
* Consultas repetidas dentro de 5 minutos retornarão `fromCache: true`.

---

## Autenticação

A API utiliza **JWT (JSON Web Token)**.
Antes de chamar as rotas protegidas, gere um token válido.

Exemplo de header:

```
Authorization: Bearer <seu_token_jwt>
```

---

## Exemplo de Requisição

### Endpoint

```
POST /cep
```

### Request (cURL)

```bash
curl -X POST http://localhost:3000/cep \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token_jwt>" \
  -d '{"cep": "01001000"}'
```

### Response

```json
{
  "fromCache": false,
  "data": {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP"
  }
}
```

> Se o mesmo CEP for consultado dentro de 5 minutos:

```json
{
  "fromCache": true,
  "data": { ... }
}
```

---

## Lint

O projeto segue as regras do **ESLint (StandardJS)**.
Para verificar a padronização:

```bash
npm run lint
```

---

## Tecnologias Utilizadas

| Categoria    | Tecnologia                     |
| ------------ | ------------------------------ |
| Linguagem    | Node.js (JavaScript)           |
| Framework    | Express.js                     |
| Autenticação | JWT (jsonwebtoken)             |
| Cache        | Redis (ou node-cache fallback) |
| HTTP Client  | Axios                          |
| Validação    | Regex / Validator              |
| Configuração | dotenv                         |
| Lint         | ESLint                         |

