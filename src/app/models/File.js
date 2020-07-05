import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:8000/images/${this.name}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
