import { createWriteStream } from 'node:fs';
import path from 'path';
import { stdin } from 'node:process';
import { getDir } from '../utils.js';

const dir = getDir(import.meta.url);
const pathToWrite = path.join(dir, './files/fileToWrite.txt' );
const write = async () => {
    const writeStream = createWriteStream(pathToWrite, 'utf-8');
    stdin.pipe(writeStream);
};

await write();