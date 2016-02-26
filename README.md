# CloudBread-Socket
[![Build Status](https://travis-ci.org/Beingbook/babel6-api-server.svg?branch=master)](https://travis-ci.org/Beingbook/babel6-api-server)
[![Dependency Status](https://david-dm.org/CloudBreadProject/CloudBread-Socket.svg?style=flat-square)](https://david-dm.org/CloudBreadProject/CloudBread-Socket)
[![devDependency Status](https://david-dm.org/CloudBreadProject/CloudBread-Socket/dev-status.svg?style=flat-square)](https://david-dm.org/CloudBreadProject/CloudBread-Socket#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/CloudBreadProject/CloudBread-Socket/badges/gpa.svg)](https://codeclimate.com/github/CloudBreadProject/CloudBread-Socket)
[![Issue Count](https://codeclimate.com/github/CloudBreadProject/CloudBread-Socket/badges/issue_count.svg)](https://codeclimate.com/github/CloudBreadProject/CloudBread-Socket)

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
