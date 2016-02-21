# CloudBread-Socket

[![Build Status](https://travis-ci.org/CloudBreadProject/CloudBread-Socket.svg?branch=master)](https://travis-ci.org/CloudBreadProject/CloudBread-Socket)
[![bitHound Overall Score](https://www.bithound.io/github/CloudBreadProject/CloudBread-Socket/badges/score.svg)](https://www.bithound.io/github/CloudBreadProject/CloudBread-Socket)
[![bitHound Dependencies](https://www.bithound.io/github/CloudBreadProject/CloudBread-Socket/badges/dependencies.svg)](https://www.bithound.io/github/CloudBreadProject/CloudBread-Socket/1.0.0-dev/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/CloudBreadProject/CloudBread-Socket/badges/devDependencies.svg)](https://www.bithound.io/github/CloudBreadProject/CloudBread-Socket/1.0.0-dev/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/CloudBreadProject/CloudBread-Socket/badges/code.svg)](https://www.bithound.io/github/CloudBreadProject/CloudBread-Socket)

CloudBread game server real-time communication project

This project is designed for CloudBread mobile game & app server engine to implement real-time bidirectional communication.

## Features

* Babel 6, ES2015 + ES7
* Mocha Test Environment
* Webpack, development and production
* Airbnb config eslint

## See Documents
* [Getting Started](./docs/get-started.md)
* [API Reference](./docs/reference.md)

### Directory Map

Run `tree -L 2 -I 'node_modules|build|.git|.DS_Store' -A -a` then you will see below:

```sh
.                  # Root
├── .editorconfig  # common editor configurations
├── .eslintrc.json # eslint configurations
├── .gitignore
├── LICENSE.txt
├── README.md
├── package.json   # dependency list
├── src            # application source code
│ ├── assets       # static files
│ ├── server.js    # server entry
├── tests          # unit tests
└── tools          # build and deployment tools
    ├── .eslintrc.json
    ├── config.js  # webpack configurations
    ├── lib
    ├── run.js
    └── tasks      # build, deploy, serve, etc...
```

## LICENSE
MIT License
