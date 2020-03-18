import User from '../models/User';

class UserController {
  async list(req, res) {
    const users = await User.findAll();
    res.json(users);
  }
}

export default new UserController();
