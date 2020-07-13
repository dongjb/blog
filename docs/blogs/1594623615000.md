---
title: 使用verdaccio搭建公司私有npm仓库
date: 2020-07-13 15:00:15
tags:
  - 环境搭建
  - verdaccio
  - npm
  - nrm
  - node
categories:
  - 环境搭建
---

## 使用 nvm 管理 node 版本

[使用 nvm 管理 node 版本](./1594185494636.md)

## 使用 nrm 管理 npm 源

[使用 nrm 管理 npm 源](./1594275017000.md)

## 全局安装 verdaccio

[文档地址](https://verdaccio.org/docs/zh-CN/installation)

```bash
npm i -g verdaccio
```

#### 更改 verdaccio 配置

1. verdaccio 安装成功配置文件位于 `~/.config/verdaccio/config.yaml`

```
#
# This is the default config file. It allows all users to do anything,
# so don't use it on production systems.
#
# Look here for more config file examples:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

# path to a directory with all packages
storage: ./storage
# path to a directory with plugins to include
plugins: ./plugins

web:
  title: Verdaccio
  # comment out to disable gravatar support
  # gravatar: false
  # by default packages are ordercer ascendant (asc|desc)
  # sort_packages: asc
  # convert your UI to the dark side
  # darkMode: true

# translate your registry, api i18n not available yet
# i18n:
# list of the available translations https://github.com/verdaccio/ui/tree/master/i18n/translations
#   web: en-US

auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    # max_users: 1000

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org
  taobao:
    url: https://registry.npm.taobao.org/

packages:
  '@seentao/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish/publish packages
    # (anyone can register by default, remember?)
    # publish: $authenticated
    # unpublish: $authenticated

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: taobao

# You can specify HTTP/1.1 server keep alive timeout in seconds for incoming connections.
# A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.
# WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.
server:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# log settings
logs:
  - { type: stdout, format: pretty, level: http }
  #- {type: file, path: verdaccio.log, level: info}
#experiments:
#  # support for npm token command
#  token: false

# This affect the web and api (not developed yet)
#i18n:
#web: en-US

listen:
  0.0.0.0:8000
```

2. 重点参数

**storage**

配置发布到私有仓库包的存放地址，默认存放于`~/.config/verdaccio/storage`中，后期我们自己开发的私有包或者从公有包下载的依赖都会存放于这个目录下。

**uplinks**

也许，我们的包不止发布到了一个仓库，如果公司按照业务线划分了几个前端部门，部门之间技术独立但能共享，这时如果我们想在使用自己发布的 npm 私有包的同时，还期望可以使用其他团队开发的 npm 包，这时我们就可以通过指定该参数实现。换句话说，npm 公有仓库也能理解为我们的另一个仓库，像这样的仓库还有淘宝的仓库等。配置如下，在这里其实只是做一个定义，真正的使用其实是在包 packages 管理的参数中。

```
uplinks:
  npmjs:
    url: https://registry.npmjs.org
  taobao:
    url: https://registry.npm.taobao.org
```

**packages**

该参数是整个配置中最为重要的一个，因为通过配置该参数，能达到设定包权限，设定包发布与使用的权限，设置包是否代理到公有 npm 仓库等

```bash
packages:
  '@seentao/*':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
  '**':
    access: $all
    # publish: $authenticated
    # unpublish: $authenticated
    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: taobao
```

上述配置：

- 约定名称是以`@seentao`前缀开头的就是私有包，这里的名称指的是 package.json 中的 name 字段。
- 如果不是以`@seentao`就会走上述`**`字段配置逻辑，当然我这里配置是不允许发布或取消发布，只允许拉取，proxy 指向了 taobao，表示从 taobao 上拉取公有包，并且会将拉取下来的公有包缓存在前面指定的 storage 文件中，下次我们再下载相同的依赖，就会直接下载，不会再去 taobao 上下载。

**listen**

指定启动端口号

```bash
listen:
  0.0.0.0:8000
```

## 使用 pm2 管理我们的 node 服务

1. 安装 pm2

```bash
npm i -g pm2
```

2. 查看 pm2 管理的 node 服务

```bash
pm2 list
```

3. 启动 node 服务、停止 node 服务

```bash
pm2 start verdaccio

pm2 stop verdaccio
```

4. 其他命令请自行研究

[github 地址](https://github.com/Unitech/pm2)

## 启动 verdaccio 服务

```bash
pm2 start verdaccio
```

此时我们可以去访问[http://106.52.253.99:8000/](http://106.52.253.99:8000/)

# 客户端（自己的电脑）

同样的道理，我们也可以在电脑上安装 nvm、nrm，指定使用的 node 版本，npm 源，在本机上将 npm 源指向我们自己搭建的服务，即添加自定义源，将地址指向搭建的服务

```bash
# 添加自定义源
nrm add seentao http://106.52.253.99:8000/

# 使用自定义源
nvm use seentao
```

这样我们在本机安装依赖包时就会从我们自己搭建的服务上去下载了，如果我们自己搭建的服务上没有这个包，就会去服务器设置的 npm 源上去下载，并且会缓存在我们的服务上。
以后我们再次安装的时候就会直接从我们服务下载，不会去线上源拉取，因为服务里已经有了。

缓存位置`~/.config/verdaccio/storage/`目录下

## 开发私有 npm 包

1. 创建工程目录

```bash
mkdir @seentao/utils && cd @seentao/utils
```

2. 创建 package.json 文件

```bash
npm init
```

3. 创建`README.md` 项目说明文档
4. 创建入口文件 `index.js`

示例：

```
@seentao-utils
├── README.md
├── index.js
└── package.json
```

## 发布私有包到我们之前搭建的服务上

1. 添加用户

- 在这之前一定要确保本机使用的 npm 源已经指向到我们自己的服务，可通过`nrm ls`查看后使用或者直接指向`nrm use seentao`
- 注意项目中 package.json 文件中的 name 字段，这个名称不要与已有的包冲突

```bash
npm adduser
```

随后会让你输入用户、密码、邮箱

2、发布

在项目下使用`npm publish`发布，发布完成之后去访问之前搭建的服务`http://106.52.253.99:8000/`中查看

[npm 发布包教程参考](https://segmentfault.com/a/1190000017463371)
