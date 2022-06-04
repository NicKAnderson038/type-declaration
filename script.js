#!/usr/bin/env node
/* eslint-disable no-undef */
import * as keys from "./src/example.js";
import fse from "fs-extra";
const SRC_DIR = `./src/example.js`;
// const DEST_DIR = `./src/ENV/PROD/`;

console.log(keys);
console.log(Object.keys(keys));
process.stdin.setEncoding("utf8");

const data = "\nLearn Node.js with the help of well built Node.js Tutorial.";
 
// append data to file
fse.appendFile(SRC_DIR, data, 'utf8',
    // callback function
    function(err) {     
        if (err) throw err;
        // if no error
        console.log("Data is appended to file successfully.")
});

const runCopy = (srcDir, destDir) => {
  fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");
    }
  });
};

// Object.keys(keys).forEach(val => {
//     if(keys[`${val}`] === 'PROD') {
//         runCopy(SRC_DIR + val, DEST_DIR + val)
//     }
// })`
