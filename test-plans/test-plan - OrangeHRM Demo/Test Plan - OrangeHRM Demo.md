# Test Plan — OrangeHRM Demo
**Versão:** 1.0  
**Data:** 2025-06  
**Autor:** Vitor Costa Silva  
**Repositório:** `qa-manual-orangehrm`  
**Aplicação:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)  
**Credenciais de teste:** Admin: `admin` / `admin123` | Employee: criar via painel Admin

---

## 1. Introdução

Este documento descreve a estratégia, escopo, abordagem e critérios de qualidade para os testes manuais realizados na aplicação **OrangeHRM Demo** — um sistema SaaS de Gestão de Recursos Humanos (HRM) com múltiplos módulos funcionais.

O objetivo é validar os principais fluxos de negócio da plataforma, com foco em **dependências entre módulos**, **regras de negócio condicionais** e **comportamento do sistema frente a dados inválidos ou condições de borda**.

Este projeto integra o portfólio de QA do autor e demonstra capacidade de planejamento, escrita de casos de teste e reporte de defeitos em sistemas de domínio corporativo.

---

## 2. Objetivo do Teste

| Objetivo | Descrição |
|---|---|
| **Funcional** | Verificar que os módulos PIM, Recruitment, Leave e Time operam conforme os requisitos de negócio |
| **Integração** | Validar que ações em um módulo produzem o efeito esperado em módulos dependentes |
| **Negativo** | Garantir que o sistema rejeita entradas inválidas com mensagens de erro apropriadas |
| **Regressão** | Confirmar que fluxos críticos permanecem estáveis após operações de escrita (create/update/delete) |

---

## 3. Escopo

### 3.1 Em Escopo (In-Scope)

| Módulo | Funcionalidades Cobertas |
|---|---|
| **Admin** | Configuração de cargos, departamentos e localizações |
| **PIM** | Cadastro, edição e desligamento de funcionários |
| **Recruitment** | Criação de vaga, candidatura, ciclo de vida do candidato |
| **Leave** | Tipos de licença, solicitação, aprovação/rejeição, saldo |
| **Time** | Preenchimento de timesheet, submissão, aprovação |
| **My Info** | Visualização e edição de dados pelo perfil Employee |

### 3.2 Fora de Escopo (Out-of-Scope)

- Testes de performance e carga
- Testes de segurança (penetration testing)
- Módulos: Benefits, Buzz, Dashboard (widgets), Maintenance
- Integrações com sistemas externos
- Testes em dispositivos móveis nativos

---

## 4. Abordagem de Teste

### 4.1 Técnicas Utilizadas

| Técnica | Aplicação |
|---|---|
| **Partição de Equivalência** | Validação de campos de formulário (e-mail, datas, campos numéricos) |
| **Análise de Valor Limite** | Campos com limites definidos (ex: saldo de férias, horas por dia no timesheet) |
| **Teste de Tabela de Decisão** | Regras condicionais do módulo Leave (aprovação x saldo x tipo de licença) |
| **Teste Exploratório** | Sessões de 30 min por módulo para identificar comportamentos não documentados |
| **Teste de Fluxo de Negócio** | Cobertura end-to-end de fluxos multi-módulo (ex: admitir → alocar férias → desligar) |

### 4.2 Tipos de Teste

- Teste funcional manual
- Teste de integração entre módulos (manual)
- Teste negativo / validação de campos
- Teste de regressão (checklist pós-operações de escrita)

### 4.3 Abordagem de Priorização

Os casos de teste são priorizados com base em **risco de negócio** e **frequência de uso**:

1. **P1 — Crítico:** Fluxos que bloqueiam operação do sistema (ex: não conseguir cadastrar funcionário)
2. **P2 — Alto:** Regras de negócio com impacto financeiro ou de conformidade (ex: saldo de licença)
3. **P3 — Médio:** Fluxos secundários e funcionalidades de configuração
4. **P4 — Baixo:** Validações de UI, mensagens de erro e comportamentos cosméticos

---

## 5. Módulos e Cenários de Teste

### 5.1 Módulo PIM — People Information Management

**Objetivo:** Garantir que o ciclo de vida do funcionário (admissão → edição → desligamento) funciona corretamente e que os dados se propagam para módulos dependentes.

