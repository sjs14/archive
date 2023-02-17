// https://astexplorer.net/
import { resolve } from "path";
import fs from "fs";
import { parse } from "@babel/parser"; // js -> ast
import traverse from "@babel/traverse"; // 遍历ast
import generate from "@babel/generator"; // ast -> js

const baseUrl = "/ast-change";
const code = fs
  .readFileSync(resolve(process.cwd(), "demo/sourceCode.js"))
  .toString();

// 将源代码转换为AST
const ast = parse(code, { sourceType: "module" });

// 遍历AST
traverse(ast, {
  enter(path) {
    if (path.isImportDeclaration()) {
      const module = path.node.source.value;
      if (
        module.indexOf("./") !== 0 &&
        module.indexOf("../") !== 0 &&
        module.indexOf("/") !== 0
      ) {
        // 裸模块路径重写
        const modulePath = resolve(process.cwd(), `node_modules/${module}`);
        const moduleEntry = require(`${modulePath}/package.json`);
        path.node.source.value = `${baseUrl}/node_modules/${module}/${
          moduleEntry.module || moduleEntry.main
        }`;
      }
    }
  },
});

// 生成代码 <- ast
const output = generate(ast, code);

fs.writeFileSync(
  resolve(process.cwd(), "demo/sourceCode-change.js"),
  output.code
);
