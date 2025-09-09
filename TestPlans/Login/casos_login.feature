"Funcionalidade: Login no sistema
  Cenário: Login com credenciais válidas
    Dado que o usuário está na página de login
    Quando ele informar um usuário válido
    E informar uma senha válida
    E clicar em ""Login""
    Então o sistema deve autenticar o usuário
    E redirecionar para a home page"

    "Funcionalidade: Login no sistema
  Cenário: Login com credenciais inválidas
    Dado que o usuário está na página de login
    Quando ele informar um usuário válido
    E informar uma senha inválida
    E clicar em ""Login""
    Então o sistema deve exibir a mensagem de erro ""Epic sadface: Username and password do not match any user in this service""
    E permanecer na tela de login
"

"Funcionalidade: Login no sistema
  Cenário: Login com usuário bloqueado
    Dado que o usuário está na página de login
    Quando ele informar um usuário bloqueado
    E informar a senha correta
    E clicar em ""Login""
    Então o sistema deve exibir a mensagem de erro ""Epic sadface: Sorry, this user has been locked out.""
    E não permitir o acesso ao sistema
"

"Funcionalidade: Login no sistema
  Cenário: Tentativa de login sem preencher credenciais
    Dado que o usuário está na página de login
    Quando ele não informar usuário
    E não informar senha
    E clicar em ""Login""
    Então o sistema deve exibir a mensagem de erro ""Epic sadface: Username is required""
    E permanecer na tela de login"