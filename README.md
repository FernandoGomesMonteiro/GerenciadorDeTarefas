# Gerenciador de Tarefas

## Descrição do Projeto

Este projeto é uma aplicação web para gerenciamento de tarefas desenvolvida com Vue.js 3 e TypeScript. A aplicação permite aos usuários criar, visualizar, filtrar e marcar tarefas como concluídas, oferecendo uma interface intuitiva e responsiva.

## Tecnologias Utilizadas

- **Vue.js 3**: Framework frontend
- **TypeScript**: Backend
- **Vuetify**: Biblioteca de componentes
- **Pinia**: Gerenciador de estado
- **Vite**: Ferramenta de build 

## Funcionalidades Implementadas

### Requisitos Funcionais

- **Cadastro de Tarefas**: Permite adicionar novas tarefas com título, descrição e data de vencimento
- **Listagem de Tarefas**: Exibe todas as tarefas cadastradas em um layout de cards
- **Filtragem**: Possibilita filtrar tarefas por status (pendentes, concluídas ou todas)
- **Atualização de Status**: Permite marcar tarefas como concluídas ou pendentes

### Bônus Implementados

- **Busca Textual**: Pesquisa de tarefas por título
- **Gerenciamento de Estados**: gerenciamento do estado
- **Armazenamento Local**: Persistência dos dados no localStorage do navegador
- **Tema Claro/Escuro**: Suporte a alternância entre temas

## Estrutura do Projeto

```
GerenciadorDeTarefas/
├── public/              
├── src/                 
│   ├── assets/          
│   ├── components/      
│   │   └── tasks/       
│   ├── plugins/         
│   ├── router/          
│   ├── stores/         
│   ├── views/         
│   ├── App.vue         
│   └── main.ts        
├── package.json     
└── vite.config.ts
```

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/FernandoGomesMonteiro/GerenciadorDeTarefas.git
   cd GerenciadorDeTarefas
   ```

2. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```

3. Execute o servidor de desenvolvimento:
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação em seu navegador:
   ```
   http://localhost:5173
   ```

### Compilação para Produção

```sh
npm run build
# ou
yarn build
```

## Funcionalidades e Uso

- **Adicionar Tarefa**: Clique no botão flutuante (+) no canto inferior direito
- **Marcar como Concluída**: Clique no checkbox ao lado da tarefa
- **Filtrar Tarefas**: Use os controles de filtro no topo da página
- **Buscar Tarefas**: Digite no campo de busca para encontrar tarefas específicas
- **Alternar Tema**: Clique no ícone de tema na barra superior
