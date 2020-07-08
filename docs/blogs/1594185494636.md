---
title: 通过nvm管理node版本
date: 2020-07-08 13:18:14
tags:
  - node
  - nvm
  - npm
categories:
  - 环境搭建
---

## 使用 nvm 管理 node 版本

1. 安装 nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

2. 安装 node

```bash
nvm install [version]

# nvm install v12.18.0
```

3. 卸载安装的 node

```bash
nvm uninstall [version]

# nvm uninstall v12.18.0
```

4. 查看本机已安装的 node 版本

```bash
nvm ls

# v8.11.4
# v10.16.0
# v12.16.1
# -> v12.18.0
# default -> 12.18.0 (-> v12.18.0)
```

可以看到我的电脑上安装了好几个 node 版本，当前默认 node 版本是 v12.18.0

5. 指定默认 node 版本

```bash
nvm alias default v12.16.1

nvm ls

# v8.11.4
# v10.16.0
# v12.16.1
# -> v12.18.0
# default -> v12.16.1
```

这样，默认版本就切换到 v12.16.1，如果只是想暂时使用下其他版本 node，可以主动切换到指定版本 node，这并不会将其设置为默认 node 版本。

6. 切换指定 node 版本

```bash
nvm use [version]

# nvm use v12.16.1

# v8.11.4
# v10.16.0
# -> v12.16.1
# v12.18.0
# default -> v12.18.0
```

就这样，当前 node 版本已经切换到 v12.16.1 了，可以看到，默认版本的 node 仍然是 v12.18.0。当终端页签被关闭时，此次设置的 node 版本也就失效了，即只作用于当前终端页签。

7. 查看远端可安装的 node 版本

```bash
nvm ls-remote

# 这个列表比较多，就不粘贴过来了，可以自己尝试看看
```

::: tip
需要注意的是，当我们安装了一个新版本 node 时，之前 node 版本安装的全局依赖并不会随之安装，也就安装了新版本 node，所有的全局依赖都需要重新安装，好在 nvm 为我们提供了拷贝安装功能，让我们可以将之前的版本全局依赖重新安装
:::

8. 安装新版本 node 拷贝之前 node 版本的所有全局依赖

这里拷贝的只是包名，还是需要重新全部安装的，只是不需要我们自己再手动的一个个安装了

```bash
nvm install [version] --reinstall-packages-from=<version>

# nvm install v12.18.0 --reinstall-packages-from=v12.16.1
```
