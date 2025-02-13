#tsconfig
npm tsc -y

#packagejson
npx tsc --init

#dependencias
npm install --save-dev @types/node
npm install --save-dev @types/readline-sync

#ejecutar codigo
node dist/index.js 