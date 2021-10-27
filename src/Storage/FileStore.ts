import { Store } from "~/types";

import { promisify } from "util";
import fs from "fs";
import zlib from "zlib";
import { dirname } from "path";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

/**
 * Implements access to the JSON data.
 */
export default class FileStore implements Store {
  basePath = "data/";

  /**
   * Reads JSON data from the given path.
   *
   * @param {string} path
   * @return {Object} The parsed JSON.
   */
  async load(path: string) {
    const contents = await readFile(this.basePath + "/" + path + ".gz");
    const unzipped = await gunzip(contents);
    const data = JSON.parse(unzipped as any);
    return data;
  }

  /**
   * Writes the given data to the path.
   *
   * @param {string} path
   * @param {Object} data The parsed JSON.
   */
  async store(path: string, data: any) {
    const fullPath = this.basePath + "/" + path + ".gz";
    await mkdir(dirname(fullPath), { recursive: true });
    const json = JSON.stringify(data, null, 4);
    const zipped = await gzip(json);
    await writeFile(fullPath, zipped);
  }
}
