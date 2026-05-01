install dependências:
na raiz execute:
npm install

- passo 1: endpoint/rota
- passo 2: função dentro do controller (criar controller tbm)
- passo 2: validators necessários
- passo 4: services necessários
- passo 5: retorno do endpoint

Endpoint padrão:
site.com/api/users

# Estrutura do Projeto B7ESTOQUE

Este documento descreve a arquitetura e a responsabilidade de cada diretório e arquivo na aplicação Node.js com TypeScript, baseada na estrutura de pastas da imagem. A aplicação segue uma **Arquitetura em Camadas (Layered Architecture)**, separando claramente as responsabilidades de roteamento, controle, regras de negócio e acesso a dados.

## 📂 `src/` (Source)
Diretório principal onde reside todo o código-fonte da aplicação.

### 📁 `controllers/`
Responsável por receber as requisições HTTP (`req`), chamar os serviços necessários para processar as regras de negócio e retornar as respostas HTTP adequadas (`res`). Eles não devem conter lógica de negócio complexa.
* **`auth.controller.ts`**: Lida com o fluxo de autenticação (login, registro, recuperação de senha).
* **`category.controller.ts`**: Controla as requisições de categorias (criar, listar, atualizar, deletar).
* **`product.controller.ts`**: Controla as requisições de produtos.
* **`user.controller.ts`**: Controla o gerenciamento de usuários.

### 📁 `db/`
Gerencia a conexão com o banco de dados e as definições de estrutura das tabelas. (Possivelmente usando o Drizzle ORM, dado o diretório raiz `drizzle`).
* **`schema/`**: Diretório que armazena as definições das tabelas do banco de dados.
* **`connection.ts`**: Arquivo responsável por instanciar e exportar a conexão com o banco de dados.

### 📁 `middlewares/`
Contém funções intermediárias que interceptam as requisições antes de chegarem aos controllers.
* **`auth.middleware.ts`**: Verifica se o usuário está autenticado (ex: validação de token JWT). Protege as rotas privadas.
* **`error.middleware.ts`**: Middleware global de tratamento de erros. Captura exceções da aplicação e formata a resposta de erro para o cliente.
* **`upload.middleware.ts`**: Lida com upload de arquivos (ex: upload de imagens de produtos via `multer`).

### 📁 `routes/`
Define os endpoints (URLs) da API e mapeia cada rota para o seu respectivo controller.
* **`auth.routes.ts`**: Rotas de autenticação (ex: `/api/auth/login`).
* **`categories.routes.ts`**: Rotas de categorias (ex: `/api/categories`).
* **`index.ts`**: Arquivo central que agrupa todas as rotas e as exporta para o `server.ts`.
* **`products.routes.ts`**: Rotas de produtos (ex: `/api/products`).
* **`user.routes.ts`**: Rotas de usuários (ex: `/api/users`).

### 📁 `services/`
A camada mais importante para a aplicação. Contém todas as **Regras de Negócio**. Os serviços são chamados pelos controllers e interagem com o banco de dados (ou outros serviços/APIs).
* **`category.service.ts`**: Lógica de negócio das categorias.
* **`file.service.ts`**: Lógica de manipulação de arquivos (salvar localmente, enviar para S3/Cloudinary, apagar arquivos órfãos).
* **`product.service.ts`**: Lógica de negócio dos produtos (cálculos, verificações de estoque, etc).
* **`user.service.ts`**: Lógica de negócio dos usuários (ex: hashear senhas antes de salvar).

### 📁 `types/`
Armazena definições de tipos (`interfaces` e `types`) globais do TypeScript.
* **`express.d.ts`**: Arquivo de declaração (Declaration File) usado para estender os tipos do Express. Muito comum para adicionar a propriedade `user` no objeto `Request` (ex: `req.user`) após a autenticação.

### 📁 `utils/`
Contém funções utilitárias e classes de ajuda que são usadas em várias partes do sistema.
* **`apperror.ts`**: Geralmente exporta uma classe `AppError` personalizada (que estende o `Error` nativo), permitindo passar um código de status HTTP junto com a mensagem de erro (ex: `throw new AppError("Não autorizado", 401)`).

### 📁 `validators/`
Responsável pela validação dos dados de entrada (payloads/bodies de requisições). Muito possivelmente usando bibliotecas como **Zod** ou Joi.
* **`auth.validator.ts`**: Validações de login/registro (ex: garantir que o email é válido e a senha tem formato correto).
* **`category.validator.ts`**: Validações da criação/edição de categorias.
* **`product.validator.ts`**: Validações da criação/edição de produtos (como o schema de preços que vimos anteriormente).
* **`user.validator.ts`**: Validações dos dados de usuário.

### 📄 `server.ts`
**O Ponto de Entrada (Entry Point) da aplicação.**
É aqui que o aplicativo Express é inicializado. Suas principais responsabilidades incluem:
1. Configurar middlewares globais (CORS, body parser em JSON).
2. Importar e usar as rotas centrais (`routes/index.ts`).
3. Registrar o middleware global de erros (`error.middleware.ts`).
4. Iniciar o servidor escutando em uma porta específica (no caso da imagem, porta `3001`).