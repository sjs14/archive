const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const app = new Koa();

const compilerSFC = require("@vue/compiler-sfc");
const compilerDOM = require("@vue/compiler-dom");

app.use(async (ctx) => {
  const { path: url, query } = ctx.request;
  //   console.log(`🚀  url`, url);
  if (url === "/") {
    ctx.type = "text/html";
    ctx.body = fs.readFileSync("./index.html", "utf8");
  } else if (path.extname(url) === ".js") {
    const p = path.join(__dirname, url);
    const code = fs.readFileSync(p, "utf8");

    ctx.type = "application/javascript";
    ctx.body = rewriteImport(code);
  } else if (url.startsWith("/@modules/")) {
    // 模块名称
    const moduleName = url.replace("/@modules/", ""); // vue
    // node_modules中的目录
    const prefix = path.join(__dirname, `node_modules`, moduleName);
    const module = require(path.join(prefix, "package.json")).module;
    const filePath = path.join(prefix, module);
    const code = fs.readFileSync(filePath, "utf8");
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(code);
  }
  // 分两个步骤，先解析script标签的内容，再解析template的内容，最终生成如下的结构：
  // const _sfc_main = {
  //   setup() {},
  //   render() {},
  // };
  // export default _sfc_main;
  else if (path.extname(url) === ".vue") {
    const p = path.join(__dirname, url);
    const ret = compilerSFC.parse(fs.readFileSync(p, "utf8"),{
        filename:'1231.vue',
    });
    console.log(ret.descriptor);
    if (!query.type) {
     

      const scriptContent = ret.descriptor.script.content;
      const script = scriptContent.replace(
        "export default ",
        "const _sfc_main = "
      );
      ctx.type = "application/javascript";
      
      ctx.body = `
          ${rewriteImport(script)}
            import { render } from "${url}?type=template"

          _sfc_main.render = render;


          const style = document.createElement('style');
          style.innerHTML = "${(ret.descriptor.styles[0].content.replace(/ /g,'').replace(/\n/g,''))}";
    
          document.querySelector('head').appendChild(style);


          export default _sfc_main
        `;
    } else if (query.type === "template") {
      const templateContent = ret.descriptor.template.content;
      const code = compilerDOM.compile(templateContent, {
        mode: "module",
        
      }).code;
      ctx.type = "application/javascript";
      ctx.body = rewriteImport(code);
    }
  }
});

function rewriteImport(code) {
  return code.replace(
    / from ['"](.*)['"]/g,
    /**
     * @param {*} s1 正则匹配的内容
     * @param {*} s2 小括号匹配的内容
     * @returns 替换后的内容
     */
    (s1, s2) => {
      if (s2.startsWith("./") || s2.startsWith("../") || s2.startsWith("/")) {
        return s1;
      } else {
        return ` from '/@modules/${s2}'`;
      }
    }
  );
}

app.listen(5173, () => {
  console.log("fdd-vite startup!");
  console.log("http://localhost:5173\n");
});
