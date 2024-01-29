import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createUnzip } from 'node:zlib';
import path from 'node:path';
import { getDir } from '../utils.js';
import { access } from 'node:fs/promises';

const dir = getDir(import.meta.url);

const outputPath = path.join(dir, './files/fileToCompress.txt');
const inputPath = path.join(dir, './files/archive.gz'); 

const decompress = async () => {
    access(outputPath).then(()=>{
		throw new Error('Unzip operation failed: fileToCompress.txt already exists');
	});

    try {
        await pipeline(
        createReadStream(inputPath),
        createUnzip(),
        createWriteStream(outputPath))
    } catch (err) {
        throw new Error('Unzip operation failed');
    } 
};

await decompress();