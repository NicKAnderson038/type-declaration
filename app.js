#!/usr/bin/env node

import { exec } from 'child_process'
import fse from 'fs-extra'

const PATH = 'src/example-2'

// exec('node ./test.js', function (error, stdOut, stdErr) {
//   console.log('do stuff')
// })

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
        }
    )
}

if (fse.existsSync(`${PATH}.d.ts`)) {
    console.log('Typescript file present.')
    fse.unlink(`${PATH}.d.ts`, (error, stdOut, stdErr) => {
        console.log(error)
        console.log(stdOut)
        console.log(stdErr)
        // process.exit()
        createTsFile()
    })
} else {
    console.log('NO -- Typescript file present.')
    createTsFile()
}
