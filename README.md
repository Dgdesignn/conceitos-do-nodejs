# Todo API

> Essa é uma aplicação para gerenciar tarefas (em inglês *todos*). É permitida a criação de um usuário com **`name`** e **`username`**, bem como fazer o CRUD de *todos*:

- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*.


##### *Tudo isso para cada usuário em específico (o username será passado pelo header)*

## Um pouco do código
### Middleware  ``checksExistsUserAccount``

Esse **middleware** vai serve para autenticar os nosso users apartir do userne.

*Fig-1: imagem do código do middleware*
![middleware](./readm_images/middleware.PNG)


### POST ``/users``
Esta rota deve receber name, e username dentro do corpo da requisição para efectuar o cadastro.

*Fig-2: Código da rota de cadastro*
![users](./readm_images/createuser.PNG)

### GET ``/todos``

Esta rota deve receber, pelo header da requisição, uma propriedade `username` contendo o username do usuário e retorna uma lista com todas as tarefas desse usuário.

*Fig-3: Código da rota dos todos do user*
![users](./readm_images/listTodo.PNG)

> Estes são algumas das funcionalidades, consulte o arquivo [_index.js](./src/index.js)_ para analisar as funcionlidades**


#### _ESTOU ABERTO PARA QUALQUER FEEDBACK_