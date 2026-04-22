install dependências:
na raiz execute:
npm i drizzle-orm pg
npm i -D @types/pg drizzle-kit
npx drizzle-kit generate
npx drizzle-kit migrate

Se fizer alguma alteração no BD roda novamente:
npx drizzle-kit generate
npx drizzle-kit migrate