**Cenários principais:**
- Cadastro de funcionário com todos os campos obrigatórios preenchidos corretamente
- Cadastro com campos obrigatórios em branco (validação de formulário)
- Cadastro com formato inválido em campos estruturados (e-mail sem `@`, data inexistente)
- Edição de cargo e verificação do impacto no módulo Leave (políticas de licença por cargo)
- Desligamento de funcionário com solicitação de Leave aprovada pendente
- Busca de funcionário por nome, ID e departamento

**Regra de negócio crítica:** Um funcionário desligado não deve conseguir submeter novas solicitações. O sistema deve bloquear o acesso ou exibir erro apropriado.

### 5.2 Módulo Recruitment

**Objetivo:** Validar o fluxo completo de recrutamento, desde a criação da vaga até a contratação ou rejeição do candidato.

**Cenários principais:**
- Criação de vaga com cargo, descrição e data de encerramento
- Criação de vaga com data de encerramento no passado (deve rejeitar ou alertar)
- Adição de candidato a uma vaga ativa
- Progressão de status do candidato: `Application Initiated` → `Shortlisted` → `Interview Scheduled` → `Job Offered` → `Hired`
- Rejeição de candidato em diferentes etapas do funil com campo de motivo
- Tentativa de mover candidato para etapa anterior (verificar se o sistema permite reversão de status)
- Contratação de candidato e verificação automática de criação de perfil no PIM

**Regra de negócio crítica:** Ao marcar um candidato como `Hired`, o sistema deve ou criar automaticamente um registro no PIM ou direcionar o usuário para esse fluxo. Qualquer quebra nessa integração é um defeito de alta severidade.

### 5.3 Módulo Leave — Gestão de Licenças e Férias

**Objetivo:** Validar as regras de negócio do sistema de licenças, incluindo saldo, aprovação e impacto de datas sobrepostas.

**Cenários principais:**
- Solicitação de licença por Employee dentro do saldo disponível
- Solicitação que excede o saldo disponível (deve rejeitar com mensagem clara)
- Aprovação de licença pelo Admin e verificação do saldo atualizado
- Rejeição de licença pelo Admin com comentário obrigatório
- Solicitação de licença em datas sobrepostas a uma licença já aprovada
- Cancelamento de licença aprovada pelo próprio Employee
- Solicitação de licença em feriados ou fins de semana (verificar regra de dias úteis)
- Visualização do histórico de licenças por período

**Regra de negócio crítica:** O saldo de licença exibido ao Employee deve ser recalculado imediatamente após aprovação ou cancelamento. Inconsistências de saldo são defeitos P1.

**Caso de borda cross-módulo:** Solicitar férias para um Employee que foi desligado no PIM durante o período de aprovação pendente.

### 5.4 Módulo Time — Timesheet

**Objetivo:** Validar o preenchimento, submissão e aprovação de timesheets semanais.

**Cenários principais:**
- Preenchimento de timesheet com distribuição de horas por projeto e atividade
- Submissão de timesheet incompleto (dias sem preenchimento)
- Tentativa de inserir mais de 24h em um único dia (valor limite)
- Inserção de horas negativas ou com caracteres não numéricos (validação de campo)
- Submissão bem-sucedida e verificação de status `Submitted`
- Aprovação pelo Admin e verificação de status `Approved`
- Tentativa de editar timesheet já aprovado (deve bloquear ou exigir rejeição prévia)

**Regra de negócio crítica:** Um timesheet aprovado não deve ser editável. Se o sistema permitir edição sem rejeição prévia, é um defeito de integridade de dados.

---

## 6. Matriz de Rastreabilidade (RTM)

| ID Requisito | Descrição | ID Caso de Teste | Status |
|---|---|---|---|
| REQ-PIM-01 | Cadastro de funcionário com dados válidos | TC-PIM-01 | A executar |
| REQ-PIM-02 | Validação de campos obrigatórios no cadastro | TC-PIM-02 | A executar |
| REQ-PIM-03 | Desligamento de funcionário | TC-PIM-05 | A executar |
| REQ-REC-01 | Criação de vaga de emprego | TC-REC-01 | A executar |
| REQ-REC-02 | Progressão de status do candidato | TC-REC-03 | A executar |
| REQ-REC-03 | Integração Hired → PIM | TC-REC-05 | A executar |
| REQ-LEV-01 | Solicitação de licença com saldo suficiente | TC-LEV-01 | A executar |
| REQ-LEV-02 | Rejeição de solicitação sem saldo | TC-LEV-02 | A executar |
| REQ-LEV-03 | Aprovação e atualização de saldo | TC-LEV-03 | A executar |
| REQ-TIM-01 | Preenchimento e submissão de timesheet | TC-TIM-01 | A executar |
| REQ-TIM-02 | Validação de limite de horas diárias | TC-TIM-03 | A executar |
| REQ-TIM-03 | Bloqueio de edição de timesheet aprovado | TC-TIM-06 | A executar |

