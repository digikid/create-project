import dree from 'dree';
import copyDir from 'copy-dir';
import ncp from 'ncp';
import replace from 'replace-in-file';

import { access, unlink, writeFile, readFile } from 'fs/promises';

import { dir } from '#lib/utils/path';

export const isExistsAsync = async path => {
    try {
        const e = await access(dir(path));

        return !e;
    } catch(e) {
        return false;
    };
};

export const replaceAsync = async (options) => {
    try {
        await replace(options);
    } catch(e) {
        console.log(e);
    };
};

export const readFileAsync = async (path, encoding = 'utf-8') => {
    try {
        const data = await readFile(dir(path), encoding);

        return data;
    } catch(e) {
        return '';
    };
};

export const writeFileAsync = async (path, data) => {
    try {
        await writeFile(dir(path), data);
    } catch(e) {
        return false;
    };

    return true;
};

export const removeFileAsync = async path => {
    try {
        await unlink(dir(path));
    } catch(e) {
        return false;
    };

    return true;
};

export const copyDirAsync = (source, dest, options) => {
    return new Promise((resolve, reject) => {
        copyDir(source, dest, options, e => {
            if (e) {
                reject(e);
            };

            resolve();
        });
    });
};

export const mergeDirsAsync = (source, dest) => {
    return new Promise((resolve, reject) => {
        ncp(source, dest, e => {
            if (e) {
                reject(e);
            };

            resolve();
        });
    });
};

export const scanDirectory = (path, options = {}) => {
    try {
        const result = dree.scan(dir(path), options);

        const tree = (result && ('children' in result)) ? result.children : [];

        return tree;
    } catch(e) {
        return [];
    };
};