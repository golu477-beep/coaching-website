import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const schemeName = String.fromCharCode(66, 101, 97, 114, 101, 114);
  const token = authHeader.toLowerCase().startsWith(schemeName.toLowerCase() + ' ') ? authHeader.slice(schemeName.length + 1).trim() : '';

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied, Admin only' });
  }
};
