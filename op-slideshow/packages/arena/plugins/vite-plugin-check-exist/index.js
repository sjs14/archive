import path from "path";
import fs from "fs";
import chalk from "chalk";

export default () => {
  return {
    name: "vite-plugin-check-exist",
    enforce: "pre",
    config() {
      const linkDataBuildPath = path.resolve(
        process.cwd(),
        "../../dist/arena/linkData.json"
      );
      const isBuild = process.argv[2] === "build";
      const isForce = process.argv[3] === "--force" || process.argv[3] === "-f";
      if (isBuild && fs.existsSync(linkDataBuildPath)) {
        if (!isForce) {
          console.log(
            chalk.hex("#FFA500")(
              `${linkDataBuildPath} 已存在\n重新打包会清空导航内容，请确认并运行 pnpm run build:arena --force `
            )
          );
          process.exit();
        }
      }
    },
  };
};
