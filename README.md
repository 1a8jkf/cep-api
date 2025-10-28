# cep-api

**API de Consulta de CEP – Node.js**
Desafio Técnico – Egadnet

Esta é uma API RESTful desenvolvida em Node.js que recebe um CEP via requisição POST, consulta o serviço ViaCEP e retorna as informações de endereço correspondentes.
O projeto inclui autenticação (token fixo para teste), validação de entrada, lint configurado e uma camada de cache (Redis ou fallback in-memory).

---

## Funcionalidades

* Autenticação via token fixo (obrigatório em cada requisição)
* Validação de CEP (formato `00000-000` ou `00000000`)
* Cache automático (respostas armazenadas por 5 minutos)
* Consulta em tempo real ao ViaCEP
* Código limpo e padronizado (ESLint)

---

## Instalação e Configuração

1. Clonar o repositório:

```bash
git clone https://github.com/seu-usuario/cep-api.git
cd cep-api
```

2. Instalar dependências:

```bash
npm install
```

3. Configurar variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
JWT_SECRET=1234567890abcdef
CACHE_TTL=300
```

> Obs.: Com Redis ausente, o cache funciona automaticamente em memória local.

---

## Execução do Projeto

* **Desenvolvimento:**

```bash
npm run dev
```

* **Produção:**

```bash
npm start
```

---

## Testando a API

Para testar, inicie o servidor em um terminal com `npm run dev` e use outro terminal para executar as requisições (exemplo no PowerShell):

```powershell
$headers = @{
    "Authorization" = "Bearer 1234567890abcdef"
    "Content-Type"  = "application/json"
}

$body = @{
    cep = "84015280"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/cep -Method POST -Headers $headers -Body $body
```

* Substitua `"cep"` pelo CEP que deseja consultar.
* A primeira consulta retorna `"fromCache": false`.
* Consultas repetidas dentro de 5 minutos retornarão `"fromCache": true`.

---

## Autenticação

A API utiliza **token fixo para teste**.

* **Token de exemplo:** `1234567890abcdef`
* Inclua no header da requisição:

```
Authorization: Bearer 1234567890abcdef
```

---

## Exemplo de Requisição

**Endpoint:**
`POST /cep`

**Request (cURL):**

```bash
curl -X POST http://localhost:3000/cep \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 1234567890abcdef" \
  -d '{"cep": "01001000"}'
```

**Response:**

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

Se o mesmo CEP for consultado dentro de 5 minutos:

```json
{
  "fromCache": true,
  "data": { ... }
}
```

---

## Lint

O projeto segue as regras do ESLint (StandardJS).
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
| Autenticação | Token fixo para teste          |
| Cache        | Redis (ou node-cache fallback) |
| HTTP Client  | Axios                          |
| Validação    | Regex / Validator              |
| Configuração | dotenv                         |
| Lint         | ESLint                         |
