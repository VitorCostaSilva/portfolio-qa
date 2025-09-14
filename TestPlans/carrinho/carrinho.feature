Feature: Carrinho de Compras
  Como usuário do sistema
  Quero gerenciar os itens do carrinho
  Para que eu possa finalizar compras corretamente

  Scenario: Adicionar um item ao carrinho
    Given que estou na homepage https://www.saucedemo.com/
    And estou logado
    When eu seleciono um produto e clico em "Adicionar ao carrinho"
    Then o produto deve aparecer listado no carrinho

  Scenario: Adicionar múltiplos itens ao carrinho
    Given que estou na homepage https://www.saucedemo.com/
    And estou logado
    When eu seleciono vários produtos e clico em "Adicionar ao carrinho"
    Then todos os produtos selecionados devem aparecer listados no carrinho

  Scenario: Remover produto do carrinho
    Given que estou na homepage https://www.saucedemo.com/
    And o carrinho contém produtos
    When eu removo um item do carrinho
    Then o item removido não deve aparecer mais no carrinho

  Scenario: Finalizar compra com carrinho vazio
    Given que estou na homepage https://www.saucedemo.com/
    And o carrinho está vazio
    When eu tento finalizar a compra
    Then o sistema deve exibir uma mensagem de erro
    And não deve permitir concluir a compra

  Scenario: Tentar finalizar compra sem estar logado
    Given que estou deslogado
    When eu tento acessar o carrinho
    And tento finalizar a compra
    Then o sistema deve impedir a operação
    And deve solicitar login
