#!/usr/bin/env node

import { exec } from 'child_process'
import fse from 'fs-extra'

const PATH = 'src/example-2'
const SRC_DIR = `./${PATH}.js`
const DEST_DIR = `./${PATH}.d.ts`
const fileName = PATH.substring(PATH.lastIndexOf('/') + 1)

process.stdin.setEncoding('utf8')

let keys
if (PATH) {
    keys = await import(SRC_DIR)
}

// exec('node ./test.js', function (error, stdOut, stdErr) {
//   console.log('do stuff')
// })

const updateJsFile = () => {
    //     let keys
    // if (PATH) {
    //     keys = await import(SRC_DIR)
    // }

    // const list = Object.keys(keys)

    const content = fse
        .readFileSync(SRC_DIR, 'utf8')
        .split(/\r?\n/)
        .map(sourceLine => {
            if (!sourceLine.includes('@type')) {
                return sourceLine
            }
        })
        .map(sourceLine => {
            const flag = Object.keys(keys)
                .filter(s => {
                    if (
                        sourceLine?.includes(s) &&
                        !sourceLine?.includes('export')
                    ) {
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

    fse.writeFileSync(SRC_DIR, content.join('\n'))
}

const createTsFile = () => {
    exec(
        `npx tsc ${PATH}.js --declaration --allowJs --emitDeclarationOnly`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`)
                return
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`)
                return
            }
            console.log(`stdout: ${stdout}`)
            updateJsFile()
        }
    )
}

if (fse.existsSync(DEST_DIR)) {
    console.log('Typescript file present.')
    fse.unlink(DEST_DIR, (error, stdOut, stdErr) => {
        console.log('Deleted Typescript file: ', DEST_DIR)
        // process.exit()
        createTsFile()
    })
} else {
    console.log('NO -- Typescript file present.')
    createTsFile()
}
