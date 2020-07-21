---
title: UMI项目使用webpack插件生成gzip压缩文件
date: 2020-07-21 10:57:36
tags:
  - webpack
  - compression-webpack-plugin
  - umi
  - react
categories:
  - 前端
  - umi
  - react
---

## 安装插件 compression-webpack-plugin

```bash
npm i compression-webpack-plugin -D

yarn add compression-webpack-plugin -D
```

## umi 项目配置文件

在配置文件.umirc.js 或者 config/config.js 文件中添加配置

```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const prodGzipList = ['js', 'css'];

chainWebpack: config => {
  if (process.env.NODE_ENV === 'production') {
    // 生产模式开启
    config.plugin('compression-webpack-plugin').use(
      new CompressionWebpackPlugin({
        // filename: 文件名称，这里我们不设置，让它保持和未压缩的文件同一个名称
        algorithm: 'gzip', // 指定生成gzip格式
        test: new RegExp('\\.(' + prodGzipList.join('|') + ')$'), // 匹配哪些格式文件需要压缩
        threshold: 10240, //对超过10k的数据进行压缩
        minRatio: 0.6 // 压缩比例，值为0 ~ 1
      })
    );
  }
};
```

## ![image.png](https://cdn.nlark.com/yuque/0/2020/png/369912/1595298681583-d3f320b1-9810-4f7f-b5e9-b954aafcb103.png#align=left&display=inline&height=169&margin=%5Bobject%20Object%5D&name=image.png&originHeight=338&originWidth=450&size=44942&status=done&style=none&width=225)

同理在 vue 项目中也可以该插件生成 gzip 文件，配置也是大同小异

## nginx 开启 gzip

```json
# 开启和关闭gzip模式
gzip on;

# gizp压缩起点，文件大于1k才进行压缩
gzip_min_length 1k;

# gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
gzip_comp_level 6;

# 进行压缩的文件类型。
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/xml text/javascript application/json;

# nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩
gzip_static on;

# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;

# 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区
gzip_buffers 4 16k;
```
