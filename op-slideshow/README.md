# slides项目说明 

## 项目结构说明
```
├─slideshow/             # slides（PPT）打包产物
├─slides/                   # slides（PPT）源码
├─pages/                    # slides 抽取出来的子页面，md文件
├─components/               # 自定义vue组件
├─public/                   # 静态资源，不能带中文路径
├─multipleEntry/            # 导航多个打包产物的vue项目，演示用
├─scripts/                  # 脚本
├─.gitignore
├─.npmrc
├─README.md                 # 项目说明
├─index.html                # 打包结果的index.html模板
├─netlify.toml
├─package.json
├─vercel.json
├─yarn.lock
```

## 命令说明

### 新增slides文件
```bash
pnpm run new [namePath]
```
namePath：可选，文件名，可以带路径信息，如`第一季度/vite编译原理`，默认为“custom-title”；

### 本地调试
```bash
pnpm run dev [namePath]
```
namePath：必填，文件名，可以带路径信息，如`第一季度/vite编译原理`

### 打包单个slides
```bash
pnpm run build [namePath]
```
namePath：必填，文件名，可以带路径信息，如`第一季度/vite编译原理`

### 打包所有的slides
```bash
pnpm run biuld:all
```
打包所有的slides，并生成入口html文件


## slides开发规范
1. 文件需要按照指定位置存放，如果没有对应位置存放，可以根据需求新建目录。新建的目录需要更新到`项目结构说明`中。
2. router模式选择hash


## 注意事项
1. 尽量少用格式化操作，因为每页开头的配置信息可能会错乱失效。


## TODO
1. 检查slides配置，减少无用且影响性能的配置