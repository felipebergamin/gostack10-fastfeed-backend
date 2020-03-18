import express from 'express';

import routes from './routes';

class App {
  constructor() {
    this._app = express();

    this.routes();
  }

  routes() {
    this._app.use(routes);
  }
}

export default new App()._app;
