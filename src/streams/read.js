import { createReadStream } from 'node:fs';
import path from 'path';
import { stdout } from 'node:process';
import { getDir } from '../utils.js';

const dir = getDir(import.meta.url);
const pathToRead = path.join(dir, './files/fileToRead.txt' );

const read = async () => {
    const readStream = createReadStream(pathToRead, 'utf-8');
    readStream.pipe(stdout);
}

await read();