<h1 align="center">Master's Information Portal</h1>

<h4 align='center'> Repository for the Unicode 2019 - 2020 project Master's Information Portal.</h4>

## File Structure

```
.
├── .github/                -> CI/CD Workflow hooks of github
├── config/                 -> Configuration settings of various middlewares used like DB, Loggers, etc
├── constants/              -> Values of various constant strings used in notifications etc.
├── controllers/            -> Contains request handling functions of all routes in respective files
├── docs/                   -> Contains generated docs after build scripts
├── infra/                  -> Contains reusable functions related to encryption,authentication etc.
├── middleware/             -> Contains custom middlewares for authentication, file upload etc.
├── models/                 -> Contains DB models
├── routes/                 -> Files exporting respective routers connecting routes to function in controllers
├── test/                   -> Contains Chai and Mocha tests for routes
├── webapp/                 -> Contains Frontend React pages
├── .env.development        -> .env file for development
├── app.js                  -> Sets up express app with routers, middlewares etc and exports it
├── build.sh                -> Shell script for building fonrtend and backend
├── index.js                -> Connects to DB and starts the server, file to be run for starting the app
└── package.json            -> Npm package.json file
```

## Technology Stack

#### Backend

- Node.js v12.18.3
- Express.js v4.17.1
- Mongoose v5.8.10
- Multer v1.4.2
- Socket.io v2.3.0


#### Frontend

- HTML5
- CSS3
- ReactJs                 (16.6+)
- Material-UI             (4.9.0)
- ES6 JavaScript
- formik                  (2.1.3)
- aos                     (2.3.4)
- axios                   (0.19.2)


## Features

#### Sign Up and Authentication

One can Sign up as either MS pursuing Senior or BE pursuing junior. For Seniors, it takes name, email, field of interests, colleges applied for and college studying in, other profile links, etc.

#### Chats

Seniors and juniors can chat with each other in real time

### Forum

One can ask questions that can be seen and answered by any member in forums. Questions and Answers can be pinned,liked, and upvoted.

#### Notifications

One gets Notifications of various activities such as Chats, questions and answers in forums, etc

#### Tags

One can follow various tags , and the person can get recommendations based on the tags that they follow. Tags can be of various topics, subjects and universities. Creation of new tags is only allowed to Admins


## Screenshots

#### Homepage:

![Homepage](/screenshots/home.png)


#### Login:

![Login](/screenshots/login.png)


#### Signup:

![Signup](/screenshots/signup1.png)

![Signup](/screenshots/signup2.png)


#### Edit Profile:

![Edit Profile](/screenshots/editProfile.png)


#### Profile Page:

![Profile Page](/screenshots/profile1.png)

![Profile Page](/screenshots/profile2.png)


#### Search Pages:

![Search](/screenshots/search1.png)

![Search](/screenshots/search2.png)


#### University Page:

![University](/screenshots/university.png)

#### Forum Pages:

![Forum](/screenshots/forum1.png)

![Forum](/screenshots/forum2.png)

![Forum](/screenshots/forum3.png)


#### Chat:

![Chat](/screenshots/chat.png)

#### Add Resource:

![Add Resource](/screenshots/resources.png)


#### Question Reply:

![Question Reply](/screenshots/reply.png)


## Team

#### Developers

<ul>
<li>Heth Gala</li>
<li>Jay Mehta</li>
<li>Naman Dangi</li>
<li>Yash Chachad</li>
<li>Yashodhan Joshi</li>
<li>Nimit Vasavat</li>
<li>Himanshu Sanklecha</li>
<li>Siddharth Salvi</li>
<li>Yatharth Vyas</li>
</ul>

#### Mentors

<ul>
<li>Siddharth Sanghavi</li>
<li>Vikrant Gajria</li>
<li>Shail Shah</li>
<li>Ayush Shah</li>
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
