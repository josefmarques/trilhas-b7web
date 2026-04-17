import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import router from './routes/index.js';
import { errorHandler, notFoundRequest } from './routes/errorhandler.js';

const server = express();

// Configurações de Middleware
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (verifique se a pasta 'public' existe na raiz)
server.use(express.static(path.join(import.meta.dirname, "../public")));

server.use('/', router);
server.use(notFoundRequest)
server.use(errorHandler);



// Inicialização
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}/`);
});