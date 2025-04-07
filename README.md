# Gerenciador de Tarefas

## Descrição do Projeto

Este projeto é uma aplicação web para gerenciamento de tarefas desenvolvida com Vue.js 3 e TypeScript. A aplicação permite aos usuários criar, visualizar, filtrar e marcar tarefas como concluídas, oferecendo uma interface intuitiva e responsiva.

## Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript progressivo para construção de interfaces de usuário
- **TypeScript**: Superset tipado de JavaScript que compila para JavaScript puro
- **Vuetify**: Biblioteca de componentes UI para Vue.js baseada no Material Design
- **Pinia**: Gerenciador de estado para Vue.js
- **Vite**: Ferramenta de build que oferece um ambiente de desenvolvimento mais rápido

## Funcionalidades Implementadas

### Requisitos Funcionais

- **Cadastro de Tarefas**: Permite adicionar novas tarefas com título, descrição e data de vencimento
- **Listagem de Tarefas**: Exibe todas as tarefas cadastradas em um layout de cards
- **Filtragem**: Possibilita filtrar tarefas por status (pendentes, concluídas ou todas)
- **Atualização de Status**: Permite marcar tarefas como concluídas ou pendentes

### Bônus Implementados

- **Busca Textual**: Pesquisa de tarefas por título ou descrição
- **Gerenciamento de Estados**: Utilização do Pinia para gerenciamento centralizado do estado da aplicação
- **Armazenamento Local**: Persistência dos dados no localStorage do navegador
- **Tema Claro/Escuro**: Suporte a alternância entre temas

## Estrutura do Projeto

```
gerenciador-tarefas/
├── public/              # Arquivos públicos
├── src/                 # Código fonte
│   ├── assets/          # Recursos estáticos (CSS, imagens)
│   ├── components/      # Componentes Vue
│   │   └── tasks/       # Componentes relacionados a tarefas
│   ├── plugins/         # Plugins Vue (Vuetify)
│   ├── router/          # Configuração de rotas
│   ├── stores/          # Stores Pinia para gerenciamento de estado
│   ├── views/           # Componentes de página
│   ├── App.vue          # Componente raiz
│   └── main.ts          # Ponto de entrada da aplicação
├── package.json         # Dependências e scripts
└── vite.config.ts       # Configuração do Vite
```

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```sh
   git clone [URL_DO_REPOSITÓRIO]
   cd gerenciador-tarefas
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

## Observações

A aplicação utiliza o localStorage do navegador para persistência de dados, o que significa que as tarefas são armazenadas apenas no navegador do usuário. Em um ambiente de produção, seria recomendável implementar um backend para armazenamento permanente dos dados.
