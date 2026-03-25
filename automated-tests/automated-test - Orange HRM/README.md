# Automated Tests — OrangeHRM

Esta pasta contém os **testes automatizados end-to-end** desenvolvidos para a aplicação [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/), cobrindo fluxos críticos de autenticação e gerenciamento de usuários.

## Finalidade

Validar, de forma automatizada e repetível, os principais fluxos da aplicação — garantindo que funcionalidades essenciais como login e atualização de dados do usuário se comportem conforme o esperado.

## Tecnologias utilizadas

- **Cypress** — framework de automação E2E
- **JavaScript** — linguagem dos specs e page objects
- **Page Object Model (POM)** — padrão de organização adotado para separar lógica de navegação dos cenários de teste

## Estrutura dos specs

```
OrangeHRM/
├── login.spec.cy.js       → Cenários de autenticação
└── userInfo.spec.cy.js    → Cenários de atualização de dados do usuário
```

---

## Login — `login.spec.cy.js`

Valida o fluxo de autenticação da aplicação com cenários positivos e negativos.

### Cenários cobertos

| ID | Cenário | Tipo | Status |
|---|---|---|---|
| TC-01 | Login com credenciais válidas | Positivo | ✅ Passou |
| TC-02 | Login com credenciais inválidas | Negativo | ✅ Passou |

### Detalhamento

**TC-01 — Login com credenciais válidas**
- Acessa a página de login
- Insere usuário e senha válidos (`Admin / admin123`)
- Valida o redirecionamento para o Dashboard

**TC-02 — Login com credenciais inválidas**
- Acessa a página de login
- Insere usuário e senha gerados aleatoriamente
- Valida a exibição da mensagem de credenciais inválidas

---

## Atualização de Usuário — `userInfo.spec.cy.js`

Valida o fluxo de atualização de informações pessoais de um funcionário via menu **My Info**.

### Cenários cobertos

| ID | Cenário | Tipo | Status |
|---|---|---|---|
| TC-03 | Atualização de dados pessoais com sucesso | Positivo | ✅ Passou |

### Detalhamento

**TC-03 — Atualização de dados pessoais com sucesso**
- Realiza login com credenciais válidas
- Valida o redirecionamento para o Dashboard
- Acessa o menu **My Info**
- Preenche nome completo, ID do funcionário e data de admissão com dados dinâmicos
- Salva as informações e valida a persistência dos dados

---

## Page Objects utilizados

| Arquivo | Responsabilidade |
|---|---|
| `loginPage` | Ações e validações da tela de login |
| `dashboardPage` | Validação da tela principal pós-login |
| `menuPage` | Navegação entre módulos via menu lateral |
| `myinfoPage` | Preenchimento e salvamento do formulário My Info |

---

>  O padrão Page Object Model foi adotado para garantir reusabilidade e facilitar a manutenção dos testes à medida que a suíte cresce.
