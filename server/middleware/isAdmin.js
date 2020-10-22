const isAdmin = (req, res, next) => {
  if(req.user.role === 'admin' || req.user.role === 'super-admin')
    next()
  else
    return res.status(401).json('Unauthorized')
}

const isSuperAdmin = (req, res, next) => {
  if(req.user.role === 'super-admin')
    next()
  else
    return res.status(401).json('Unauthorized')
}

module.exports = {
  isAdmin,
  isSuperAdmin
}