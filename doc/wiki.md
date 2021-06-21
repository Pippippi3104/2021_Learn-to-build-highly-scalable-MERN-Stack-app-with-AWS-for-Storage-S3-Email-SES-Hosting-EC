<a id="contents"></a>

## Contents

- [React / Next Js Client](#sec02)
- [Node Js API](#sec03)
- [Starting with AWS](#sec04)
- [Login / Register / AWS SES](#sec05)
- [User / Admin Access](#sec06)
- [Password Forgot / Reset](#sec07)
- [Categories / Uploads / AWS S3](#sec08)

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
- others
  - ```
    npm i -D body-parser cors dotenv express-jwt express-validator jsonwebtoken aws-sdk
    npm i -D morgan
    npm i -D axios
    ```

### files

- client
  - web page
    - 任意のアドレスへデータを送信する
- server
  - server.js
    - routes などを import し、それらの middleware を実行する
    - client からデータを受け取り、routes へ流す
  - routes
    - controllers 内の動作を middleware として関数にまとめる
  - controllers
    - 具体的な動作
    - auth
      - AWS / SES を利用して認証、確認メールの送信などを行う
  - validators
    - パスワードのバリデーション周りを担う
  - helpers
    - controller 等で使われる、具体的なコンテンツなどを機能ごとにまとめたもの

### mongoose

- install

  - ```
    npm i -D mongoose
    ```

- links
  - [mongoose](https://mongoosejs.com/)

### mongoDB

- link
  - [HP](https://cloud.mongodb.com/)
- test account
  - udemy
  - 111111111!Qq

#### [Return to Contents](#contents)

<a id="#sec04"></a>

## Starting with AWS

### AWS

- [AWS](https://us-east-2.console.aws.amazon.com/)
- IAM (Identity and Access Management )
  - create account
    - Ryan
- SES (Amazon Simple Email Service)
  - ori...
  - sato...

#### [Return to Contents](#contents)

<a id="#sec05"></a>

## Login / Register / AWS SES

### aaa

- aaa

#### [Return to Contents](#contents)

<a id="#sec06"></a>

## User / Admin Access

### JsonPlaceholder

- [Link](https://jsonplaceholder.typicode.com/)
  - ```
    https://jsonplaceholder.typicode.com/todos
    ```

### Problems

- [if (!options.algorithms) throw new Error('algorithms should be set'); Error: algorithms should be set](https://stackoverflow.com/questions/62665636/if-options-algorithms-throw-new-erroralgorithms-should-be-set-error-alg)
  - ```
    expressJwt({ secret:  process.env.JWT_SECRET, algorithms: ['RS256'] });
    ```

#### [Return to Contents](#contents)

<a id="#sec07"></a>

## Password Forgot / Reset

### aaa

- aaa

#### [Return to Contents](#contents)

<a id="#sec08"></a>

## Categories / Uploads / AWS S3

### aaa

- [Bucket policy examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html)

  - ```
    {
      "Version":"2012-10-17",
      "Statement":[
        {
          "Sid":"AddCannedAcl",
          "Effect":"Allow",
        "Principal": {"AWS": ["arn:aws:iam::111122223333:root","arn:aws:iam::444455556666:root"]},
          "Action":["s3:PutObject","s3:PutObjectAcl"],
          "Resource":"arn:aws:s3:::DOC-EXAMPLE-BUCKET/*",
          "Condition":{"StringEquals":{"s3:x-amz-acl":["public-read"]}}
        }
      ]
    }
    ```

- [CORS configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html)
  - ```
    <CORSConfiguration>
    <CORSRule>
      <AllowedOrigin>http://www.example.com</AllowedOrigin>
      <AllowedMethod>PUT</AllowedMethod>
      <AllowedMethod>POST</AllowedMethod>
      <AllowedMethod>DELETE</AllowedMethod>
      <AllowedHeader>*</AllowedHeader>
      <MaxAgeSeconds>3000</MaxAgeSeconds>
      <ExposeHeader>x-amz-server-side-encryption</ExposeHeader>
      <ExposeHeader>x-amz-request-id</ExposeHeader>
      <ExposeHeader>x-amz-id-2</ExposeHeader>
    </CORSRule>
    </CORSConfiguration>
    ```
- [Amazon S3: Amazon Cognito ユーザーにバケット内のオブジェクトへのアクセスを許可する](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_examples_s3_cognito-bucket.html)
  - ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "ListYourObjects",
                "Effect": "Allow",
                "Action": "s3:ListBucket",
                "Resource": ["arn:aws:s3:::bucket-name"],
                "Condition": {
                    "StringLike": {
                        "s3:prefix": ["cognito/application-name/${cognito-identity.amazonaws.com:sub}"]
                    }
                }
            },
            {
                "Sid": "ReadWriteDeleteYourObjects",
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject",
                    "s3:PutObject",
                    "s3:DeleteObject"
                ],
                "Resource": [
                    "arn:aws:s3:::bucket-name/cognito/application-name/${cognito-identity.amazonaws.com:sub}",
                    "arn:aws:s3:::bucket-name/cognito/application-name/${cognito-identity.amazonaws.com:sub}/*"
                ]
            }
        ]
    }
    ```

#### [Return to Contents](#contents)
