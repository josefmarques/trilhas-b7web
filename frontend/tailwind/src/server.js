// Importa os módulos necessários do Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuração do servidor
const hostname = 'localhost';
const port = 3003;

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
  // Se a requisição for para a raiz, serve o index.html
  if (req.url === '/' || req.url === '/index.html') {
    // Lê o arquivo index.html
    const filePath = path.join(__dirname, '..', 'index.html');
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Se houver erro ao ler o arquivo
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Erro interno do servidor');
      } else {
        // Se conseguir ler o arquivo, envia o HTML
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else {
    // Para outras rotas, retorna 404
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Página não encontrada');
  }
});

// Inicia o servidor
server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
  console.log(`Abra seu navegador e acesse: http://localhost:3003/`);
});