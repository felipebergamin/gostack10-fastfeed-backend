import jwt from 'jsonwebtoken';
import {} from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "You're not authenticated on application",
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    req.userId = decoded.id;
    req.userType = decoded.user_type;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "You're not autheticared on application",
    });
  }
};
