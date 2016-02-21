# Getting Started

## Installation

* Node.js 4.x or 5.x

```sh
git clone https://github.com/CloudBreadProject/CloudBread-Socket.git
cd CloudBread-Socket
npm i # alias to install
```

## Usage

### Configurations
Every option below can be edited directly by modifying `src/config.js`

#### Multiple Nodes
To communicate between different nodes' user, you can use Redis server.
You can integrate Redis easily through providing `REDIS_URL` environment variable.

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
GitHub, Heroku, Azure, AWS, AppEngine, whatever doesn't matter, perhaps.
