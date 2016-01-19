# Babel6 Express Package
![Dependency Badge](https://david-dm.org/Beingbook/babel6-express.svg)

Build api server with Babel!

## Features

* Babel 6, ES2015 + ES7
* Mocha Test Environment
* Webpack, development and production
* Airbnb config eslint

## Installation

```sh
git clone https://github.com/Beingbook/babel6-express.git
cd babel6-express
npm i # alias to install
```

### Requirements

Node.js 4.x or 5.x

## Usage

### Custom Scripts

#### Development

```sh
npm start
npm start -- --port=8080 # if you want to change the port
```

Never use this command for production directly because this command will be executed via `babel-node` which makes performance slower.
To serve production application, you have to deploy or build it and execute `npm start` in the build folder.
You can setup port from `./tools/config.js`

#### Build

```sh
npm run build
```

It will build package for production.

#### Test

```sh
npm test
```

#### Lint

```sh
npm run lint
```

It will eslint this package.

#### Deployment

You should edit `./tools/tasks/deploy.js` file before use this command.

```sh
npm run deploy
```

Basically this script deploys this package on git repository after build.
GitHub, Heroku, Azure, AWS, AppEngine doesn't matter, perhaps.

### Directory Map

Run `tree -L 2 -I 'node_modules|build|.git|.DS_Store' -A -a` then you will see below:

```sh
.                   # Root
├── .editorconfig   # common editor configurations
├── .eslintrc.json  # eslint configurations
├── .gitignore
├── LICENSE.txt
├── README.md
├── package.json    # dependency list
├── src             # application source code
│ ├── api           # api end point
│ ├── assets        # static files
│ ├── config.js     # configuration such as api
│ ├── public        # static files to serve through http or https
│ ├── server.jsx    # server entry
├── tests           # unit tests
└── tools           # build and deployment tools
    ├── .eslintrc.json
    ├── config.js   # webpack configurations
    ├── lib
    ├── run.js
    └── tasks       # build, deploy, serve, etc...
```
