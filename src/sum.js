// https://www.npmjs.com/package/edit-package-json
// https://stackoverflow.com/a/42407814/211324

// var math = require('simple-test-package'); // ORIGINAL: Import type require
var math = require('simple-test-package'); // Import type module

const sum = math.sumNumbers(3, 5);

console.log('result: '+sum); // 8 