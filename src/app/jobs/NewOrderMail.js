import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    const { courier, recipient } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Nova entrega cadastrada',
      template: 'new_order',
      context: {
        courierName: courier.name,
        recipientName: recipient.name,
        street: recipient.street,
        number: recipient.number,
        cep: recipient.cep,
        city: recipient.city,
        state: recipient.state,
        complement: recipient.complement,
      },
    });
  }
}

export default new NewOrderMail();
