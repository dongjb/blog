---
title: 通过nrm管理npm源
date: 2020-07-09 14:10:17
tags:
  - 环境搭建
  - npm
  - nrm
  - node
categories:
  - 环境搭建
---

## 通过 nrm 管理 npm 源

1. 安装 nrm 包

```bash
npm i -g nrm
```

2. 查看可使用的 npm 源

```bash
nrm ls

* npm -------- https://registry.npmjs.org/ # 当前正在使用的npm源
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
* taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
```

3. 切换 npm 源

```bash
nrm use npm

nrm ls

  npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
* taobao ----- https://registry.npm.taobao.org/ # 当前正在使用的npm源
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
```

正在使用的 npm 源已经从`npm`切换到`taobao`官方源了，这样后面我们使用`npm install`安装依赖包的时候就会从`taobao`提供的源上去下载，而不会从 npm 官方去下载了，会大大的提升我们下载依赖包的速度。

4. 添加自定义源

每个公司都有自己的业务组件、工具，这些都是私密的，我们不希望发布公有 npm 源上，这个我们就可以自己搭建一个私有的 npm 源，将公司私有的包发布到私有 npm 源上。

后面会介绍如何通过`verdaccio`来搭建一个私有的 npm 源。

当我们搭建了一个私有的源时，我们就可以将私有源添加到 nrm 中来管理：

```bash
# npm add [源名] [源地址]

npm add seentao http://106.52.253.99:8000/

nrm ls

  npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
* taobao ----- https://registry.npm.taobao.org/ # 当前正在使用的npm源
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
  seentao ---- http://106.52.253.99:8000/ # 自定义源
```

如上，我添加了一个自定义源，后面我就可以通过`nrm use seentao`来使用自定义源，这样我们安装依赖包时就会去我们的自定义 npm 源上去下载。

<!-- 下一期会介绍如何[通过 verdaccio 搭建私有 npm](./1594623615000.md) -->
