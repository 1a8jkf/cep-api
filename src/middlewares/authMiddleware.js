const FIXED_TOKEN = '1234567890abcdef';

function authMiddleware (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  if (token !== FIXED_TOKEN) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
}

module.exports = authMiddleware;
