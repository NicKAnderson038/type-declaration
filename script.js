#!/usr/bin/env node

import { exec } from 'child_process'
import fse from 'fs-extra'
const NODE_ENV = process.env.NODE_ENV
console.log(NODE_ENV)

const SRC_DIR = `./${NODE_ENV}.js`
const DEST_DIR = `./${NODE_ENV}.d.ts`
const fileName = NODE_ENV.substring(NODE_ENV.lastIndexOf('/') + 1)

process.stdin.setEncoding('utf8')

let keys
if (PATH) {
    keys = await import(SRC_DIR)
}

const updateJsFile = () => {
    const content = fse
        .readFileSync(SRC_DIR, 'utf8')
        .split(/\r?\n/)
        .map(sourceLine => {
            const flag = Object.keys(keys)
                .filter(s => {
                    console.log(sourceLine, s)
                    if (
                        sourceLine.includes(s) &&
                        !sourceLine.includes('export')
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

const cleanJsFile = async () => {
    const content = await fse
        .readFileSync(SRC_DIR, 'utf8')
        .split(/\r?\n/)
        .map(sourceLine => {
            if (!sourceLine.includes('@type')) {
                return sourceLine
            }
        })
        .filter(sourceLine => sourceLine !== undefined)
    // fse.writeFileSync(SRC_DIR, content.join('\n'))
    await fse.writeFile(SRC_DIR, content.join('\n'), (err, result) => {
        if (err) console.log('error', err)
        else
            fse.unlink(DEST_DIR, (error, stdOut, stdErr) => {
                console.log('Deleted Typescript file: ', DEST_DIR)
                createTsFile()
            })
    })
}

if (fse.existsSync(DEST_DIR)) {
    console.log('Typescript file present.')
    cleanJsFile()
} else {
    console.log('NO -- Typescript file present.')
    createTsFile()
}
