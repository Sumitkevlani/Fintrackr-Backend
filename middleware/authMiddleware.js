import jwt from 'jsonwebtoken';
export function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your-secret-key');

      req.userId = decoded.userId;
  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
  }