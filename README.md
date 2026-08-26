<h1 align="center">
  HERMES FRONT_END
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

<p>
  O Hermes automatiza o controle de entregas em condomínios: registra encomendas, vincula ao morador e envia
  um token por notificação para validar a retirada. Este repositório contém a interface web utilizada por
  moradores, síndicos e porteiros para operar o sistema.
</p>

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [⚠️ Backend obrigatório](#️-backend-obrigatório)
- [Configuração de Ambiente](#-configuração-de-ambiente)
- [Como Executar](#-como-executar)
- [Acesso ao Sistema](#-acesso-ao-sistema)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação do Projeto](#-documentação-do-projeto)

---

## 📌 Sobre o Projeto

O Hermes Front-end é a interface web que consome a API do Hermes Back-end para viabilizar a gestão e o
controle de recebimentos em condomínios. Através dela, porteiros registram o recebimento de encomendas e
vinculam ao morador destinatário, síndicos gerenciam funcionários e espaços condominiais, e moradores
acompanham suas encomendas, reservas e chamados — tudo autenticado via JWT.

**Principais funcionalidades:**

- ✅ Registro e acompanhamento de encomendas dos moradores
- ✅ Registro e controle de funcionários do Condomínio (Porteiro e Síndico)
- ✅ Registro e controle de Moradores
- ✅ Validação de retirada por token
- ✅ Gestão de pessoas autorizadas para retirada de encomendas
- ✅ Autenticação com JWT

---

## 🛠 Tecnologias

| Tecnologia      | Versão | Finalidade                          |
|------------------|--------|--------------------------------------|
| Next.js          | 15.x   | Framework React (App Router)         |
| React            | 18.x   | Biblioteca de interface              |
| React Bootstrap  | 2.x    | Componentes de UI                    |
| react-select     | 5.x    | Campos de seleção customizados       |
| Node.js          | 18+    | Ambiente de execução                 |

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## ⚠️ Backend obrigatório

Este projeto **não funciona de forma independente**. Todas as telas consomem dados de uma API própria que
precisa estar em execução antes de iniciar o frontend.

**Repositório do backend:** [https://github.com/JoseFreires/Hermes-BackEnd](https://github.com/JoseFreires/Hermes-BackEnd)

Siga as instruções de instalação, configuração de banco de dados e execução descritas no README daquele
repositório antes de continuar.

---

## ⚙️ Configuração de Ambiente

**1. Clone o repositório:**

```bash
git clone <url-deste-repositorio>
cd <pasta-do-projeto>
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Configure as variáveis de ambiente:**

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> ⚠️ Ajuste a porta conforme a configuração do backend (`SERVER_PORT` no `.env` do Hermes-BackEnd). O valor
> padrão do Spring Boot costuma ser `8080`.

---

## ▶️ Como Executar

**1. Certifique-se de que o backend está no ar:**

```bash
curl http://localhost:8080/api/moradores
```

Se o backend não estiver rodando, o frontend carrega normalmente, mas todas as telas de listagem, cadastro
e login falham ou exibem erros de conexão.

**2. Inicie o frontend:**

```bash
npm run dev
```

**3. Acesse:**

```
http://localhost:3000
```

---

## 🔐 Acesso ao Sistema

O login é feito por `username` e `senha`, cadastrados previamente no backend. Cada usuário possui uma
**role** que define quais telas e ações ficam disponíveis:

| Role | Acesso principal |
|---|---|
| **Síndico** | Cadastro de porteiros e síndicos, avisos, espaços condominiais, aprovação de reservas, chamados |
| **Porteiro** | Registro e entrega de encomendas, controle de visitantes |
| **Morador** | Consulta de encomendas, reservas de espaços, chamados, convidados e pessoas autorizadas |

Não existe cadastro público — o primeiro usuário precisa ser criado diretamente no backend, conforme
instruções do repositório do backend.

---

## 📁 Estrutura do Projeto

```
Hermes-FrontEnd/src/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── auth.js                      # Contexto e hook de autenticação
│   │
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── Sidebar/
│   │   ├── Header/
│   │   ├── Table/
│   │   ├── Button/
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Dropdown/
│   │   │       ├── Dropdown.jsx
│   │   │       └── turnoOptions.js
│   │   └── Modal/
│   │       ├── ModalForm/
│   │       ├── FormCad/
│   │       │   ├── CadastroModal.jsx
│   │       │   └── formConfigs.js
│   │       └── FormEntrega/
│   │           └── FormEntrega.jsx
│   │
│   ├── hooks/                       # Hooks de dados por entidade
│   │   ├── useEntityModal.js        # Hook genérico de controle de modal
│   │   ├── useEncomendas.js
│   │   ├── useMorador.js
│   │   ├── usePorteiro.js
│   │   ├── useSindico.js
│   │   ├── useMoradorOptions.js
│   │   ├── usePessoasAutorizadasOptions.js
│   │   ├── dataInject.js            # Definição de colunas das tabelas
│   │   └── filterEncomendas.js      # Filtros e extração de dados por aba
│   │
│   ├── services/                    # Chamadas HTTP organizadas por entidade e verbo
│   │   ├── Encomendas/
│   │   │   ├── GET.js
│   │   │   ├── POST.js
│   │   │   ├── PUT.js
│   │   │   ├── DELETE.js
│   │   │   └── Entrega/
│   │   │       └── PUT.js
│   │   ├── Morador/
│   │   │   ├── GET.js
│   │   │   ├── POST.js
│   │   │   ├── PUT.js
│   │   │   └── DELETE.js
│   │   ├── Porteiro/
│   │   │   ├── GET.js
│   │   │   ├── POST.js
│   │   │   ├── PUT.js
│   │   │   └── DELETE.js
│   │   └── Sindico/
│   │       ├── GET.js
│   │       ├── POST.js
│   │       ├── PUT.js
│   │       └── DELETE.js
│   │
│   └── pages/                       # Telas do sistema
│       ├── encomendas/
│       ├── moradores/
│       └── funcionarios/
│
└── public/
    └── img/
```

### Responsabilidades por camada

| Pacote | Responsabilidade |
|---|---|
| `components` | Componentes de UI reutilizáveis, sem regra de negócio |
| `hooks` | Estado, polling e orquestração de dados por entidade |
| `services` | Chamadas HTTP puras, uma função por verbo (GET/POST/PUT/DELETE) |
| `pages` | Telas do sistema, compõem hooks + components |

---

## Documentação do Projeto

📄 [Documentação Completa do Projeto (PDF)](./docs/Projeto_Hermes.pdf)

> Inclui: requisitos funcionais e não-funcionais, regras de negócio, diagramas UML
> (casos de uso, classes, objetos e sequência), modelo de banco de dados,
> dicionário de dados e protótipos de interface.

<p>Feito por: </p>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/JoseFreires">
        <img src="https://github.com/JoseFreires.png" width="80" style="border-radius:50%;" /><br />
        <sub><b>José Freires</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Caiopolis">
        <img src="https://github.com/Caiopolis.png" width="80" style="border-radius:50%;" /><br />
        <sub><b>Caio Henrique</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SilvaEng7">
        <img src="https://github.com/SilvaEng7.png" width="80" style="border-radius:50%;" /><br />
        <sub><b>Rian Silva</b></sub>
      </a>
    </td>
  </tr>
</table>