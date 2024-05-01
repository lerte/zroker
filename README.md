# Zroker

## About

👻 Zroker is a gui client for [zrok](https://zrok.io). An open source sharing solution built on OpenZiti, the zero trust networking platform. Available as SaaS or self-hosted.
Now available on `Windows`, `macOS`,`Linux`.

Official website: [https://zroker.com](https://zroker.com)

# zrok is node wrapper for zrok

## To install dependencies:

#### use pnpm/yarn/npm

```bash
$ pnpm add zrok
# or
$ yarn add zrok
# or
$ npm i zrok
```

#### use bun

```bash
bun i --trust zrok
```

## Invite

```js
import zrok from "zrok";
const response = await zrok.invite("lerte@zrok.com");
// if success
// response.status 201
// response.statusText Created
```

## Create Account

> Check your email inbox, click the red button **Create Account**

## Enable

```js
// Enable your enviroment from Create Account link
// Copy the enable text for top right of your account
// paste to the enable parameter
const await zrok.enable("enalbe ************");
```

## Sharing

```js
const share = zrok.share("share public localhost:8080");
// kill share
share.kill();
```

## Overview

```js
const overview = zrok.overview();
// result
// {
//   environments: [
//     {
//       environment: [Object ...],
//     }
//   ],
// }
```

### ⚠️ Note:

如果安装失败，可以手动从[https://github.com/openziti/zrok/releases](https://github.com/openziti/zrok/releases)下载对应平台最新的压缩包 tar.gz 格式的，直接放到 node_modules/zrok 目录，再执行

```sh
node node_modules/zrok/dist/install.js
```
