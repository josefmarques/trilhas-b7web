# Tailwind CSS com Node.js

Agora usando Tailwind CSS instalado localmente via Node.js!

## Instalação

As dependências já estão instaladas. Se necessário, reinstale com:
```bash
npm install
```

## Scripts disponíveis

- `npm run dev` - Desenvolvimento: observa mudanças e gera CSS automaticamente
- `npm run build` - Produção: gera CSS minificado

## Como usar

1. Instale a extensão **"Tailwind CSS IntelliSense"** no VS Code
2. Reinicie o VS Code
3. Abra este diretório como workspace
4. Execute `npm run dev` em um terminal para desenvolvimento

## Testando o IntelliSense

Digite classes como `bg-red-`, `text-`, `p-`, `mt-` e pressione `Ctrl+Space` para ver sugestões.

## Estrutura do projeto

- `src/input.css` - Arquivo CSS de entrada com diretivas do Tailwind
- `dist/output.css` - CSS gerado pelo Tailwind
- `tailwind.config.js` - Configuração do Tailwind
- `index.html` - Página HTML que usa o CSS local

Para mais informações: [Tailwind CSS Docs](https://tailwindcss.com/docs)