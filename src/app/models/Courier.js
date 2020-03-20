import Sequelize, { Model } from 'sequelize';

class CourierModel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default CourierModel;
