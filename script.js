#!/usr/bin/env node
import fse from "fs-extra";
import * as keys from "./src/example-2.js";
const SRC_DIR = `./src/example-2.js`;
const fileName = SRC_DIR.substring(SRC_DIR.lastIndexOf("/") + 1);
// const DEST_DIR = `./src/ENV/PROD/`;

const list = Object.keys(keys);
process.stdin.setEncoding("utf8");

const content = fse
  .readFileSync(SRC_DIR, "utf8")
  .split(/\r?\n/)
  .map((sourceLine, i) => {
    sourceLine = sourceLine.trim();
    console.log(
      i,
      list
        .filter((s) => {
          if (sourceLine.includes(s) && !sourceLine.includes("export")) {
            return s;
          }
        })
        .pop(),
      sourceLine
    );

    const flag = list
      .filter((s) => {
        if (sourceLine.includes(s) && !sourceLine.includes("export")) {
          return s;
        }
      })
      .pop();

    if (flag !== undefined) {
      const check = `/** @type {import('./${fileName}').${flag}} */`;
      return [check, sourceLine];
    }

    return sourceLine;
  })
  .flat();
console.log(content);
fse.writeFileSync(SRC_DIR, content.join("\n"));
