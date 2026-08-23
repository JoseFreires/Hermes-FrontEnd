# Hermes — Frontend

O **Hermes**, sistema de gestão condominial construído para as três personas do condomínio — **morador**, **síndico** e **porteiro** — cobrindo o controle de encomendas, avisos, reservas de espaços, chamados de manutenção, convidados e pessoas autorizadas.

Este repositório contém **apenas o frontend** (Next.js). Ele não funciona de forma independente: todas as telas consomem dados de uma API própria que precisa estar rodando separadamente.

## ⚠️ Pré-requisito obrigatório: Backend

Este projeto **não funciona sozinho**. É necessário ter o backend do Hermes rodando localmente (ou apontar para uma instância já hospedada) antes de iniciar o frontend.

**Repositório do backend:** [https://github.com/JoseFreires/Hermes-BackEnd](https://github.com/JoseFreires/Hermes-BackEnd)

As instruções completas de instalação, configuração do banco de dados e execução do backend estão no README daquele repositório. Siga-as primeiro.

## Como rodar o frontend

### 1. Clone este repositório

```bash
git clone <url-deste-repositorio>
cd <pasta-do-projeto>
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL da API

Crie um arquivo `.env.local` na raiz do projeto com a URL onde o backend está rodando:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> Ajuste a porta conforme a configuração do backend (`application.properties`/`application.yml` do Hermes-BackEnd). O valor padrão do Spring Boot costuma ser `8080`.

### 4. Certifique-se de que o backend está no ar

Antes de continuar, confirme que a API responde — por exemplo:

```bash
curl http://localhost:8080/moradores
```

Se o backend não estiver rodando, o frontend carrega normalmente mas todas as telas de listagem, cadastro e login falham silenciosamente ou exibem erros de conexão.

### 5. Inicie o frontend

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Acesso ao sistema

O login é feito por `username` e `senha`, cadastrados previamente no backend. Cada usuário possui uma **role** (`ROLE_MORADOR`, `ROLE_SINDICO` ou `ROLE_PORTEIRO`) que define quais telas e ações ficam disponíveis:

| Role | Acesso principal |
|---|---|
| **Síndico** | Cadastro de porteiros e síndicos, avisos, espaços condominiais, aprovação de reservas, chamados |
| **Porteiro** | Registro e entrega de encomendas, controle de visitantes |
| **Morador** | Consulta de encomendas, reservas de espaços, chamados, convidados e pessoas autorizadas |

Não existe cadastro público — o primeiro usuário (geralmente um síndico ou conta administrativa) precisa ser criado diretamente no backend, conforme instruções do repositório do backend.

## Stack técnica

- **Next.js** (App Router)
- **React Bootstrap** para componentes de UI
- **react-select** para campos de seleção
- Comunicação via `fetch` com autenticação por cookie (`credentials: "include"`)

## Estrutura básica

```
src/
├── app/
│   ├── components/     # Componentes reutilizáveis (Input, Dropdown, Modal, Table...)
│   ├── hooks/           # Hooks de dados por entidade (useMorador, usePorteiro...)
│   ├── services/        # Chamadas HTTP organizadas por entidade e verbo (GET, POST, PUT, DELETE)
│   └── pages/            # Telas do sistema
```

## Problemas comuns

- **Erros de CORS**: confirme que o backend permite requisições da origem `http://localhost:3000`.
- **Login não persiste**: verifique se o backend está configurado para emitir cookies com `SameSite`/`Secure` compatíveis com o ambiente local.
- **Listagens vazias**: confirme que o backend está populado com dados (verifique o README do backend para scripts de seed, se houver).