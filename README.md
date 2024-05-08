# require2import
require2import - Automatically transform Node.js require() to ES module imports
===============================================================================

**require2import** is a Node.js script that automatically transforms `require()` statements in JavaScript files to ES module `import` statements. This tool is designed to help developers migrate their existing Node.js projects to use ES modules instead of CommonJS modules.

Frustration with testing Node.js code
-------------------------------------

As a developer, I often found myself frustrated with the process of testing and running Node.js code, especially when compared to the ease of use and flexibility of Python. The need to constantly switch between the terminal and the code editor, create a package.json with everything right, manage dependencies, and handle various edge cases made the development workflow less efficient than I would have liked.

To address this issue, I decided to create a tool that would simplify the process of transforming `require()` statements to `import` statements in JavaScript files. This would allow me to more easily test and run my Node.js code, bringing it closer to the streamlined experience I was used to with Python.

require2import: Transforming require() to import
------------------------------------------------

**require2import** is a Node.js script that scans JavaScript files, identifies `require()` statements, and automatically transforms them into ES module `import` statements. This tool supports a wide range of `require()` usage patterns, including:

*   Basic `require()` statements
*   `require()` with property access
*   Destructured `require()` statements
*   Named imports from `require()`

The script can be used to transform individual files or entire directories, making it easy to migrate your existing Node.js projects to use ES modules.

### Installation

To use `require2import`, install it as a global npm package:

    npm install -g require2import 

### Usage

To transform a single file:

    require2import modify target.js 

To transform all JavaScript files in a directory:

    require2import modify src 

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

    # Transform all JavaScript files in the 'src' directory require2import modify src 

**Example 3: Transform a specific file in a directory**

    # Transform the 'target.js' file in the 'src' directory require2import modify src/target.js 

### Features

*   Supports a wide range of `require()` usage patterns
*   Can transform individual files or entire directories
*   Preserves comments and formatting in the transformed files
*   Provides clear and informative console output during the transformation process

### Links

*   [require2import on NPM](https://www.npmjs.com/package/require2import)
*   [require2import on GitHub](https://github.com/your-username/require2import)
