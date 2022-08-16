<div align="center">
    <img style="background-color: #181842; padding: 10px" src="https://dielenergia.com/assets/img/diel/icon.svg" width="100" />
    <h1>
        <b>Diel's Task</b><br>
        Front-end
    </h1>
    <h4>
        Front-end do desafio técnico do processo seletivo de estágio na Diel Energia
    </h4> 
</div>

---

<h2 id="conteudos">Conteúdos</h2>

[➜ Sobre o projeto](#sobre-o-projeto)<br>
[➜ O que aprendi/fixei](#o-que-aprendi-e-fixei)<br>
[➜ Interface](#interface)<br>
[➜ Como rodar na sua máquina](#como-rodar-na-sua-máquina)<br>

---

## Sobre o projeto

<sup>[Voltar ao topo](#conteudos)</sup><br>

O objetivo do desafio técnico é construir o back-end e o front-end de uma SPA de calendário de tarefas do dia utilizando uma stack que você sinta confortável, pensando sempre em performance, segurança e escalabilidade. O presente repositório contém o código e informações acerca do Front-end da aplicação, para acessar o repositório do Back-end clique [aqui](https://github.com/lucasbivar/diel-psel-back).

Para ver o funcionamento do Back-end e do Front-end não é necessário rodar o código na sua máquina, uma vez que ambos já estão hospedados (Se tiver interesse em rodar, siga o [tutorial](#como-rodar-na-sua-máquina) no fim do README). Links do resultado final do desafio já hospedado:

- Front-end (Aplicação final para usuário comum): 
  - https://diel-psel-front.vercel.app/
  
- Back-end: 
  - https://task-back-diel.herokuapp.com/api/task

---

### ➡ Tecnologias Utilizadas no Front-end
-   [x] Vite
-   [x] ReactJS
-   [x] React Router
-   [x] Chakra UI
-   [x] Axios (HTTP Client)
-   [x] React Query
-   [x] React Hook Form
-   [x] Yup
-   [x] Framer Motion
-   [x] ESLint
-   [x] Prettier
-   [x] Vercel - Deploy

---

### ➡ Funcionalidades
A aplicação possui as seguintes funcionalidades:

- [x] Criar uma nova tarefa
- [x] Alterar dados de uma tarefa
- [x] Marcar tarefa com realizada ou pendente
- [x] Apagar tarefa
- [x] Recuperar tarefa apagada na tela de histórico
- [x] Visualizar detalhes de uma tarefa 
- [x] Listar todas as tarefas
- [x] Buscar tarefas pelo título
- [x] Visualizar tarefas por dia, semana ou mês


---

## O que aprendi e fixei

<sup>[Voltar ao topo](#conteudos)</sup><br>

- [x] Uso da biblioteca de componentes Chakra UI para facilitar a construção da UI
- [x] Uso do Axios que funciona como um cliente HTTP baseado em Promises para fazer as requisições para o Back-end
- [x] Uso do React Query (ferramenta de gerenciamento de estado) para lidar com o data fetching, cache, sincronização e atualização do server state, trazendo assim, tornando a aplicação mais limpa, fácil de ler, e trazendo um impacto positivo na experiência do usuário 
- [x] Uso do React Hook Form em conjunto com o Yup para auxiliar na organização e padronização das validações dos formulários de criar tarefa e editar tarefa
- [x] Uso do Framer Motion na animação da aparição das tarefas na lista de tarefas
- [x] Organização e formatação de código no geral utilizando o ESLint e o Prettier
- [x] Deploy do Front-end na Vercel utilizando variáveis de ambiente

---

## Interface

<sup>[Voltar ao topo](#conteudos)</sup><br>

### Home - Tarefas
![](https://i.imgur.com/07Kxt7o.png)
![](https://i.imgur.com/h9SpwWl.png)
![](https://i.imgur.com/sBwn9AI.png)

### Detalhes da Tarefa
![](https://i.imgur.com/JuvEGW6.png)

### Histórico - Tarefas Deletadas
![](https://i.imgur.com/783lCtg.png)

### Editar Tarefa
![](https://i.imgur.com/ufncbfa.png)

### Criar Tarefa
![](https://i.imgur.com/Iesuz85.png)

---

## Como rodar na sua máquina


<sup>[Voltar ao topo](#conteudos)</sup><br>

Para testar essa aplicação na sua máquina você precisa atender aos requisitos:

- Executar o Back-end da aplicação, para isso, acesse o link do repositório abaixo e siga as instruções de execução
  - https://github.com/lucasbivar/diel-psel-back

- Clonar o repositório do Front (necessário ter o git instalado)
  - No terminal, digitar:
    ```bash 
    # Clonando repositório
    $ git clone https://github.com/lucasbivar/diel-psel-front 

    # Entrando na pasta do projeto
    $ cd diel-psel-front
    ```

- Instalar dependências do projeto (necessário ter o npm):
  - No terminal da pasta raiz do projeto, digitar:
    ```bash 
    $ npm install
    ```

- Criar um arquivo `.env` na raiz do projeto contendo a estrutura abaixo:
  ```env
  VITE_BACKEND_URL=http://localhost:2000/api
  ```

- Executar o Front-end:
  - No terminal da pasta raiz do projeto, digitar:
    ```bash
    $ npm run dev
    ```

  - O Front-end será executado na porta 5173, para testar você pode utilizar a seguinte URL:
    - http://localhost:5173/

---

<div>
  <sub>Made with 💙 by <a href="https://github.com/lucasbivar">Lucas Bivar</a></sub>
</div>