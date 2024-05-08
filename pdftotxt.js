// https://www.npmjs.com/package/unpdf
import { extractText, getDocumentProxy } from "unpdf";
import { readFile } from 'fs/promises';

// Fetch a PDF file from the web
// const buffer = await fetch(
//   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
// ).then((res) => res.arrayBuffer());

// Or load it from the filesystem
const buffer = await readFile("./files/ass-auto.pdf");

// Load PDF from buffer
const pdf = await getDocumentProxy(new Uint8Array(buffer));
// Extract text from PDF
const { totalPages, text } = await extractText(pdf, { mergePages: true });

console.log(text)


// import { readFile } from 'fs/promises';

// const data = await readFile("./files/ass-auto.pdf");