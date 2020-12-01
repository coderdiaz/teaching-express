// RBAC (Role-based Access Control)
// const allowedRoles = ['admin', 'author']
// permission('admin', 'author')

const permission = (...allowedRoles) => {
  return (req, res, next) => {
    const { user } = req;
    if (user && allowedRoles.includes(user.type)) { // ['admin', 'author'].includes('reader') // false
      return next();
    }

    return res.status(403).json({ status: 403, message: 'Forbidden' });
  }
}

module.exports = permission;
