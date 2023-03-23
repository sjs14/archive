const fg = require("fast-glob");
const {
  build,
  getTitle,
  setLinkList,
  successMsg,
  errorMsg,
} = require("./share");

const list = fg.sync("slides/**/*.md");

let slidesData = [];
const successNames = [];
const errorNames = [];
for (let i = 0; i < list.length; i++) {
  const item = list[i];
  const name = item.replace("slides/", "").replace(".md", "");
  const res = build(item, name);
  if (res.code !== 0) {
    errorMsg(res.stderr);
    errorNames.push(name);
    continue;
  }
  successNames.push(name);
  slidesData.push({ name, title: getTitle(item) || name });
}

setLinkList(slidesData)

successMsg(`打包总数为${list.length}个，其中：`);
successMsg(
  `打包成功为${successNames.length}个${
    successNames.length > 0 ? "，分别是：\n" + successNames.join("、\n") : ""
  }；`
);
errorNames.length && errorMsg(
  `打包失败为${errorNames.length}个${
    errorNames.length > 0 ? "，分别是：\n" + errorNames.join("、\n") : ""
  }。`
);
