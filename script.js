#!/usr/bin/env node
const NODE_ENV = process.env.NODE_ENV
console.log(NODE_ENV)
import fse from 'fs-extra'

let keys
if (NODE_ENV) {
  keys = await import(`./${NODE_ENV}.js`)
}
// import * as keys from './src/example-2';
const SRC_DIR = `./${NODE_ENV}.js`
const fileName = NODE_ENV.substring(NODE_ENV.lastIndexOf('/') + 1)
// const DEST_DIR = `./src/ENV/PROD/`;

const list = Object.keys(keys)
process.stdin.setEncoding('utf8')

const content = fse
  .readFileSync(SRC_DIR, 'utf8')
  .split(/\r?\n/)
  .map(sourceLine => {
    // sourceLine = sourceLine.trim()
    if (!sourceLine.includes('@type')) {
      return sourceLine
    }
  })
  .map(sourceLine => {
    // sourceLine = sourceLine.trim();
    // console.log(
    //   i,
    //   list
    //     .filter((s) => {
    //       if (sourceLine.includes(s) && !sourceLine.includes("export")) {
    //         return s;
    //       }
    //     })
    //     .pop(),
    //   sourceLine
    // );

    const flag = list
      .filter(s => {
        console.log('CHECK: ', sourceLine)
        if (sourceLine.includes(s) && !sourceLine.includes('export')) {
          return s
        }
      })
      .pop()

    if (flag !== undefined) {
      const check = `/** @type {import('./${fileName}').${flag}} */`
      return [check, sourceLine]
    }

    return sourceLine
  })
  .flat()
console.log(content)
fse.writeFileSync(SRC_DIR, content.join('\n'))
