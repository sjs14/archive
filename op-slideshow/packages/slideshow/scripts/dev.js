const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const { warnMsg, errorMsg } = require("./share");

const namePath = process.argv[2];

if (!namePath) {
  warnMsg(`请指定slides，不需要后缀名。如 pnpm run dev 第一季度/vite编译原理 `);
  process.exit();
}

const targetPath = path.resolve(__dirname, `../slides/${namePath}.md`);

if (!fs.existsSync(targetPath)) {
  warnMsg(`文件： ${targetPath} 不存在`);
  process.exit();
}

const result = shell.exec(`npx slidev ${targetPath} --open`);

if (result.code !== 0) {
  errorMsg(`打包失败：${result.stderr}`);
  process.exit();
}
