// 

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send('Accès non autorisé');
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).send('Accès non autorisé');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Token invalide');
    }

    req.user = user;

    if (user.role !== 'admin' && user.role !== 'user') {
      return res.status(403).send('Accès interdit : rôle non reconnu');
    }

    // Si le token est valide et le rôle est correct, passez à la prochaine étape
    next();
  });
}

module.exports = {
  authenticateToken,
};

