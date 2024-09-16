import { copyFile, mkdir, readdir } from 'fs/promises';
import path from 'path';
import { getDir } from '../utils.js';

const dir = getDir(import.meta.url);
const src = path.join(dir, 'files');
const target = path.join(dir, 'files_copy');

async function copyDir(src, dest) {
    let items;
    try {
        items = await readdir(src, { recursive: true, withFileTypes: true });
    } catch (err) {
        throw new Error('FS operation failed: directory not found');
    } 

    try {
        await mkdir(dest);
    } catch (err) {
        throw new Error('FS operation failed: folder already exists');
    } 

    for (let item of items) {
        console.log(item);
        let srcPath = path.join(item.path, item.name);
        let destPath = path.join(dest, item.name);
        
        if (item.isFile()) {
            try {
                await copyFile(srcPath, destPath);
            } catch (err) {
                throw new Error('FS operation failed: file already exists');
            } 
        } else {
            try {
                await copyDir(srcPath, destPath);
            } catch (err) {
                throw new Error('FS operation failed: folder already exists');
            } 
        }
    }
}

const copy = async () => {
    try {
        copyDir(src, target);
    } catch {
        throw new Error('FS operation failed');
    }    
}

await copy();
