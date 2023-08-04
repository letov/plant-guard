import fs from "fs";
import path from "path";
import mime from "mime-types";

export function traverse(dir) {
    const result = [];

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            result.push(filePath);
        } else if (stat.isDirectory()) {
            result.push(...traverse(filePath));
        }
    }

    return result;
}

export function toVarName(file) {
    file = path.basename(file);
    const dotIndex = file.lastIndexOf('.');
    if (dotIndex !== -1) {
        file = file.substring(0, dotIndex);
    }

    file = file.replace(/[^a-zA-Z0-9_]/g, '_');

    if (!/^[a-zA-Z_]/.test(file)) {
        file = '_' + file;
    }

    return file;
}

export function toUrl(path) {
    const pathParts = path.split('/');
    pathParts.shift();
    pathParts.shift();
    return pathParts.join('/');
}

export function generateRandomString(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
    }
    return result;
}

export function genSendChunkCode(chunkNames) {
    let result = '';

    for (let chunkName of chunkNames) {
        result += `    httpd_resp_send_chunk(req, (const char *) ${chunkName}, ${chunkName}_len);\n`;
    }

    return result;
}

export function getMime(file) {
    return mime.contentType(path.extname(file));
}