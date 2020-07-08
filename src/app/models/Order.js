import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.canceled_at) return 'cancelado';
            if (this.end_date) return 'entregue';
            if (this.start_date) return 'retirado';
            return 'pendente';
          },
        },
        step: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.canceled_at) return 0;
            if (this.end_date) return 3;
            if (this.start_date) return 2;
            return 1;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Courier, {
      foreignKey: 'courier_id',
      as: 'courier',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Order;
