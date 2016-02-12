export default class routeError extends Error {
  constructor(message) {
    super();
    this.name = 'Error';
    this.message = message || 'Error occured';
    this.detail = {};
    this.status = 400;
  }

  toJSON() {
    const { name, message, detail, status } = this;
    return {
      name,
      message,
      detail,
      status,
    };
  }
}

export class GrantError extends routeError {
  constructor(message) {
    super();
    this.name = 'GrantError';
    this.message = message || 'You do not have grant to execute that command';
  }
}

export class EntityError extends routeError {
  constructor(message) {
    super();
    this.name = 'EntityError';
    this.message = message || 'The entity does not exist';
  }
}

export class ServerError extends routeError {
  constructor(message) {
    super();
    this.name = 'ServerError';
    this.status = 500;
    this.message = message || 'Unhandled server error occured, contact the server admin';
  }
}
