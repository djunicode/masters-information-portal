<h1 align="center">Master's Information Portal</h1>

<h4 align='center'> Repository for the Unicode 2019 - 2020 project Master's Information Portal.</h4>

## File Structure

```
.
├── README.md
├── .github/                -> CI/CD Workflow hooks of github
├── config/                 -> Configuration settings of various middlewares used like DB, Loggers, etc
├── constants               -> Values of various constant strings used in notifications etc.
├── controllers/            -> Contains request handling functions of all routes in respective files
├── docs/                   -> Contains generated docs after build scripts
├── infra/                  -> Contains reusable functions related to encryption,authentication etc.
├── middleware/             -> Contains custom middlewares for authentication, file upload etc.
├── models/                 -> Contains DB models
├── routes/                 -> Files exporting respective routers connecting routes to function in controllers
├── test/                   -> contains Chai and Mocha tests for routes
├── webapp/                 -> Contains Frontend React pages
├── .env.development        -> .env file for development
├── .eslintignore           -> Contains files and routes to be ignored by linter
├── .eslintrc.js            -> eslint configuration file
├──.gitignore               -> Contains files and paths to be ignored by git
├── .prettierrc             -> Prettier configuration file
├── apidoc.json             -> ApiDoc configuration file
├── app.js                  -> Sets up express app with routers, middlewares etc and exports it
├── build.sh                -> Shell script for building fonrtend and backend
├── heroku-deployment.md    -> Contains small guide for deploying on heroku
├── index.js                -> Connects to DB and starts the server, file to be run for starting the app
├── jsdoc.json              -> JsDoc configuration file
├── package.json            -> Npm package.json file
├── package0lock.json       -> Npm package-lock file
└── README.md               -> This file
```

## Technology Stack

#### Backend

- NodeJs                (12.18.3 LTS +)
- express               (4.17.1)
- mongoose              (5.8.10)
- multer                (1.4.2)
- socket.io             (2.3.0)


#### Frontend

- React 16.6+

## Features

#### Sign Up and Authentication

One can Sign up as either MS perusing Senior or BE perusing junior. For Seniors, it takes name, email, field of interests, colleges applied for and college studying in, other profile links, etc.

#### Chats

Seniors and juniors can chat with each other in real time

### Forum

One can ask questions that can be seen and answered by any member in forums. Questions and Answers can be pinned,liked, and upvoted.

#### Notifications

One gets Notifications of various activities such as Chats, questions and answers in forums, etc

#### Tags

One can follow various tags , and the person can get recommendations based on the tags that they follow. Tags can be of various topics, subjects and universities. Creation of new tags is only allowed to Admins


## Screenshots



## Team

#### Developers

<ul>
<li>Heth Gala</li>
<li>Jay Mehta</li>
<li>Naman Dangi</li>
<li>Yash Chachad</li>
<li>Yashodhan Joshi</li>
</ul>

#### Mentors

<ul>
<li>Siddharth Sanghvi</li>
<li>Vikrant Gajria</li>
</ul>

## Build Instructions

Run <code> npm run build </code> for building front-end and back-end.
Run <code> npm run start </code> for starting the app.

## Development Instructions

1. We have configured the precommit hook for frontend following the `eslint airbnb` guidelines along with `prettier` code formatting. So make sure to follow the above guideline otherwise code will not be commited.


## LICENSE

> MIT License
>
> Copyright (c) 2020 Unicode
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
