import express from 'express';

class App {
  constructor() {
    this._app = express();

    this.routes();
  }

  routes() {
    this._app.route('/').get((_, res) => res.json({ message: 'Hello world' }));
  }
}

export default new App()._app;
