# Test Cases

Esta pasta centraliza os **casos de teste** elaborados para validar os requisitos e comportamentos esperados das aplicações testadas.

## Finalidade

Organizar e documentar os cenários de teste de forma estruturada, garantindo cobertura adequada das funcionalidades e rastreabilidade entre requisitos e validações executadas.

## O que você vai encontrar aqui

- **Casos de teste manuais** organizados por módulo ou funcionalidade
- **Cenários positivos e negativos** (happy path e edge cases)
- **Pré-condições**, passos de execução e critérios de aceite
- **Status de execução** (Passou / Falhou / Bloqueado / Não executado)
- Organização por aplicação testada (ex: Swag Labs, OrangeHRM)

## Padrão dos casos de teste

Cada caso de teste documenta:

| Campo | Descrição |
|---|---|
| **ID** | Identificador único (ex: TC-001) |
| **Título** | Descrição objetiva do que está sendo testado |
| **Pré-condições** | O que precisa estar configurado antes da execução |
| **Passos** | Ações executadas pelo testador |
| **Resultado Esperado** | Comportamento correto do sistema |
| **Resultado Obtido** | O que o sistema retornou de fato |
| **Status** | Passou / Falhou / Bloqueado |

## Exemplo principal

**Teste de Carrinho — Swag Labs**
Descreve o fluxo completo de adicionar e remover produtos do carrinho de compras, validando:

- Mensagens de erro e sucesso
- Atualização dos valores
- Quantidade de itens
- Estado final do carrinho

---

> 💡 Casos de teste bem escritos são a base de qualquer estratégia de qualidade.
> Eles demonstram capacidade analítica, domínio dos requisitos e visão sistêmica do produto.
