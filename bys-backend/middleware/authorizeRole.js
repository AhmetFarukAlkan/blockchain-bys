function authorizeRole(requiredRoles) {
  return (req, res, next) => {
    const userRoles = req.user.role;

    if (!userRoles) {
      return res.status(403).json({ message: 'Erişim izniniz yok' });
    }

    const hasRole = requiredRoles.some(role => userRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ message: 'Erişim izniniz yok' });
    }

    next();
  };
}

module.exports = authorizeRole;
