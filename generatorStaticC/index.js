import fs from "fs";
import zlib from "zlib";
import * as util from "util";
import { generateRandomString, genSendChunkCode, getMime, toUrl, toVarName, traverse } from "./helpers.js";

const inputDir = '../dist';
const outputFilename = './output/static.c';
const chunkSize = 30000;
const gzip = util.promisify(zlib.gzip);

(async () => {
    try {
        if (fs.existsSync(outputFilename)) {
            fs.unlinkSync(outputFilename);
        }

        fs.appendFileSync(outputFilename, `//AUTOGENERATED FILE!!!\n\n`);
        fs.appendFileSync(outputFilename, `#include <esp_http_server.h>\n\n`);

        const files = traverse(inputDir);
        const validVars = [];
        for (const file of files) {
            const validVar = `${toVarName(file)}_${generateRandomString(5)}`;
            validVars.push(validVar);

            const data = await fs.readFileSync(file);
            let chunkNumber = 0;
            let offset = 0;
            let chunkNames = [];
            while (offset < data.length) {
                const chunkData = data.subarray(offset, offset + chunkSize);
                const compressedData = await gzip(chunkData);

                const uint8Array = new Uint8Array(compressedData);
                const dataArray = Array.from(uint8Array);
                const cArrayFormat = dataArray.map(byte => `0x${byte.toString(16)}`).join(', ');

                const chunkName = `${validVar}_${chunkNumber}`;
                chunkNames.push(chunkName);

                fs.appendFileSync(outputFilename, `const uint8_t ${chunkName}[] = {${cArrayFormat}};\n`);
                fs.appendFileSync(outputFilename, `const size_t ${chunkName}_len = ${compressedData.length};\n`);

                chunkNumber++;
                offset += chunkSize;
            }

            const handler = `
esp_err_t ${validVar}_handler(httpd_req_t *req) {
    httpd_resp_set_type(req, "${getMime(file)}");
    httpd_resp_set_hdr(req, "Content-Encoding", "gzip");
    
    ${genSendChunkCode(chunkNames)}
    
    httpd_resp_send_chunk(req, NULL, 0);
    return ESP_OK;
}\n`;

            const route = `
httpd_uri_t uri_${validVar} = {
    .uri = "/${toUrl(file)}",
    .method = HTTP_GET,
    .handler = ${validVar}_handler,
    .user_ctx = NULL
};\n\n`;

            fs.appendFileSync(outputFilename, handler);
            fs.appendFileSync(outputFilename, route);
        }

        let register = '';
        for (const validVar of validVars) {
            register += `    httpd_register_uri_handler(server, &uri_${validVar});\n`;
        }

        fs.appendFileSync(outputFilename, `
void static_routing_register(httpd_handle_t server) {
${register}}`);

    } catch (err) {
        console.error('Error:', err);
    }
})();