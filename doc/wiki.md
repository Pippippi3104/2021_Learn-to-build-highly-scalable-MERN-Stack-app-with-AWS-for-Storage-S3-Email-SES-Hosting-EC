<a id="contents"></a>

## Contents

- [React / Next Js Client](#sec02)
- [Node Js API](#sec03)

<a id="#sec02"></a>

## React / Next Js Client

### How to init Nextjs

- [Getting started](https://nextjs.org/docs/getting-started)

  - ```
    npm init -y
    npm install -D next react react-dom
    npm run dev
    ```

- page / index.js

  - ```
    const Home = () => {
      return <div>hello next</div>;
    };
    export default Home;
    ```

- links
  - [Next.js でのサイト内ページ遷移方法](https://qiita.com/IYA_UFO/items/f13577bad7dd9ef1ae89)
  - [router.events](https://nextjs.org/docs/api-reference/next/router#routerevents)
  - [cdnjs/nprogress](https://cdnjs.com/libraries/nprogress)
    - https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css
  - [NextJs/Built-In CSS Support](https://nextjs.org/docs/basic-features/built-in-css-support)
    - ```
      npm i -D @zeit/next-css
      ```

### Bootstrap

- [Bootstrap/CSS](https://getbootstrap.com/docs/5.0/getting-started/introduction/#css)
  - Copy-paste the stylesheet <link> into your <head> before all other stylesheets to load our CSS.

### Others

- [NProgress](https://www.npmjs.com/package/nprogress)
- [別プロジェクトに Next.js を追加した時の TypeError: Cannot read property 'tap' of undefined エラーの解消法](https://qiita.com/faronan/items/a017d53a8405a44544f2)

#### [Return to Contents](#contents)

<a id="#sec03"></a>

## Node Js API

### setup server

- init
  - ```
    cd server
    npm init -y
    npm i -D express nodemon
    ```
- add file (server.js)
  - ```
    const express = require("express");
    const app = express();
    app.get("/api/register", (req, res) => {
        res.json({
            data: "you hit register endpoint",
        });
    });
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`API is running on port ${port}`));
    ```
- run server
  - ```
    node server.js
    ```
  - http://localhost:8000/api/register
- start server
  - add to script
    - "start": "nodemon server.js",
  - run
    - ```
      npm run start
      ```

### files

- server.js
  - routes などを import し、それらの middleware を実行する
- routes
  - controllers 内の動作を middleware として関数にまとめる
- controllers
  - 具体的な動作

### mongoose

- install

  - ```
    npm i -D mongoose
    ```

- links
  - [mongoose](https://mongoosejs.com/)

#### [Return to Contents](#contents)
