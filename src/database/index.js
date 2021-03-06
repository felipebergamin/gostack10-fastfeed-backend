import Sequelize from 'sequelize';

import dbConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Courier from '../app/models/Courier';
import Order from '../app/models/Order';
import DeliveryProblem from '../app/models/DeliveryProblem';
import File from '../app/models/File';

const models = [User, Recipient, Courier, Order, DeliveryProblem, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
