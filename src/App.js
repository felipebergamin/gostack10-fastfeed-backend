import express from 'express';

import routes from './routes';

class App {
  constructor() {
    this._app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this._app.use(express.json());
  }

  routes() {
    this._app.use(routes);
  }
}

export default new App()._app;
