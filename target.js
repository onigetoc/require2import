// https://www.npmjs.com/package/edit-package-json
// https://stackoverflow.com/a/42407814/211324

// test only
const express = require('express');
const { something } = require("things");
const { something, anotherThing } = require('things');
var fuck = require("things")();
// test only end

const  math = require('simple-test-package');

var sum = math.sumNumbers(3, 5);