---

## 7. Ambiente de Teste

| Item | Detalhe |
|---|---|
| **URL** | https://opensource-demo.orangehrmlive.com |
| **Tipo de ambiente** | Demo público mantido pelo fornecedor |
| **Navegadores** | Google Chrome (latest), Mozilla Firefox (latest) |
| **Sistema operacional** | Windows 11 / macOS Sonoma |
| **Resolução** | 1920x1080 (desktop) |
| **Perfis de usuário** | Admin (acesso total), Employee (acesso restrito) |
| **Gestão de dados** | Dados criados durante os testes podem ser resetados pelo fornecedor a qualquer momento — evidências devem ser capturadas durante a execução |

> **Atenção:** O ambiente demo é compartilhado publicamente. Não inserir dados pessoais reais. Usar dados fictícios padronizados (ex: `Test Employee 001`, `test.employee@qa.com`).

---

## 8. Critérios de Entrada e Saída

### 8.1 Critérios de Entrada (Entry Criteria)
> Condições necessárias para iniciar a execução dos testes.

- [ ] Ambiente de demo acessível e login validado com ambos os perfis
- [ ] Casos de teste escritos e revisados para o módulo em execução
- [ ] Template de bug report disponível no repositório
- [ ] Dados de teste iniciais configurados (pelo menos 1 funcionário ativo, 1 vaga criada)

### 8.2 Critérios de Saída (Exit Criteria)
> Condições para considerar o ciclo de testes encerrado.

- [ ] 100% dos casos de teste P1 e P2 executados
- [ ] Todos os defeitos P1 documentados com evidência (screenshot/gif)
- [ ] Taxa de aprovação ≥ 80% nos casos de teste executados
- [ ] RTM atualizada com status final de cada caso de teste
- [ ] Relatório de execução consolidado no README do repositório

---

## 9. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Reset do ambiente demo pelo fornecedor | Alta | Alto | Capturar evidências durante a execução; não depender de dados persistentes |
| Bugs pré-existentes na aplicação demo | Alta | Médio | Documentar como defeitos conhecidos no README; não bloquear execução |
| Dados de outros usuários interferindo nos testes | Média | Médio | Usar nomes únicos com timestamp (ex: `TestUser_20250610`) |
| Módulo indisponível por manutenção | Baixa | Alto | Reordenar execução para módulos disponíveis |
| Comportamento inconsistente entre navegadores | Média | Baixo | Executar suite completa no Chrome; Firefox como validação secundária |

---

## 10. Entregas (Deliverables)

| Artefato | Formato | Localização |
|---|---|---|
| Test Plan | Markdown | `/test-plan.md` |
| Casos de Teste | Gherkin `.feature` | `/test-cases/` |
| Bug Reports | Markdown | `/bug-reports/` |
| Matriz de Rastreabilidade | Markdown (tabela) | `/rtm.md` |
| Evidências de execução | Screenshots / GIFs | `/evidence/` |
| README consolidado | Markdown | `/README.md` |

---

## 11. Definições

| Termo | Definição |
|---|---|
| **Severidade** | Impacto técnico do defeito no funcionamento do sistema (Critical, High, Medium, Low) |
| **Prioridade** | Urgência de correção do defeito do ponto de vista do negócio (P1, P2, P3, P4) |
| **Fluxo Feliz** | Caminho de execução com dados válidos e condições esperadas |
| **Caso de Borda** | Cenário com valores nos limites permitidos ou condições atípicas |
| **Caso Negativo** | Cenário com dados inválidos para validar o comportamento de rejeição do sistema |
| **RTM** | Requirements Traceability Matrix — rastreabilidade entre requisitos e casos de teste |

---

## 12. Histórico de Versões

| Versão | Data | Autor | Alterações |
|---|---|---|---|
| 1.0 | 2025-06 | Vitor Costa Silva | Versão inicial |
