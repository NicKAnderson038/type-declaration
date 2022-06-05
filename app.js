#!/usr/bin/env node

import { exec } from 'child_process';

exec('node ./test.js', function (error, stdOut, stdErr) {
    // do what you want!
    console.log('stuff')
});