const fs = require("fs");
const path = require("path");
const { normalizePath } = require("vite");
const shell = require("shelljs");
const chalk = require("chalk");
const { JSDOM } = require("jsdom");
// 常量
const constants = {
  RESULT_DIR: "slideshow",
};

/**
 * 打包单个slidev
 * @param {*} slidevPath slidev路径
 */
function build(slidevPath, namePath) {
  // 因为打包时，slidev只能在项目根目录，不然找不到静态资源，所以做了拷贝文件操作
  const sourcePath = path.resolve(process.cwd(), slidevPath);
  const targetFilename = slidevPath.split("/").pop();
  const copyPath = path.resolve(process.cwd(), targetFilename);
  shell.cp(sourcePath, copyPath);
  const distDir = getDistDir();
  const curBuildDir = `${constants.RESULT_DIR}/${namePath}`;
  const curBuildPath = `${distDir}/${curBuildDir}`;
  const result = shell.exec(
    `npx slidev build ${targetFilename} --base ./ --out ${curBuildPath}`
  );
  shell.exec(
    `npx slidev export ${targetFilename} --output ${curBuildPath}/${namePath.split('/').pop()}`
  );
    
  // 打包完删除
  shell.rm(copyPath);
  return result;
}

/**
 * 获取slidev标题
 * @param {*} slidevPath slidev路径
 * @returns {string} slidev标题
 */
function getTitle(slidevPath) {
  slidevPath = normalizePath(slidevPath);
  const title = slidevPath.match(/([^\/]*)\.md$/)?.[1];
  return title ? title.trim() : "";
}

function getRootDir() {
  const rootDir = path.resolve(process.cwd(), "../..");
  return `${rootDir}`;
}

function getDistDir() {
  return `${getRootDir()}/dist`;
}

/**
 * 生成单个菜单项的dom文本
 * @param {*} link 跳转链接
 * @param {*} title slidev标题
 * @returns
 */
function genLinkDomStr(link, title) {
  const templateHtml = path.resolve(__dirname, "../index.html"),
    htmlStr = fs.readFileSync(templateHtml);
  const dom = new JSDOM(htmlStr);
  const templateLinkDom = dom.window.document.querySelector(".links .link");
  templateLinkDom.setAttribute("link", link);
  templateLinkDom.innerHTML = title;
  return templateLinkDom.outerHTML;
}

/**
 * 设置单个菜单，如果标题已存在则更新，否则追加
 * @param {*} link 链接
 * @param {*} name slides的名称路径
 */
function setLink(name, title) {
  const linkDataPath = path.resolve(
    getDistDir(),
    constants.RESULT_DIR,
    "linkData.js"
  );

  const linkDataStr = isExist(linkDataPath)
    ? fs.readFileSync(linkDataPath, "utf8")
    : "[]";

  const linkArr = linkDataStr
    ? JSON.parse(
        linkDataStr.replace(/window.linkData[ ]*=[ ]*/, "").replace(";", "")
      )
    : [];
  const namePieces = name.split("/");

  let currentArr = linkArr;

  namePieces.forEach((piece, index) => {
    if (index !== namePieces.length - 1) {
      let target = currentArr.find((curChild) => curChild.title === piece);
      if (!target) {
        target = {
          title: piece,
          children: [],
        };
        currentArr.push(target);
      }
      currentArr = target.children;
    } else {
      const newObj = {
        link: `../slideshow/${name}/index.html`,
        title: title,
      };

      let target = currentArr.find((curChild) => curChild.link === newObj.link);

      if (target) {
        Object.keys(newObj).forEach((key) => {
          target[key] = newObj[key];
        });
      } else {
        currentArr.push(newObj);
      }
    }
  });
  writeLinkData(`window.linkData = ${JSON.stringify(linkArr, null, 2)}`);
}

/**
 * 生成导航数据
 * @param {array} slidesData 菜单列表的dom文本
 */
function setLinkList(slidesData) {
  const arr = [];

  slidesData.forEach((item) => {
    const namePieces = item.name.split("/");

    let currentArr = arr;

    namePieces.forEach((piece, index) => {
      if (index !== namePieces.length - 1) {
        let target = currentArr.find((curChild) => curChild.title === piece);

        if (!target) {
          target = {
            title: piece,
            children: [],
          };
          currentArr.push(target);
        }
        currentArr = target.children;
      } else {
        currentArr.push({
          link: `../slideshow/${item.name}/index.html`,
          title: item.title,
        });
      }
    });
  });

  writeLinkData(`window.linkData = ${JSON.stringify(arr, null, 2)}`);
}

function writeLinkData(str) {
  fs.writeFileSync(
    path.resolve(getDistDir(), `${constants.RESULT_DIR}/linkData.js`),
    str
  );
}

function isExist(filePath) {
  return !!filePath && fs.existsSync(filePath);
}

function mkdirPath(_path) {
  _path = normalizePath(_path);
  const cwdPath = normalizePath(process.cwd());
  const newPath = _path.replace(`${cwdPath}/`, "");
  const pathPieces = newPath.split("/");
  pathPieces.reduce((cwdPath, piece, index) => {
    const dir = `${cwdPath}/${piece}`;
    const isExist = fs.existsSync(dir);
    if (!isExist) {
      fs.mkdirSync(dir);
    }
    cwdPath += `/${piece}`;
    return cwdPath;
  }, cwdPath);
}

function warnMsg(msg) {
  if (!msg) return;
  console.log(chalk.hex("#FFA500")(msg));
}

function errorMsg(msg) {
  if (!msg) return;
  console.log(chalk.bold.red(msg));
}

function successMsg(msg) {
  if (!msg) return;
  console.log(chalk.bold.green(msg));
}

module.exports = {
  ...constants,
  build,
  getTitle,
  genLinkDomStr,
  setLink,
  setLinkList,
  isExist,
  mkdirPath,
  getRootDir,
  getDistDir,
  warnMsg,
  errorMsg,
  successMsg,
};
