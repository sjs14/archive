const path = require("path");
const {
  isExist,
  build,
  getTitle,
  setLink,
  getRootDir,
  warnMsg,
  successMsg,
  errorMsg,
  getDistDir,
} = require("./share");

if (!isExist(path.resolve(getDistDir(), "arena"))) {
  warnMsg("暂未打包预览项目，请先执行 pnpm run build:arena ！");
  process.exit();
}

const namePath = process.argv[2] || "";
const name = namePath.split("/").at(-1);
// md绝对路径
const mdAp = path.resolve(
  getRootDir(),
  `packages/slideshow/slides/${namePath}.md`
); 
if(!namePath){
  warnMsg("请指定需要打包的slides，如 pnpm run build 第一季度/vite编译原理 ");
  process.exit()
}else if(!isExist(mdAp)){
  warnMsg(`文件 ${mdAp} 不存在`);
  process.exit()
}else{
  const res = build(`slides/${namePath}.md`, namePath);

  if (res.code !== 0) {
    errorMsg(`打包失败：${res.stderr}`);
    return;
  }
  setLink(namePath, getTitle(mdAp) || name);
  successMsg("打包成功");
}