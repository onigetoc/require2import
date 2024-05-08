/** regex in transformRequireToImport from https://github.com/knowbee/rona/blob/master/lib/rona.js with the help of Perplexity.ai for all the code and adaptation */
// with VS Code : https://umaar.com/dev-tips/222-vs-code-convert-es-import/
import fs from 'fs';
import path from 'path';

async function require2import() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    await modifyDirectory('.');
  } else {
    for (const arg of args) {
      const targetPath = path.join(process.cwd(), arg);
      if (await fs.promises.stat(targetPath)) {
        if ((await fs.promises.stat(targetPath)).isFile()) {
          await modifyFile(targetPath);
        } else {
          await modifyDirectory(arg);
        }
      } else {
        console.error(`Le chemin ${arg} n'existe pas.`);
      }
    }
  }
}

async function modifyFile(filePath) {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const transformedContent = await transformRequireToImport(fileContent);
    await fs.promises.writeFile(filePath, transformedContent);
    console.log(`The file: ${filePath} has been modified successfully.`)
  } catch (err) {
    console.error(`Erreur lors de la modification du fichier ${filePath}:`, err);
  }
}

async function modifyDirectory(directory) {
  try {
    const dirPath = path.join(process.cwd(), directory);
    const files = await fs.promises.readdir(dirPath);
    for (const file of files) {
      if (file.endsWith('.js')) {
        await modifyFile(path.join(dirPath, file));
      }
    }
    console.log(`Tous les fichiers JavaScript dans le répertoire ${directory} ont été modifiés avec succès!`);
  } catch (err) {
    console.error(`Erreur lors de la modification des fichiers dans le répertoire ${directory}:`, err);
  }
}

async function transformRequireToImport(code) {
  const re_general = /^[ \t]*(?<what_to_import_full>(?:const|let|var)\s+(?<what_to_import>{?[\s\w,:]+}?)\s*=)?\s*require\s*\(\s*['"](?<module>.*?)['"]\s*\)(?:\.(?<module_property_access>\w+)?)?(?<call_of_module_or_property>\(\))?[ \t]*;?(?:[ \t]*|(?<trailing_comment>[ \t]*(?:\/\/.*|\/\*.*\*\/[ \t]*)))$/gim;
  const converted_text = code.replace(
    re_general,
    (match, p1, p2, p3, p4, p5, p6, offset, string, groups) => {
      const {
        what_to_import,
        module,
        module_property_access,
        call_of_module_or_property,
        trailing_comment,
      } = groups;
      const what_to_import_obj = parse_what_to_import(what_to_import);
      if (what_to_import_obj === null) {
        return match;
      }
      let converted_js_text = (() => {
        if (what_to_import_obj.type === "empty") {
          return `import "${module}";`;
        } else if (what_to_import_obj.type === "scalar") {
          if (!module_property_access && !call_of_module_or_property) {
            return `import * as ${what_to_import_obj.import_module_as} from "${module}";`;
          } else if (module_property_access && !call_of_module_or_property) {
            return `import { ${module_property_access} as ${what_to_import_obj.import_module_as} } from "${module}";`;
          } else if (!module_property_access && call_of_module_or_property) {
            return `import * as ${what_to_import_obj.import_module_as} from "${module}";`;
          } else if (module_property_access && call_of_module_or_property) {
            return `import { ${what_to_import_obj.import_module_as} } from "${module}";`;
          }
        } else if (what_to_import_obj.type === "names") {
          const import_names_str = Object.keys(what_to_import_obj.names)
            .map((name) => {
              const alias = what_to_import_obj.names[name];
              return name + (alias ? ` as ${alias}` : "");
            })
            .join(", ");
          return `import { ${import_names_str} } from "${module}";`;
        }
        return null;
      })();
      if (converted_js_text === null) {
        return match;
      }
      return trailing_comment
        ? converted_js_text + trailing_comment
        : converted_js_text;
    }
  );

  return converted_text;
}


/**
 * @param {string} what_to_import
 * @returns {{"type": "empty"}|{"type": "scalar", import_module_as: string }|{"type": "names", names: Record<string, string|null>}|null}
 *
 * Returns null if the string doesn't look like valid js, otherwise a parsed
 * form of it.
 *
 * Examples:
 *
 * when what_to_import is:
 *   "" i.e. from `require("module");`
 *     then we return: { "type": "empty" }
 *
 * when what_to_import is:
 *   "thing" i.e. from `const thing = require("module");`
 *     then we return: { "type": "scalar", importModuleAs: "thing" }
 *
 * when what_to_import is:
 *   "{ widget, color: renameColor, size }" i.e. from `const { widget, color: renameColor, size } = require("module");
 *     then we return: { "type": "names", names: { widget: null, color: "renameColor", size: null }}
 */
function parse_what_to_import(what_to_import) {
  if (!what_to_import || /^\s*$/.test(what_to_import)) {
    return { type: "empty" };
  }
  let re_begin_curly = /^\s*{/i;
  let re_end_curly = /}\s*$/i;
  let curly_braces_found = false;
  if (
    re_begin_curly.test(what_to_import) &&
    re_end_curly.test(what_to_import)
  ) {
    curly_braces_found = true;
    what_to_import = what_to_import
      .replace(re_begin_curly, "")
      .replace(re_end_curly, "");
  }
  if (/[{}]/.test(what_to_import)) {
    return null;
  }
  if (curly_braces_found) {
    try {
      what_to_import = what_to_import.replace(/\s+/g, "");
      return {
        type: "names",
        names: what_to_import
          .split(/,/g)
          .map((tok) => {
            if (/^\s*$/.test(tok)) {
              return null;
            }
            const nameAndAlias = tok.split(/:/g);
            if (nameAndAlias.length > 2) {
              throw new Error(`more than one ':'`);
            }
            const name = nameAndAlias[0],
              alias = nameAndAlias.length === 2 ? nameAndAlias[1] : null;
            return {
              [name]: alias,
            };
          })
          .reduce((accumulator, current_value) => {
            if (current_value) {
              return {
                ...accumulator,
                ...current_value,
              };
            } else {
              return accumulator;
            }
          }, {}),
      };
    } catch (err) {
      return null;
    }
  } else {
    what_to_import = trim_edges(what_to_import);
    if (/\W/.test(what_to_import)) {
      return null;
    }
    return {
      type: "scalar",
      import_module_as: what_to_import,
    };
  }
}

function trim_edges(str) {
  return str.replace(/^\s+/, "").replace(/\s+$/, "");
}

// Appel de la fonction main()
// main();
// Exportation du module
export default require2import;
