import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import path from 'node:path';
import { getDir } from '../utils.js';

const dir = getDir(import.meta.url);

const inputPath = path.join(dir, './files/fileToCompress.txt');
const outputPath = path.join(dir, './files/archive.gz');

const compress = async () => {
    access(outputPath).then(()=>{
		throw new Error('Zip operation failed: archive.gz already exists');
	});
    try {
        await pipeline(
        createReadStream(inputPath),
        createGzip(),
        createWriteStream(outputPath));
    } catch (err) {
        throw new Error('Zip operation failed');
    } 
};

await compress();