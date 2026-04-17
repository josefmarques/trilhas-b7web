import { readFile, writeFile, unlink } from "node:fs/promises";

// Escrever em um arquivo
// const escreverArquivo = async() => {
//     console.log('Escrevendo arquivo...')
//     await writeFile('./arquivo.txt', 'Jose, Magda, Ana, Murilo')
//     console.log('Pronto')
// }

// escreverArquivo();

// Ler um arquivo

// const lerArquivo = async() => {    
//     const fileContent =await readFile('./escrever.txt', { encoding: "utf8" });
//     console.log(fileContent)
// }

// lerArquivo();


// Alterar um arquivo

// const alterarArquivo = async() => {    
//     const fileContent = await readFile('./arquivo.txt', { encoding: "utf8" });
//     const list = fileContent.split("\n");

//     list.push("Fulano");
//     const listTxt = list.join("\n");
//     await writeFile('./arquivo.txt', listTxt);   
// }

// alterarArquivo();

// deletar arquivo
const deletarArquivo = async () => {
    await unlink('./escrever.txt');
}

deletarArquivo();



