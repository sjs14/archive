const path = require("path");
const fs = require("fs");
const { successMsg, warnMsg, mkdirPath } = require("./share");

const namePath = process.argv[2] || "custom-title";

const templatePath = path.resolve(__dirname, "../templates/slides.md"),
  targetPath = path.resolve(__dirname, `../slides/${namePath}.md`);
if (fs.existsSync(targetPath)) {
  warnMsg(`已存在文件： ${targetPath}`);
  process.exit();
}
const targetDir = path.dirname(targetPath);
// 防止新建的文件夹不存在
mkdirPath(targetDir);
fs.copyFileSync(templatePath, targetPath);
successMsg(`新增文件： ${targetPath}`);
