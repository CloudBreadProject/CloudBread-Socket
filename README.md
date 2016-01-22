# Babel6 Express Package
![Dependency Badge](https://david-dm.org/Beingbook/babel6-express.svg)

Build api server with Babel!

## Features

* Babel 6, ES2015 + ES7
* Mocha Test Environment
* Webpack, development and production
* Mongoose
* Passport Authentication
* Airbnb config eslint

## See Documents
* [Getting Started](./docs/get-started.md)
* [API Route](./docs/route.md)

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
│ ├── api          # api end point
│ ├── assets       # static files
│ ├── config       # configuration such as credentials
│ ├── core         # configuration such as credentials
│ ├── models       # mongoose models
│ ├── public       # static files to serve through http or https
│ ├── server.js    # server entry
├── tests          # unit tests
└── tools          # build and deployment tools
    ├── .eslintrc.json
    ├── config.js  # webpack configurations
    ├── lib
    ├── run.js
    └── tasks      # build, deploy, serve, etc...
```
