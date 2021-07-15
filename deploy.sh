#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

mv ./public ./blog

scp -r ./blog root@106.52.253.99:/root/www

rm -rf ./blog
