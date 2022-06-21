# FlexPost

> MERN (Mongo DB + Express JS + (React + Redux) + Node JS) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the RealWorld spec and API.

## [Live Demo](https://flexpost.herokuapp.com/)

## Functionality overview
The example application is a social blogging or social media site (i.e. a Medium.com clone) called "FlexPost". It uses a custom API for all requests, including authentication.
##### General functionality:
- Authenticate users via JWT (Login/Register pages + Logout button on navbar).
- CRUD users (Register & Edit profile page + Delete profile button on Intro layout).
- CRUD Posts.
- Create Post with image.
- CR** Comments on articles (no updating and deleting required).
- Turn on / off comments on user's post.
- Link & Unlike posts.
- Follow & Unfollow other users.
- **Realtime Chat**.
- Send Messages to other users.

##### The general page breakdown looks like this:
- Home page (URL: /#/)
    - Sidebar.
    - List of posts pulled from either User's Profile or Global.
    - Post View
        - Delete post button (only shown to post's author).
        - Render markdown from server client side.
        - Comments section at bottom of box.
    - List of users for follow.
- Sign in/Sign up pages (URL: /#/login, /#/register)
    - Use JWT (store the token in localStorage).
- Profile page (URL: /#/user/@userId)
    - Top box for User's name, photo and short brief.
    - Left box called (Intro) contains all User's info and profile actions.
    - Left box for User's followers.
    - Left box for User's following.
    - Create post box for add post.
    - List of posts populated from author's created posts.
- Edit profile page (URL: /#/user/edit/@userId)
    - Change Photo and add an aditional info.

## What you need to run this code

| Name |
| ------ |
| Node (14.16.1)
| NPM (6.14.12)
| MongoDB (5.0.6)

### How to run this code
1. Make sure MongoDB is running on your system.
2. Clone this repository.
3. Open command line in the cloned folder,
    - To install dependencies, run `npm install` or `yarn` in server & client folders.
    - Open client folder and run `npm start`.
    - open server folder and run `npm start`.
4. Open [localhost:3000](localhost:3000) in the browser.

## Back-End Dependencies
| Dependencies | Description |
| ------ | ------ |
| body-parser | Parse incoming request bodies in a middleware before your handlers |
| cookie-parser | Parse Cookie header and populate req.cookies with an object keyed by the cookie names. |
| cors | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. |
| dotenv | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. |
| express | The Express philosophy is to provide small, robust tooling for HTTP servers |
| express-jwt | This module provides Express middleware for validating JWTs (JSON Web Tokens) through the jsonwebtoken module. |
| express-validator | An express.js middleware for validator. |
| formidable | A Node.js module for parsing form data, especially file uploads. |
| jsonwebtoken | An implementation of JSON Web Tokens. |
| lodash | The Lodash library exported as Node.js modules. |
| moment | A JavaScript date library for parsing, validating, manipulating, and formatting dates. |
| mongoose | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. |
| nodemon | nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. |
| socket.io | Socket.IO enables real-time bidirectional event-based communication. |
| uuid | To create a random UUID |

## Front-End Dependencies
| Dependencies | Description |
| ------ | ------ |
| antd | An enterprise-class UI design language and React UI library. |
| history | The history library lets you easily manage session history anywhere JavaScript runs. |
| moment | A JavaScript date library for parsing, validating, manipulating, and formatting dates. |
| prop-types | Runtime type checking for React props and similar objects. |
| react | React is a JavaScript library for creating user interfaces. |
| react-bootstrap | Bootstrap 5 components built with React. |
| react-dom | This package serves as the entry point to the DOM and server renderers for React. |
| react-redux | React Redux is the official React UI bindings layer for Redux. |
| react-router-dom | The react-router-dom package contains bindings for using React Router in web applications. |
| redux | Redux is a predictable state container for JavaScript apps. |
| redux-thunk | Thunk middleware for Redux. |
| socket.io-client | socket.io client |
| enzyme-adapter-react-17 | Unofficial adapter for React 17 for Enzyme. |
| enzyme | Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. |
| enzyme-to-json | Convert Enzyme wrappers to a format compatible with Jest snapshot testing. |
| jest | JavaScript Testing |
| jest-enzyme | to use jest environment jest-environment-enzyme. |
| jest-fetch-mock | Fetch is the canonical way to do HTTP requests in the browser, and it can be used in other environments such as React Native. |
| jest-transform-stub | use this module to avoid errors when importing non JavaScript assets. |
| react-test-renderer | This package provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment. |
| redux-mock-store | A mock store for testing Redux async action creators and middleware. |
