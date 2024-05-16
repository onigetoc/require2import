# require2import
Automatically transform Node.js require() to ES module imports
===============================================================================


**require2import** is a Node.js script that automatically transforms `require()` statements in JavaScript files to ES module `import` statements. This tool is designed to help developers migrate their existing Node.js projects to use ES modules instead of CommonJS modules.

![require2import screenshot](https://github.com/onigetoc/require2import/blob/main/src/require2import3.gif?raw=true)

### Features

*   Supports a wide range of `require()` usage patterns
*   Can transform individual files or entire directories
*   Preserves comments and formatting in the transformed files
*   Provides clear and informative console output during the transformation process

Frustration with testing Node.js code before
-------------------------------------

As a developer, I often found myself frustrated with the process of testing and running Node.js code, especially when compared to the ease of use and flexibility of Python. Creatint a package.json with everything right inside, manage dependencies, and handle various edge cases made the development workflow less efficient than I would have liked. Now, you can simply copy code from a library or documentation somewhere, drop a JavaScript file and convert it to ES modules if needed - and it just works (except if the npm module does not function properly ;[ ).

To address this issue, I decided to create a tool that would simplify the process of transforming `require()` statements to `import` statements in JavaScript files. This would allow me to more easily test and run my Node.js code, bringing it closer to the streamlined experience I was used to with Python.

The require2import module was not created for large-scale projects, but rather to quickly test code snippets, experiment with Node.js libraries, and simplify the development workflow. While it can handle the conversion of entire directories of JavaScript files, transforming all require() statements to import statements, its primary use case is for small-scale testing and prototyping.
The motivation behind this tool was to bring the streamlined experience of Python development to the Node.js ecosystem. By automating the process of migrating from CommonJS modules to ES modules, require2import allows developers to more easily test and run their Node.js code, without the constant need to switch between the terminal and the code editor, manage dependencies, and handle various edge cases.
So while require2import can be used for batch conversions of entire directories, its true strength lies in its ability to quickly transform individual files or small sets of files, enabling developers to rapidly iterate and experiment with different Node.js libraries and techniques.

Install the require2import module as a development dependencies (devDependencies) rather than a production dependencies unless you have a specific need to include it in the production environment. The require2import module is designed to simplify the process of migrating Node.js projects from CommonJS modules to ES modules, which is a development-specific task.

### Why?
I found that testing and running Node.js code was often more complex and time-consuming compared to the ease of use and flexibility I experienced when working with Python (i'm just a beginer with Python). For example, I was able to quickly test a PDF to text converter using Python libraries in like 2 minutes, but struggled for over an hour to get the equivalent working in Node.js with its dependencies and if it's require to finnally find the way to do it. 
You may have to modify the code example or snippet to make it work like addind 'async' 'await', 'promise' or others stuffs to make your modification compatible with your settings environment.

require2import: Transforming require() to import
------------------------------------------------

**require2import** is a Node.js script that scans JavaScript files, identifies `require()` statements, and automatically transforms them into ES module `import` statements. This tool supports a wide range of `require()` usage patterns, including:

*   Basic `require()` statements
*   `require()` with property access
*   Destructured `require()` statements
*   Named imports from `require()`

The script can be used to transform individual files or entire directories, making it easy to migrate your existing Node.js projects to use ES modules.
For now it will only convert .js file extension.

### Installation

To use `require2import`, installing packages locally:

    npm install require2import 

installing packages globally::

    npm install -g require2import

### Usage require2import (Short cut use require2import)

To transform a single js file (require to import ES). The target.js is the file ton convert for ES:

    require2import target.js

To transform all JavaScript files in a directory ex: src :

    require2import src 

Try this from the examples folder to test this file and check the console.log:

    node src/sum.js // it will not work
    require2import src/sum.js // The file: src/sum.js has been modified successfully
    node src/sum.js // now it's working and the console.log will show the result '8'

Some example test i did to see if it's worked and helped me to create this projet.
Do not forget to the path example folder to try and test it and change or add `"type": "module"` in your project package.json to allow modules import.

    cd examples


The script will automatically detect and transform all `require()` statements in the specified files or directories, replacing them with the appropriate `import` statements.

### Examples

**Example 1: Transform a single file**

**Before:**
const fs = require('fs');
const path = require('path');

**After:**
import fs from 'fs';
import path from 'path';


**Example 2: Transform a directory**

    # Transform all JavaScript files in the 'src' directory require2import require2importsrc 

**Example 3: Transform a specific file in a directory**

    # Transform the 'target.js' file in the 'src' directory require2import require2importsrc/target.js 

**Examples folder**

    *  Transform the 'target.js' file in the 'src' directory require2import require2importsrc/target.js 

**For issues, requiest query, bug or bad convertion**
*   issues
*   [Issues](https://github.com/onigetoc/require2import/issues))


### Links

*   [require2import on NPM](https://www.npmjs.com/package/require2import)
*   [require2import on GitHub](https://github.com/your-username/require2import)
